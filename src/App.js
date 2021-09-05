import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import { checkPrevLogin } from './store/actionsCreators';

import './App.css';

const App = props => {

  useEffect(() => {
    props.checkPreviousLogin();
  }, [props]);

  return (
    <div className="App">
      <Header />
      <Layout />
      <Footer />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    checkPreviousLogin: () => dispatch(checkPrevLogin())
  }
}

export default connect(null, mapDispatchToProps)(App);
