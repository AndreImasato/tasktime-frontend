import Utils from 'src/utils';
import axios from 'axios';


class JwtService extends Utils.EventEmitter {
  init() {
    this.setInterceptors();
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
          }
        });
      }
    );
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
    //TODO
    //TODO WIP BACKEND
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
}

export default JwtService;