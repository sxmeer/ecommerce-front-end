import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allOrders from './reducers/allOrders';
import myCart from './reducers/myCart';
import myOrders from './reducers/myOrders';
import products from './reducers/products';
import auth from './reducers/auth';

const reducers = combineReducers({
  allOrders,
  myCart,
  myOrders,
  products,
  auth
});

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export default store;