import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from '../UI/Loader/Loader';
import Pagination from '../UI/Pagination/Pagination';
import { addToCart, clearAddToCartMessage, emptyProductListing, fetchProductListing } from '../../store/actionsCreators';

import './Home.css';
import ProductList from '../Product/ProductList';
import AlertMessage from '../UI/AlertMessage/AlertMessage';

export const initialAlertConfig = {
  show: false,
  message: null,
  onPositiveBtnClick: () => { },
  positiveBtn: "OK"
};

const Home = props => {

  const [alertMessageConfig, setAlertMessageConfig] = useState(initialAlertConfig);

  const addToCart = useCallback((productId, productCount) => {
    if (!props.isLoggedIn) {
      setAlertMessageConfig({
        show: true,
        message: "Please login to continue",
        onPositiveBtnClick: () => {
          setAlertMessageConfig(initialAlertConfig)
        },
        positiveBtn: "OK"
      })
    } else {
      props.addToCart(productId, productCount);
    }
    // eslint-disable-next-line
  }, [props.isLoggedIn]);

  useEffect(() => {
    props.fetchProducts();
    return () => {
      props.emptyProducts();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.products.length > 0) {
      window.scrollTo(0, 0);
    }
  }, [props.products]);

  useEffect(() => {
    if (props.addToCartMessage) {
      setAlertMessageConfig({
        show: true,
        message: props.addToCartMessage,
        onPositiveBtnClick: () => {
          setAlertMessageConfig(initialAlertConfig);
          props.clearAddToCartMessage();
        },
        positiveBtn: "OK"
      })
    }
    // eslint-disable-next-line
  }, [props.addToCartMessage]);

  return (
    <div className="Home">
      <Loader show={props.isLoading || props.isAddingToCart} />
      {alertMessageConfig.show && <AlertMessage {...alertMessageConfig} />}
      <div className="Home__container">
        <div className="Home__containerProducts">
          <div className="Home__containerProductsList">
            {!props.isLoading && props.products.length === 0 && <p>No products 👻</p>}
            <ProductList addToCart={addToCart} products={props.products} />
          </div>
          <div className="Home__containerProductsPagination">
            {!props.isLoading && props.products.length > 0 &&
              <Pagination
                totalPage={parseInt(Math.ceil(props.totalProducts / props.limit))}
                currentPage={props.page}
                updateFn={props.fetchProducts} />
            }
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.token !== null,
    page: state.products.page,
    limit: state.products.limit,
    count: state.products.count,
    products: state.products.products,
    totalProducts: state.products.totalProducts,
    error: state.products.error,
    isLoading: state.products.isLoading,
    addToCartMessage: state.myCart.addToCartMessage,
    isAddingToCart: state.myCart.isAddingToCart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    emptyProducts: () => dispatch(emptyProductListing()),
    fetchProducts: (requestedPage) => dispatch(fetchProductListing(requestedPage)),
    addToCart: (productId, productCount) => dispatch(addToCart(productId, productCount)),
    clearAddToCartMessage: () => dispatch(clearAddToCartMessage())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
