import React, { useState } from 'react';
import { LOGIN_CONFIG, SIGNUP_CONFIG, checkValidity } from '../../config';
import axios from '../../axios-config';

import Modal from '../UI/Modal/Modal';
import logo from '../../assets/logo_dark.svg';
import './Authenticate.css';
import { login } from '../../store/actionsCreators';
import { connect } from 'react-redux';
import AlertMessage from '../UI/AlertMessage/AlertMessage';

const Authenticate = React.memo((props) => {
  const [isLoginMode, setLoginMode] = useState(props.isLoginMode);
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
  });
  const [signUpState, setSignUpState] = useState({
    isAccountCreated: false,
    error: null,
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
  });

  const logIn = () => {
    props.login(loginState.fields.email.value.trim(), loginState.fields.password.value.trim());
  }

  const signUp = () => {
    props.toggleLoader(true);
    axios.post('/auth/signup', {
      firstName: signUpState.fields.sFirstName.value.trim(),
      lastName: signUpState.fields.sLastName.value.trim(),
      email: signUpState.fields.sEmail.value.trim(),
      password: signUpState.fields.sPassword.value.trim(),
      confirmPassword: signUpState.fields.sConfirmPassword.value.trim()
    }).then(response => {
      props.toggleLoader(false);
      setSignUpState({ ...signUpState, isAccountCreated: true });
    }).catch(error => {
      props.toggleLoader(false);
      setSignUpState({ ...signUpState, error: error.response.data.message });
    });
  }

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
      }
    });
    setSignUpState({
      isAccountCreated: false,
      error: null,
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
      }
    });
    setLoginMode(isLoginMode);
  }

  const loginInputHandler = (event) => {
    let { value, id } = event.target;
    let isValid = checkValidity(value, LOGIN_CONFIG[id].validation);
    let field = {
      value,
      isValid
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
      return { ...prevState, fields, error: null };
    });
  };

  return (
    <Modal
      show={true}
      closeModal={props.onClose}>
      <div className="Authenticate">
        <img src={logo} alt="" className="Authenticate__img" />
        {signUpState.isAccountCreated && <AlertMessage
          show
          message="Your account has been created. Please login to continue."
          positiveBtn="OK"
          onPositiveBtnClick={props.onClose} />}
        {/* login section */}
        <div className={`Authenticate__logIn ${isLoginMode ? 'mode' : ''}`}>
          <div>
            <p className="Authenticate__header">Log-In</p>
            {Object.keys(LOGIN_CONFIG).map(config =>
            (<div key={config} className="form__input">
              <label htmlFor={config}>{LOGIN_CONFIG[config].label}</label>
              <input
                id={config}
                {...LOGIN_CONFIG[config].props}
                value={loginState.fields[config].value}
                onChange={loginInputHandler} />
            </div>)
            )}
            <div className="form__input">
              <input
                type="submit"
                value="Continue"
                onClick={logIn}
                className='primary-btn' />
            </div>
            <p className="error">
              {props.error}
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
            <input
              id={config}
              {...SIGNUP_CONFIG[config].props}
              value={signUpState.fields[config].value}
              onChange={signupInputHandler} />
          </div>)
          )}
          <div className="form__input">
            <input
              type="submit"
              value="Create"
              onClick={signUp}
              className='primary-btn' />
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
});

const mapStateToProps = state => {
  return {
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);
