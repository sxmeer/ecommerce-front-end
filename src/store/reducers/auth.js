import * as actions from '../actionsCreators/actions';
import { updateObject } from '../../helper/Utils/utility';

const initialState = {
  token: null,
  _id: null,
  email: null,
  firstName: null,
  lastName: null,
  role: null,
  isLoading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_START: return loginStart(state, action);
    case actions.LOGIN_SUCCESS: return loginSuccess(state, action);
    case actions.LOGIN_FAILURE: return loginFailure(state, action);
    case actions.LOGIN_FAILURE_CLR_MSG: return loginFailureClrMsg(state, action);
    case actions.PREV_LOGIN: return prevLogin(state, action);
    case actions.LOGOUT_START: return logoutStart(state, action);
    case actions.LOGOUT_SUCCESS: return logoutSuccess(state, action);
    case actions.LOGOUT_FAILURE: return logoutFailure(state, action);
    default:
      return state;
  }
};


const loginStart = (state, action) => {
  return updateObject(state, { isLoading: true, error: null });
};

const loginSuccess = (state, action) => {
  let { token, user } = action.payload;
  let { _id, email, firstName, lastName, role } = user;
  let newAuthState = {
    token,
    _id,
    email,
    firstName,
    lastName,
    role,
    isLoading: false,
    error: null
  };
  localStorage.setItem('auth', JSON.stringify({ _id, email, firstName, lastName, role, token }));
  return newAuthState;
}

const loginFailure = (state, action) => {
  return updateObject(state, { isLoading: false, error: action.payload });
}

const loginFailureClrMsg = (state, action) => {
  return updateObject(state, { error: null });
}

const prevLogin = (state, action) => {
  return updateObject(state, action.payload);
}


const logoutStart = (state, action) => {
  return updateObject(state, { isLoading: true, error: null });
};

const logoutSuccess = (state, action) => {
  localStorage.removeItem('auth');
  return {
    token: null,
    _id: null,
    email: null,
    firstName: null,
    lastName: null,
    role: null,
    isLoading: false,
    error: null
  };
}

const logoutFailure = (state, action) => {
  return updateObject(state, { isLoading: false, error: action.payload });
}

export default reducer;