import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allOrders from './reducers/allOrders';
import myCart from './reducers/myCart';
import myOrders from './reducers/myOrders';
import products from './reducers/products';
import user from './reducers/user';

const reducers = combineReducers({
  allOrders,
  myCart,
  myOrders,
  products,
  user
});

const composeEnhancers = process.env.NODE_ENV === 'development' ?
  (typeof window !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) : null
  || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export default store;