import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AdminRoute from '../../helper/RoutesHelper/AdminRoute';
import PrivateRoute from '../../helper/RoutesHelper/PrivateRoute';

import Home from '../Home/Home';
import Cart from '../Cart/Cart';
import Orders from '../Orders/Orders';
import ProductDetail from '../Product/ProductDetail/ProductDetail';
import Logout from '../Logout/Logout';
import './Layout.css';

const Layout = () => {
  return (
    <div className="Layout">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/product/" createMode component={ProductDetail} />
        <PrivateRoute path="/cart" component={Cart} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/logout" component={Logout} />
        <AdminRoute path="/all-orders" isAdmin component={Orders} />
        <Redirect to="/" />
      </Switch>
    </div>
  )
};

export default Layout;
