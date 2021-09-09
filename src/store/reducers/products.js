import * as actions from '../actionsCreators/actions';
import { updateObject } from '../../helper/Utils/utility';

const initialState = {
  page: 1,
  limit: 8,
  count: 0,
  products: [],
  totalProducts: 0,
  error: null,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PRODUCT_LISTING_START: return productListingStart(state, action);
    case actions.PRODUCT_LISTING_SUCCESS: return productListingSuccess(state, action);
    case actions.PRODUCT_LISTING_FAILURE: return productListingFailure(state, action);
    case actions.PRODUCT_LISTING_EMPTY: return productListingEmpty(state, action);
    case actions.DEFAULT_PRODUCT: return defaultProducts(state, action);
    default:
      return state;
  }
}

const productListingStart = (state, action) => {
  return updateObject(state, {
    error: null,
    isLoading: true,
  });
};

const productListingSuccess = (state, action) => {
  let { page, limit, count, products, totalProducts } = action.payload
  return {
    page,
    limit,
    count,
    products,
    totalProducts,
    error: null,
    isLoading: false,
  };
};

const productListingFailure = (state, action) => {
  return updateObject(state, {
    error: action.payload,
    isLoading: false,
  });
};

const productListingEmpty = (state, action) => {
  return updateObject(state, {
    count: 0,
    products: [],
    totalProducts: 0,
    error: null,
    isLoading: false,
  });
};

const defaultProducts = (state, action) => {
  return initialState;
};


export default reducer;