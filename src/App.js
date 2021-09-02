import React from 'react';
import './App.css';
import Authenticate from './components/Authenticate/Authenticate';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Header />
      <Authenticate></Authenticate>
      <Layout />
      <Footer />
    </div>
  );
}

export default App;
