import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Product from '../Product/Product';
import Loader from '../UI/Loader/Loader';
import Pagination from '../UI/Pagination/Pagination';
import { emptyProductListing, fetchProductListing } from '../../store/actionsCreators';

import './Home.css';

const Home = props => {

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

  let productDisplay = null;
  if (props.products.length > 0) {
    productDisplay = <div className="Home__containerProducts">
      <div className="Home__containerProductsList">
        {props.products.map(product => {
          return <Product key={product._id} product={product} />
        })}
      </div>
      <div className="Home__containerProductsPagination">
        <Pagination
          totalPage={parseInt(Math.ceil(props.totalProducts / props.limit))}
          currentPage={props.page}
          updateFn={props.fetchProducts} />
      </div>
    </div>;

  }

  return (
    <div className="Home">
      <Loader show={props.isLoading} />
      <div className="Home__container">
        {productDisplay}
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    page: state.products.page,
    limit: state.products.limit,
    count: state.products.count,
    products: state.products.products,
    totalProducts: state.products.totalProducts,
    error: state.products.error,
    isLoading: state.products.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    emptyProducts: () => dispatch(emptyProductListing()),
    fetchProducts: (requestedPage) => dispatch(fetchProductListing(requestedPage))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
