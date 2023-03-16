import Utils from 'src/utils';
import axios from 'axios';


class JwtService extends Utils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          console.error(err);
          if (err.response.status === 401){
            this.emit('onAutoLoggout', 'Invalid access token');
            this.logout();
          } else if (err.response.status === 400){
            resolve(err.response);
          }
        });
      }
    );
  }

  handleAuthentication = () => {
    const access_token = this._getAccessToken();

    if (!access_token){
      this.emit('onNoAccessToken');
      return;
    }

    if (this.isAuthTokenValid(access_token)){
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token_expired');
    }
    
  }

  isAuthTokenValid = (access_token) => {
    if (!access_token){
      return false;
    }
    return new Promise((resolve, reject) => {
      axios
        .post('/auth/verify-token/', {
          token: access_token
        })
        .then((response) => {
          if (response.status === 200){
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/auth/login/', {
          email,
          password,
        })
        .then((response) => {
          if (response.status === 200){
            this.setSession(response.data.access);
            resolve(response.data);
          } else {
            reject(response);
          }
        });
    });
  }

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .post('/auth/login-token/')
        .then((response) => {
          if (response.status === 200){
            //?this.setSession(response.data.access);
            resolve(response.data);
          } else {
            reject(response);
          }
        })
    })
  }

  setSession = (access_token) => {
    if (access_token){
      localStorage.setItem('jwt_access_token', access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem('jwt_access_token');
      delete axios.defaults.headers.common.Authorization;
    }
  }

  logout = () => {
    this.setSession(null);
  }
  
  _getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
  }
}

export default JwtService;