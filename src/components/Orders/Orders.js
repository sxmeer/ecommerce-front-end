import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ORDER_STATUS, PAYMENT_STATUS } from '../../config';
import { fetchOrders, orderEmpty, setOrderFilter } from '../../store/actionsCreators';
import Loader from '../UI/Loader/Loader';
import Pagination from '../UI/Pagination/Pagination';
import OrderItemList from './OrderItemList/OrderItemList';
import './Orders.css';

const Orders = props => {

  const [searchParams, setSearchParams] = useState({
    orderId: props.orderId,
    orderStatus: props.orderStatus,
    paymentStatus: props.paymentStatus
  });

  useEffect(() => {
    props.fetchOrders();
    return () => {
      props.emptyOrders();
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.orders.length > 0) {
      window.scrollTo(0, 0);
    }
  }, [props.orders]);

  const searchFilteredItems = () => {
    props.setOrderFilter(searchParams)
    props.fetchOrders(1);
  };
  return (
    <div className="Orders">
      <div className="Orders__container">
        <Loader show={props.isLoading} />
        <div className="Orders_searchContainer">
          <div className="Orders_searchContainer_input">
            <input
              onChange={(event) => setSearchParams({ ...searchParams, orderId: event.target.value.trim() })}
              type="text"
              value={searchParams.orderId}
              placeholder="Enter Order Id" />
          </div>
          <div className="Orders_searchContainer_select">
            <div>
              <p>Order Status:</p>
              <select
                onChange={(event) => setSearchParams({ ...searchParams, orderStatus: event.target.value })}
                value={searchParams.orderStatus}>
                <option value="">All</option>
                {Object.keys(ORDER_STATUS).map(key => {
                  return <option key={key} value={key}>{ORDER_STATUS[key]}</option>;
                })}
              </select>
            </div>
            <div>
              <p>Payment Status:</p>
              <select
                onChange={(event) => setSearchParams({ ...searchParams, paymentStatus: event.target.value })}
                value={searchParams.paymentStatus}>
                <option value="">All</option>
                {Object.keys(PAYMENT_STATUS).map(key => {
                  return <option key={key} value={key}>{PAYMENT_STATUS[key]}</option>;
                })}
              </select>
            </div>
            <button
              onClick={searchFilteredItems}
              className="secondary-btn searchBtn">
              Search
            </button>
          </div>
        </div>
        <div className="Orders_ordersListing">
          {!props.isLoading && props.orders.length === 0 &&
            <p className="Orders__noOrders">No Orders 👻 </p>}
          {!props.isLoading && props.orders.length > 0 &&
            <div className="AllOrders__pageCountContainer">
              <p>Total {props.totalOrders} {props.totalOrders > 1 ? 'Orders' : 'Order'}</p>
              <p>Page {props.page} of {parseInt(Math.ceil(props.totalOrders / props.limit))}</p>
            </div>
          }
          <OrderItemList orders={props.orders} />
        </div>
        <div className="Orders__paginationContainer">
          {!props.isLoading && props.orders.length > 0 &&
            <Pagination
              totalPage={parseInt(Math.ceil(props.totalOrders / props.limit))}
              currentPage={props.page}
              updateFn={props.fetchOrders} />
          }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orderId: state.myOrders.orderId,
    paymentStatus: state.myOrders.paymentStatus,
    orderStatus: state.myOrders.orderStatus,
    page: state.myOrders.page,
    limit: state.myOrders.limit,
    count: state.myOrders.count,
    orders: state.myOrders.orders,
    totalOrders: state.myOrders.totalOrders,
    error: state.myOrders.error,
    isLoading: state.myOrders.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    emptyOrders: () => dispatch(orderEmpty()),
    fetchOrders: (requestedPage) => dispatch(fetchOrders(requestedPage)),
    setOrderFilter: (filterObj) => dispatch(setOrderFilter(filterObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
