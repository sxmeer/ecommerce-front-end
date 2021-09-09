import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ORDER_STATUS, PAYMENT_STATUS } from '../../config';
import { fetchAllOrders, allOrderEmpty, setAllOrderFilter } from '../../store/actionsCreators';
import Loader from '../UI/Loader/Loader';
import Pagination from '../UI/Pagination/Pagination';
import OrderItemList from '../Orders/OrderItemList/OrderItemList';

import './AllOrders.css';

const AllOrders = props => {
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
    <div className="MyOrders">
      <div className="MyOrders__container">
        <Loader show={props.isLoading} />
        <div className="MyOrders_searchContainer">
          <div className="MyOrders_searchContainer_input">
            <input
              onChange={(event) => setSearchParams({ ...searchParams, orderId: event.target.value.trim() })}
              type="text"
              value={searchParams.orderId}
              placeholder="Enter Order Id" />
          </div>
          <div className="MyOrders_searchContainer_select">
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
        <div className="MyOrders_ordersListing">
          {!props.isLoading && props.orders.length === 0 &&
            <p className="MyOrders__noOrders">No Orders 👻 </p>}
          <OrderItemList isAdmin orders={props.orders} />
        </div>
        <div className="MyOrders__paginationContainer">
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    emptyOrders: () => dispatch(allOrderEmpty()),
    fetchOrders: (requestedPage) => dispatch(fetchAllOrders(requestedPage)),
    setOrderFilter: (filterObj) => dispatch(setAllOrderFilter(filterObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);