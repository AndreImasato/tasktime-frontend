import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { JwtService } from 'src/services';
//TODO create redux actions
import { logoutUser } from 'src/store/slices/auth/userSlice';
import { loginSuccess, loginError } from 'src/store/slices/auth/loginSlice';

import history from 'src/utils/@history';

const jwtService = new JwtService();

class Auth extends Component {
  state = {
    isAuthChecking: true,
  };

  componentDidMount() {
    return Promise.all([
      this.jwtCheck()
    ])
      .then(() => {
        this.setState({ isAuthChecking: false });
      });
  }

  jwtCheck = () => {
    new Promise ((resolve) => {
      jwtService.on('onAutoLogin', () => {
        //TODO emits info message
        /**
         * Signs in with token
         */
        jwtService
          .signInWithToken()
          .then(() => {
            this.props.loginSuccess();
            history.push({
              pathname: '/dashboards'
            });
            resolve();
            //TODO emits success message
          })
          .catch((err) => {
            //TODO emits error message
            this.props.loginError();
            reject(err);
          });
      });

      jwtService.on('onAutoLoggout', (message) => {
        if (message){
          //TODO emits info message
        }

        this.props.logout();
        resolve();
      });

      jwtService.on('onNoAccessToken', () => {
        resolve();
      });

      jwtService.init();

      return Promise.resolve();
    })
  }

  render() {
    return this.state.isAuthChecking 
      ? <>{/* //TODO CREATES A LOADING UI */}</>
      : <>{this.props.children}</>
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    logout: logoutUser,
    loginSuccess: loginSuccess,
    loginError: loginError,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);