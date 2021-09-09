import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AdminRoute from '../../helper/RoutesHelper/AdminRoute';
import PrivateRoute from '../../helper/RoutesHelper/PrivateRoute';

import Home from '../Home/Home';
import Cart from '../Cart/Cart';
import Orders from '../Orders/Orders';
import ProductDetail from '../Product/ProductDetail/ProductDetail';
import './Layout.css';

import { PRODUCT_COMPONENT_MODES } from '../../config';
import AllOrders from '../AllOrders/AllOrders';

const Layout = () => {
  return (
    <div className="Layout">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/product/:id"
          render={(props) =>
            <ProductDetail defaultMode={PRODUCT_COMPONENT_MODES.VIEW_MODE} {...props} />
          }
        />
        <AdminRoute path="/product" defaultMode={PRODUCT_COMPONENT_MODES.CREATE_MODE} component={ProductDetail} />
        <PrivateRoute path="/cart" component={Cart} />
        <PrivateRoute path="/orders" component={Orders} />
        <AdminRoute path="/all-orders" component={AllOrders} />
        <Redirect to="/" />
      </Switch>
    </div>
  )
};

export default Layout;
