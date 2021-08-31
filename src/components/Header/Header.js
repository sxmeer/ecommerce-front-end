import React, { useState } from 'react';
import './Header.css';
import logo from '../../assets/logo_light.svg';

const Header = props => {
  const [isLoggedIn, setLoggedIn] = useState(true);

  let linksTop = isLoggedIn ? <>
    <p>Hello Sameer!</p>
    <p className="links" onClick={() => { setLoggedIn(false) }} to="/logout"> Log-out</p>
  </> : <>
    <p className="links" onClick={() => { setLoggedIn(true) }}>Log-in</p>
    <p className="links">Sign-up</p>
  </>;

  let linksBottom = isLoggedIn ? <>
    <p className="links" to="/cart"><i class="fa fa-home"></i> Home</p>
    <p className="links" to="/cart"><i class="fa fa-shopping-cart"></i> My Cart</p>
    <p className="links" to="/orders"><i class="fa fa-list-ul"></i> My Orders</p>
    <p className="links"><i class="fa fa-plus-circle"></i> Create Product</p>
    <p className="links"><i class="fa fa-list-alt"></i> All Orders</p>
  </> : null;

  return <div className="Header">
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
    <div className="Header__options" style={{ height: isLoggedIn ? '1.5rem' : '0rem' }}>
      <div className="Header__optionsContainer">
        {linksBottom}
      </div>
    </div>
  </div>;
}

export default Header;