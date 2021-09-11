import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { ORDER_STATUS, PAYMENT_STATUS } from '../../config';
import { fetchAllOrders, allOrderEmpty, setAllOrderFilter, editOrder } from '../../store/actionsCreators';
import Loader from '../UI/Loader/Loader';
import Pagination from '../UI/Pagination/Pagination';
import OrderItemList from '../Orders/OrderItemList/OrderItemList';
import axios from '../../axios-config';

import './AllOrders.css';

const AllOrders = ({ orderId,
  paymentStatus,
  orderStatus,
  page,
  limit,
  count,
  orders,
  totalOrders,
  error,
  isLoading,
  token,
  userId,
  emptyOrders,
  fetchOrders,
  setOrderFilter,
  updateOrder }) => {
  const [searchParams, setSearchParams] = useState({
    orderId: orderId,
    orderStatus: orderStatus,
    paymentStatus: paymentStatus
  });

  useEffect(() => {
    fetchOrders();
    return () => {
      emptyOrders();
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      window.scrollTo(0, 0);
    }
  }, [orders]);

  const searchFilteredItems = () => {
    setOrderFilter(searchParams)
    fetchOrders(1);
  };

  const editOrder = useCallback((orderId, editConfig) => {
    axios.patch("order/edit", editConfig, {
      params: new URLSearchParams([["userId", userId], ["orderId", orderId]]),
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      updateOrder(response.data);
    }).catch(_ => {
      console.dir(_);
    });
  }, [userId, token, updateOrder]);

  return (
    <div className="AllOrders">
      <div className="AllOrders__container">
        <Loader show={isLoading} />
        <div className="AllOrders_searchContainer">
          <div className="AllOrders_searchContainer_input">
            <input
              onChange={(event) => setSearchParams({ ...searchParams, orderId: event.target.value.trim() })}
              type="text"
              value={searchParams.orderId}
              placeholder="Enter Order Id" />
          </div>
          <div className="AllOrders_searchContainer_select">
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
        <div className="AllOrders_ordersListing">
          {!isLoading && orders.length === 0 &&
            <p className="AllOrders__noOrders">No Orders 👻 </p>}
          {!isLoading && orders.length > 0 &&
            <div className="AllOrders__pageCountContainer">
              <p>Total {totalOrders} {totalOrders > 1 ? 'Orders' : 'Order'}</p>
              <p>page {page} of {parseInt(Math.ceil(totalOrders / limit))}</p>
            </div>
          }
          <OrderItemList isAdmin orders={orders} editOrder={editOrder} />
        </div>
        <div className="AllOrders__paginationContainer">
          {!isLoading && orders.length > 0 &&
            <Pagination
              totalPage={parseInt(Math.ceil(totalOrders / limit))}
              currentPage={page}
              updateFn={fetchOrders} />
          }
        </div>
      </div>
    </div >
  );
};

const mapStateToProps = (state) => {
  return {
    orderId: state.allOrders.orderId,
    paymentStatus: state.allOrders.paymentStatus,
    orderStatus: state.allOrders.orderStatus,
    page: state.allOrders.page,
    limit: state.allOrders.limit,
    count: state.allOrders.count,
    orders: state.allOrders.orders,
    totalOrders: state.allOrders.totalOrders,
    error: state.allOrders.error,
    isLoading: state.allOrders.isLoading,
    token: state.auth.token,
    userId: state.auth._id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    emptyOrders: () => dispatch(allOrderEmpty()),
    fetchOrders: (requestedPage) => dispatch(fetchAllOrders(requestedPage)),
    setOrderFilter: (filterObj) => dispatch(setAllOrderFilter(filterObj)),
    updateOrder: (order) => dispatch(editOrder(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);