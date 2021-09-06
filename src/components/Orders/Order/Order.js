import React, { useState } from 'react';
import './Order.css';
import { ORDER_STATUS, PAYMENT_STATUS, PAYMENT_METHOD } from '../../../config';

const Order = ({ order, isAdmin }) => {
  const [isOpen, setOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  return (
    <div className="Order">
      <div className={`upper ${isOpen ? 'open' : ''}`}>
        <div className="Order__Header">
          <p>Order Id: {order._id}</p>
          <i className={`fa fa-angle-down ${isOpen ? 'open' : ''}`}
            onClick={() => setOpen((prev) => !prev)}></i>
        </div>
        <div className="Order__subdetailOne">
          {order.transactionId && <p>Transaction Id: {"aeaigneiangiaeg"}</p>}
          <p>User: {order.user.email}</p>
          <p>Address: {order.address}</p>
          <p>Payment Method: {PAYMENT_METHOD[order.paymentMethod]}</p>
        </div>
        <div className="Order__optionsContainer">
          <div className="Order__options">
            <p>Status</p>
            <select disabled={!isEditMode} value={order.orderStatus} onChange={() => { }}>
              {Object.keys(ORDER_STATUS).map(key => {
                return <option key={key} value={key}>{ORDER_STATUS[key]}</option>;
              })}
            </select>
          </div>
          <div className="Order__options">
            <p>Payment</p>
            <select disabled={!isEditMode} value={order.paymentStatus} onChange={() => { }}>
              {Object.keys(PAYMENT_STATUS).map(key => {
                return <option key={key} value={key}>{PAYMENT_STATUS[key]}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="collapsableContainer">
        <div className={`lower ${isOpen ? 'open' : ''}`}>
          <div className="Order__breakdownContainer">
            <p>Order breakdown:</p>
            {order.products.map((productEl, index) => {
              return <div className="Order__breakdownItem" key={productEl._id}>
                <p className="Order__breakdownItemName">{index + 1 + ") " + productEl.product.name}</p>
                <p className="Order__breakdownItemPrice">{"₹" + productEl.product.price + " * " + productEl.count + " = ₹" + productEl.totalPrice}</p>
              </div>
            })}
          </div>
        </div>
      </div>
      <p className="Order__price">Total Price: <span className="">₹ </span><span className="">{order.totalPrice}</span></p>
      {
        isAdmin && <div className="Order__buttonContainer">
          {isEditMode ? <>
            <button className="danger-btn" onClick={() => setEditMode(false)}>Cancel</button>
            <button className="primary-btn" onClick={() => setEditMode(false)}>Done</button>
          </> :
            <button className="primary-btn" onClick={() => setEditMode(true)}>Edit</button>
          }
        </div>
      }
    </div >
  );
};

export default Order;
