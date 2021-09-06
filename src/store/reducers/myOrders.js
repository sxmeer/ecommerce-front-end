const initialState = {
  orderId: null,
  paymentStatus: null,
  orderStatus: null,
  page: 0,
  limit: 5,
  error: null,
  isLoading: false,
  orders: []
}

const reducer = (state = initialState, action) => {
  return state;
}

export default reducer;