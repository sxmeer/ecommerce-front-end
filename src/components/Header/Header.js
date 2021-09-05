import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/actionsCreators';
import { USER_TYPES } from '../../config';
import './Header.css';
import logo from '../../assets/logo_light.svg';
import { Link } from 'react-router-dom';
import Authenticate from '../Authenticate/Authenticate';
import Loader from '../UI/Loader/Loader';

const Header = props => {
  const [headerState, setHeaderState] = useState({
    isLoginMode: true,
    isModalVisible: false,
    isSignUpLoading: false,
  });

  const closeModal = useCallback(() => {
    setHeaderState({ ...headerState, isModalVisible: false });
    // eslint-disable-next-line
  }, []);

  const toggleLoader = (isSignUpLoading) => {
    setHeaderState({ ...headerState, isSignUpLoading });
  }

  useEffect(_ => {
    if (props.token) {
      closeModal();
    }
  }, [props.token, closeModal]);

  let linksTop = props.isAuthenticated ? <>
    <p>Hello {props.firstName}!</p>
    <p className="links" to="/logout" onClick={props.logout}> Log-out</p>
  </> : <>
    <p className="links" onClick={() => { setHeaderState({ isLoginMode: true, isModalVisible: true }) }}>Log-in</p>
    <p className="links" onClick={() => { setHeaderState({ isLoginMode: false, isModalVisible: true }) }}>Sign-up</p>
  </>;

  let linksBottom = props.isAuthenticated ? <>
    <Link className="links" to="/cart"><i className="fa fa-home"></i> Home</Link>
    <Link className="links" to="/cart"><i className="fa fa-shopping-cart"></i> My Cart</Link>
    <Link className="links" to="/orders"><i className="fa fa-list-ul"></i> My Orders</Link>
    {props.isAuthenticatedAdmin ? <>
      <Link className="links" to="/cart"><i className="fa fa-plus-circle"></i> Create Product</Link>
      <Link className="links" to="/cart"><i className="fa fa-list-alt"></i> All Orders</Link>
    </> : null}
  </> : null;

  return <div className="Header">
    {(props.isLoginLoading || headerState.isSignUpLoading) && <Loader show />}
    {headerState.isModalVisible
      && <Authenticate
        toggleLoader={toggleLoader}
        isLoginMode={headerState.isLoginMode}
        onClose={closeModal}
      />}
    <div className="HeaderFix">
      <div className="HeaderFix__container">
        <img className="HeaderFix__logo" src={logo} alt="" />
        <div className="HeaderFix__links">
          <div className="HeaderFix__linksTop">
            {linksTop}
          </div>
        </div>
      </div>
    </div>
    <div className="Header__options" style={{ height: props.isAuthenticated ? '1.5rem' : '0rem' }}>
      <div className="Header__optionsContainer">
        {linksBottom}
      </div>
    </div>
  </div>;
}

const mapStateToProps = state => {
  return {
    isAuthenticatedAdmin: state.auth.token !== null && state.auth.role !== null && state.auth.role === USER_TYPES.TYPE_ADMIN,
    isAuthenticated: state.auth.token !== null,
    firstName: state.auth.firstName,
    isLoginLoading: state.auth.isLoading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);