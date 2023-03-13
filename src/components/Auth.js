import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';

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
            enqueueSnackbar(
              'Conectado com sucesso',
              {
                variant: 'success',
                autoHideDuration: 3000,
                preventDuplicate: true,
                anchorOrigin: {
                  horizontal: 'right',
                  vertical: 'top'
                }
              },
            );
          })
          .catch((err) => {
            enqueueSnackbar(
              'Erro ao tentar efetuar o login',
              {
                variant: 'error',
                autoHideDuration: 3000,
                preventDuplicate: true,
                anchorOrigin: {
                  horizontal: 'right',
                  vertical: 'top'
                }
              },
            );
            this.props.loginError();
            reject(err);
          });
      });

      jwtService.on('onAutoLoggout', (message) => {
        if (message){
          enqueueSnackbar(
            message,
            {
              variant: 'info',
              autoHideDuration: 3000,
              preventDuplicate: true,
              anchorOrigin: {
                horizontal: 'right',
                vertical: 'top'
              }
            },
          );
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