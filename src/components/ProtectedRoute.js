import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';


const ProtectedRoute = (props) => {
  const { element, isLoggedIn, path, ...routeProps } = props;
  return isLoggedIn ? <Outlet/> : <Navigate to="/" />;
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.login.isLoggedIn
  }
}

export default connect(mapStateToProps)(ProtectedRoute);
