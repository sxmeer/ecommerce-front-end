import * as actions from './actions';
import axios from '../../axios-config';

const clearError = () => {
  return {
    type: actions.LOGIN_FAILURE_CLR_MSG,
  }
}

const loginStart = () => {
  return {
    type: actions.LOGIN_START
  };
};

const loginSuccess = (userData) => {
  return {
    type: actions.LOGIN_SUCCESS,
    payload: userData
  };
};

const loginFailure = (error) => {
  return {
    type: actions.LOGIN_FAILURE,
    payload: error
  };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginStart());
    axios.post('auth/login', {
      email, password
    }).then(response => {
      dispatch(loginSuccess(response.data));
    }).catch(error => {
      dispatch(loginFailure(error.response.data.message));
      setTimeout(() => {
        dispatch(clearError());
      }, 2000);
    });
  };
};

const logoutStart = () => {
  return {
    type: actions.LOGOUT_START
  };
};

const logoutSuccess = () => {
  return {
    type: actions.LOGOUT_SUCCESS
  };
};

const logoutFailure = () => {
  return {
    type: actions.LOGOUT_FAILURE
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    dispatch(logoutStart());
    const { token, _id } = getState().auth;
    axios.post('auth/logout', null, {
      params: new URLSearchParams([['userId', _id]]),
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        dispatch(logoutSuccess());
      }).catch(error => {
        dispatch(logoutFailure());
      });
  };
};