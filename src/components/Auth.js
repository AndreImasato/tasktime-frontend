import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { JwtService } from 'src/services';
//TODO create redux actions

const jwtService = new JwtService();

class Auth extends Component {
  state = {
    isAuthChecking: true,
  };

  componentDidMount() {
    return Promise.all([
      //TODO this.jwtCheck();
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
            //TODO does something
            resolve();
            //TODO emits success message
          })
          .catch((err) => {
            //TODO emits error message
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

      //?jwtService.on('onNoAccessToken', () => {
      //?  resolve();
      //?})

      jwtService.init();

      return Promise.resolve();
    })
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);