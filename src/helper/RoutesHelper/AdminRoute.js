import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { USER_TYPES } from '../../config';

const adminRoute = ({ component: Component, defaultMode, isAuthenticatedAdmin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticatedAdmin ?
          <Component {...props} defaultMode={defaultMode} /> :
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }} />
      }
      }
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticatedAdmin: state.auth.token !== null && state.auth.role !== null && state.auth.role === USER_TYPES.TYPE_ADMIN
  };
};

export default connect(mapStateToProps)(adminRoute);