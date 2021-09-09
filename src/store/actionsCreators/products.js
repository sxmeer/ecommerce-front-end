import * as actions from './actions';
import axios from '../../axios-config';

const productListingStart = () => {
  return {
    type: actions.PRODUCT_LISTING_START
  };
};

const productListingSuccess = (data) => {
  return {
    type: actions.PRODUCT_LISTING_SUCCESS,
    payload: data
  };
};

const productListingFailure = (err) => {
  return {
    type: actions.PRODUCT_LISTING_FAILURE,
    payload: err
  };
};

export const emptyProductListing = () => {
  return {
    type: actions.PRODUCT_LISTING_EMPTY
  };
};



export const fetchProductListing = (requestedPage) => {
  return (dispatch, getState) => {
    dispatch(productListingStart());
    let page = requestedPage || getState().products.page;
    let limit = getState().products.limit;
    axios.get("product/all", {
      params: new URLSearchParams([["page", page], ["limit", limit]])
    }).then(response => {
      dispatch(productListingSuccess(response.data));
    }).catch(error => {
      dispatch(productListingFailure(error.response.data.message));
    });
  }
}

export const defaultProducts = () => {
  return {
    type: actions.DEFAULT_PRODUCT
  };
};