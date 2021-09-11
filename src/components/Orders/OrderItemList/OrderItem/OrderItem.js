import React, { useState } from 'react';
import { ORDER_STATUS, PAYMENT_STATUS, PAYMENT_METHOD } from '../../../../config';

import './OrderItem.css';

const dateOptions = { hour: "numeric", minute: "numeric", year: 'numeric', month: 'long', day: 'numeric' };
const getFormattedDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', dateOptions);
}

const Order = React.memo(({ order, isAdmin, editOrder }) => {
  const [editState, setEditState] = useState({
    orderStatus: order.orderStatus,
    paymentStatus: order.paymentStatus
  });
  const [isOpen, setOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  const edit = () => {
    editOrder(order._id, editState);
    setEditMode(false);
  }

  const cancelEdit = () => {
    setEditState({
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus
    });
    setEditMode(false);
  };

  return (
    <div className="Order">
      <div className={`upper ${isOpen ? 'open' : ''}`}>
        <div className="Order__Header">
          <p><span className="value">ORDER # {order._id}</span></p>
          <i className={`fa fa-angle-down ${isOpen ? 'open' : ''}`}
            onClick={() => setOpen((prev) => !prev)}></i>
        </div>
        <div className="Order__subdetailOne">
          {order.transactionId && <p>Transaction Id: <span className="value">{order.transactionId}</span></p>}
          {isAdmin && <p>User: <span className="value">{order.user.email}</span></p>}
          <p>Address: <span className="value">{order.address}</span></p>
          <p>Payment Method: <span className="value">{PAYMENT_METHOD[order.paymentMethod]}</span></p>
          <p>Booked on: <span className="value">{getFormattedDate(order.createdAt)}</span></p>
          <p>Last updated on: <span className="value">{getFormattedDate(order.updatedAt)}</span></p>
        </div>
        <div className="Order__optionsContainer">
          <div className="Order__options">
            <p>Status: </p>
            {isEditMode ?
              <select
                // disabled={!isEditMode}
                value={editState.orderStatus}
                onChange={(event) => {
                  setEditState((prev) => ({ ...prev, orderStatus: event.target.value }))
                }}>
                {Object.keys(ORDER_STATUS).map(key => {
                  return <option key={key} value={key}>{ORDER_STATUS[key]}</option>;
                })}
              </select>
              :
              <p><span className="value">{ORDER_STATUS[editState.orderStatus]}</span></p>
            }

          </div>
          <div className="Order__options">
            <p>Payment: </p>
            {isEditMode ?
              <select
                // disabled={!isEditMode}
                value={editState.paymentStatus}
                onChange={(event) => {
                  setEditState((prev) => ({ ...prev, paymentStatus: event.target.value }))
                }}>
                {Object.keys(PAYMENT_STATUS).map(key => {
                  return <option key={key} value={key}>{PAYMENT_STATUS[key]}</option>;
                })}
              </select>
              :
              <p><span className="value">{PAYMENT_STATUS[editState.paymentStatus]}</span></p>
            }

          </div>
        </div>
      </div>
      <div className="collapsableContainer">
        <div className={`lower ${isOpen ? 'open' : ''}`}>
          <div className="Order__breakdownContainer">
            <p>Order breakdown:</p>
            {order.products.map((productEl, index) => {
              return <div className="Order__breakdownItem" key={productEl._id}>
                <p className="Order__breakdownItemName">
                  {index + 1 + ") "}  <span className="value">{productEl.product.name}</span>
                </p>
                <p className="Order__breakdownItemPrice">
                  {"₹" + productEl.product.price + " * " + productEl.count + " = ₹" + productEl.totalPrice}
                </p>
              </div>
            })}
          </div>
        </div>
      </div>
      <p className="Order__price">Total Price: <span className="">₹ </span><span className="">{order.totalPrice}</span></p>
      {
        isAdmin && <div className="Order__buttonContainer">
          {isEditMode ? <>
            <button className="danger-btn" onClick={cancelEdit}>Cancel</button>
            <button className="primary-btn" onClick={edit}>Done</button>
          </> :
            <button className="primary-btn" onClick={() => setEditMode(true)}>Edit</button>
          }
        </div>
      }
    </div >
  );
});

export default Order;
