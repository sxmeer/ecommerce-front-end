import React, { useState } from 'react';
import Modal from '../UI/Modal/Modal';
import './Authenticate.css';
import logo from '../../assets/logo_dark.svg';
import { LOGIN_CONFIG, SIGNUP_CONFIG, checkValidity } from '../../config';

const Authenticate = (props) => {
  const [isLoginMode, setLoginMode] = useState(props.mode);
  const [loginState, setLoginState] = useState({
    fields: {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false,
      }
    },
    error: ""
  });
  const [signUpState, setSignUpState] = useState({
    fields: {
      sFirstName: {
        value: '',
        isValid: false
      },
      sLastName: {
        value: '',
        isValid: false
      },
      sEmail: {
        value: '',
        isValid: false
      },
      sPassword: {
        value: '',
        isValid: false,
      },
      sConfirmPassword: {
        value: '',
        isValid: false,
      },
    },
    error: "",
  });

  const changeMode = (isLoginMode) => {
    setLoginState({
      fields: {
        email: {
          value: '',
          isValid: false
        },
        password: {
          value: '',
          isValid: false,
        }
      },
      error: ""
    });
    setSignUpState({
      fields: {
        sFirstName: {
          value: '',
          isValid: false
        },
        sLastName: {
          value: '',
          isValid: false
        },
        sEmail: {
          value: '',
          isValid: false
        },
        sPassword: {
          value: '',
          isValid: false,
        },
        sConfirmPassword: {
          value: '',
          isValid: false,
        },
      },
      error: "",
    });
    setLoginMode(isLoginMode);
  }

  const loginInputHandler = (event) => {
    let { value, id } = event.target;
    let field = {
      value,
      isValid: checkValidity(value, LOGIN_CONFIG[id].validation)
    };
    setLoginState(prevState => {
      let fields = { ...prevState.fields };
      fields[id] = field;
      return { ...prevState, fields };
    });
  };

  const signupInputHandler = (event) => {
    let { value, id } = event.target;
    let field = {
      value,
      isValid: checkValidity(value, SIGNUP_CONFIG[id].validation)
    };
    setSignUpState(prevState => {
      let fields = { ...prevState.fields };
      fields[id] = field;
      return { ...prevState, fields };
    });
  };


  return (
    <Modal
      show={true}
      onClose={() => { }}>
      <div className="Authenticate">
        <img src={logo} alt="" className="Authenticate__img" />

        {/* login section */}
        <div className={`Authenticate__logIn ${isLoginMode ? 'mode' : ''}`}>
          <div>
            <p className="Authenticate__header">Log-In</p>
            {Object.keys(LOGIN_CONFIG).map(config =>
            (<div key={config} className="form__input">
              <label htmlFor={config}>{LOGIN_CONFIG[config].label}</label>
              <input id={config} {...LOGIN_CONFIG[config].props} value={loginState.fields[config].value}
                onChange={loginInputHandler} />
            </div>)
            )}
            <div className="form__input">
              <input type="submit" value="Continue" className='primary-btn' />
            </div>
            <p className="error">
              {loginState.error}
            </p>
          </div>
          <div>
            <div className="newToAmazon">
              <div className="horizontalLine" />
              <p>New to Amazon?</p>
              <div className="horizontalLine" />
            </div>
            <button className="danger-btn changeMode" onClick={() => changeMode(false)}>Create your Amazon account</button>
          </div>
        </div>

        {/* signup-section */}
        <div className={`Authenticate__signUp ${!isLoginMode ? 'mode' : ''}`}>
          <p className="Authenticate__header">Create Account</p>
          {Object.keys(SIGNUP_CONFIG).map(config =>
          (<div key={config} className="form__input">
            <label htmlFor={config}>{SIGNUP_CONFIG[config].label}</label>
            <input id={config} {...SIGNUP_CONFIG[config].props} value={signUpState.fields[config].value} onChange={signupInputHandler} />
          </div>)
          )}
          <div className="form__input">
            <input type="submit" value="Create" onClick={() => { }} className='primary-btn' />
          </div>
          <p className="error">
            {signUpState.error}
          </p>
          <div className="newToAmazon">
            <div className="horizontalLine" />
            <p>Already have an account?</p>
            <div className="horizontalLine" />
          </div>
          <button className="danger-btn changeMode" onClick={() => changeMode(true)}>Log-In</button>
        </div>

      </div>
    </Modal>
  )
}

export default Authenticate;
