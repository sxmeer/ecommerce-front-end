import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { USER_TYPES } from '../../config';

const adminRoute = ({ component: Component, isAuthenticatedAdmin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticatedAdmin ?
          <Component {...props} />
          :
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
      }
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticatedAdmin: state.user.token !== null && state.user.role !== null && state.user.role === USER_TYPES.TYPE_ADMIN
  };
};

export default connect(mapStateToProps)(adminRoute);