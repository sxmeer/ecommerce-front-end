import React from 'react';
import OrderItem from './OrderItem/OrderItem';

const OrderItemList = ({ orders, isAdmin, editOrder }) => {
  return orders.map(order => <OrderItem key={order._id} order={order} isAdmin={isAdmin} editOrder={editOrder} />);
};

export default OrderItemList;
