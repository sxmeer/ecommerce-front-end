import React from 'react';
import OrderItem from './OrderItem/OrderItem';

const OrderItemList = ({ orders }) => {
  return orders.map(order => <OrderItem key={order._id} order={order} isAdmin={false} />);
};

export default OrderItemList;
