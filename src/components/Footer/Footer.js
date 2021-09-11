import React from 'react';
import './Footer.css';
import logo from '../../assets/logo_light.svg';

const Footer = () => {
  return (
    <footer className="Footer">
      <p className="Footer__goToTop" onClick={() => window.scrollTo(0, 0)}>Back to top</p>
      <img src={logo} alt="footer__logo" />
      <p>Made with ❤️ by <a target="_blank" rel="noreferrer" href="https://sameercodes.netlify.app">Sameer</a></p>
    </footer>
  )
};

export default Footer;
