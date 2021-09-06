import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from '../../store/actionsCreators';
import './Logout.css';

const Logout = (props) => {

  useEffect(() => {
    props.logout();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!props.token) {
      props.history.replace({ path: '/' });
    }
    // eslint-disable-next-line
  }, [props.token])

  return (
    <div>

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Logout));
