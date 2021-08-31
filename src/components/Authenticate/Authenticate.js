import React, { useState } from 'react';
import Modal from '../UI/Modal/Modal';
import './Authenticate.css';
import logo from '../../assets/logo_dark.svg';

const Authenticate = (props) => {
  const [isLoginMode, setLoginMode] = useState(props.mode);
  const [err, setErr] = useState("");
  return (
    <Modal
      show={true}
      onClose={() => { }}
    >
      <div className="Authenticate">
        <img src={logo} alt="" className="Authenticate__img" />
        <div className={`Authenticate__logIn ${isLoginMode ? 'mode' : ''}`}>
          <div>
            <p className="Authenticate__header">Log-In</p>
            <div className="form__input">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" />
            </div>
            <div className="form__input">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className="form__input">
              <input type="submit" value="Continue" className='primary-btn' />
            </div>
            <p className="error">
              {err}
            </p>
          </div>
          <div>
            <div className="newToAmazon">
              <div className="horizontalLine" />
              <p>New to Amazon?</p>
              <div className="horizontalLine" />
            </div>
            <button className="danger-btn changeMode" onClick={() => setLoginMode(false)}>Create your Amazon account</button>
          </div>
        </div>



        <div className={`Authenticate__signUp ${!isLoginMode ? 'mode' : ''}`}>
          <p className="Authenticate__header">Create Account</p>
          <div className="form__input">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" />
          </div>
          <div className="form__input">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" />
          </div>
          <div className="form__input">
            <label htmlFor="sEmail">Email</label>
            <input type="email" id="sEmail" />
          </div>
          <div className="form__input">
            <label htmlFor="spassword">Password</label>
            <input type="password" id="spassword" />
          </div>
          <div className="form__input">
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password" id="cpassword" />
          </div>
          <div className="form__input">
            <input type="submit" value="Create" onClick={() => { setErr("Error occured") }} className='primary-btn' />
          </div>
          <p className="error">
            {err}
          </p>
          <div className="newToAmazon">
            <div className="horizontalLine" />
            <p>Already have an account?</p>
            <div className="horizontalLine" />
          </div>
          <button className="danger-btn changeMode" onClick={() => setLoginMode(true)}>Log-In</button>
        </div>
      </div>
    </Modal>
  )
}

export default Authenticate;
