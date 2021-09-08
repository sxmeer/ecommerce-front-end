import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from '../../../axios-config';

import { PRODUCT_COMPONENT_MODES, PRODUCT_VALIDATION, checkValidity, IMAGE_CONFIG, USER_TYPES } from '../../../config';
import './ProductDetail.css';
import Loader from '../../UI/Loader/Loader';
import AlertMessage from '../../UI/AlertMessage/AlertMessage';
import ConfirmMessage from '../../UI/ConfirmMessage/ConfirmMessage';
import { initialAlertConfig } from '../../Home/Home';
import { addToCart, clearAddToCartMessage } from '../../../store/actionsCreators';

//user can reach here by clicking the product
//checks to be present for authenticated user to add in the cart, admin to edit the product
//create product mode for admin
const ProductDetail = ({
  defaultMode,
  isLoggedInAdmin,
  isLoggedIn,
  userId,
  token,
  history,
  addToCart,
  isAddingToCart,
  addToCartMessage,
  clearAddToCartMessage,
}) => {
  const ref = useRef(null);
  const [alertMessageConfig, setAlertMessageConfig] = useState(initialAlertConfig);
  const { id } = useParams();
  const [productDelete, setProductDelete] = useState({
    showDeleteDialog: false,
    isDeleted: false
  });
  const [isLoaderVisible, setLoaderVisible] = useState(defaultMode === PRODUCT_COMPONENT_MODES.VIEW_MODE);
  const [mode, setMode] = useState(defaultMode);
  const [productForm, setProductForm] = useState({
    image: {
      imageFile: null,
      imageUrl: null,
    },
    price: {
      value: 0,
      isValid: false
    },
    name: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    error: null
  });

  const addToCartHandler = () => {
    if (!isLoggedIn) {
      setAlertMessageConfig({
        show: true,
        message: "Please login to continue",
        onPositiveBtnClick: () => {
          setAlertMessageConfig(initialAlertConfig)
        },
        positiveBtn: "OK"
      })
    } else {
      addToCart(id, parseInt(ref.current.value));
    }
  }

  useEffect(() => {
    if (addToCartMessage) {
      setAlertMessageConfig({
        show: true,
        message: addToCartMessage,
        onPositiveBtnClick: () => {
          setAlertMessageConfig(initialAlertConfig);
          clearAddToCartMessage();
        },
        positiveBtn: "OK"
      })
    }
    // eslint-disable-next-line
  }, [addToCartMessage]);

  const fetchProduct = useCallback(() => {
    setLoaderVisible(true);
    axios.get("product", {
      params: new URLSearchParams([["productId", id]])
    }).then(response => {
      setMode(PRODUCT_COMPONENT_MODES.VIEW_MODE);
      setLoaderVisible(false);
      let product = response.data;
      setProductForm({
        image: {
          imageFile: null,
          imageUrl: product.image.imageUrl
        },
        price: {
          value: product.price,
          isValid: true
        },
        name: {
          value: product.name,
          isValid: true
        },
        description: {
          value: product.description,
          isValid: true
        },
        error: null
      })
    }).catch(error => {
      setMode(PRODUCT_COMPONENT_MODES.VIEW_MODE);
      setLoaderVisible(false);
    })
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id, fetchProduct]);

  const checkFormValidity = () => {
    let error = null;
    if (!productForm.description.isValid) {
      error = "Please provide proper description";
    }
    if (!productForm.name.isValid) {
      error = "Please provide proper name";
    }
    if (!productForm.price.isValid) {
      error = "Please provide proper price";
    }
    if (!productForm.image.imageUrl) {
      error = "Please provide image";
    }
    return error;
  }

  const imageHandler = (event) => {
    if (event.target.files.length > 0) {
      let fileObject = event.target.files[0];
      if (fileObject.size <= IMAGE_CONFIG.MAX_SIZE && IMAGE_CONFIG.SUPPORTED_FORMATS.includes(fileObject.type)) {
        if (productForm.image.imageFile) {
          URL.revokeObjectURL(productForm.image.imageFile);
        }
        let field = {
          imageFile: fileObject,
          imageUrl: URL.createObjectURL(fileObject)
        }
        setProductForm(prevState => ({ ...prevState, image: field }));
      }
    }
  }

  const removeImage = () => {
    if (productForm.image.imageFile) {
      URL.revokeObjectURL(productForm.image.imageFile);
    }
    let image = {
      imageFile: null,
      imageUrl: null,
    }
    setProductForm(prevState => ({ ...prevState, image }));
  }


  const inputChangeHandler = (event) => {
    let { id, value } = event.target;
    let field = {
      value,
      isValid: checkValidity(value, PRODUCT_VALIDATION[id])
    };
    setProductForm(prevState => ({ ...prevState, [id]: field }));
  }

  const createProduct = () => {
    let error = checkFormValidity();
    if (!error) {
      setLoaderVisible(true);
      let formData = new FormData();
      formData.append("productImage", productForm.image.imageFile);
      formData.append("name", productForm.name.value.trim());
      formData.append("description", productForm.description.value.trim());
      formData.append("price", Number(productForm.price.value));
      axios.post("product/create", formData, {
        params: new URLSearchParams([["userId", userId]]),
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(response => {
        history.replace({ pathname: `/product/${response.data._id}` });
      }).catch(error => {
        setLoaderVisible(false);
        setProductForm({ ...productForm, error: error.response.data.message });
      })
    } else {
      setProductForm({ ...productForm, error: error });
    }
  }

  const editProduct = () => {
    let error = checkFormValidity();
    if (!error) {
      setLoaderVisible(true);
      let formData = new FormData();
      if (productForm.image.imageFile) {
        formData.append("productImage", productForm.image.imageFile);
      }
      formData.append("name", productForm.name.value.trim());
      formData.append("description", productForm.description.value.trim());
      formData.append("price", Number(productForm.price.value));
      axios.patch("product/update", formData, {
        params: new URLSearchParams([["userId", userId], ["productId", id]]),
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(response => {
        setLoaderVisible(false);
        setMode(PRODUCT_COMPONENT_MODES.VIEW_MODE);
      }).catch(error => {
        setLoaderVisible(false);
        setProductForm({ ...productForm, error: error.response.data.message });
      })
    } else {
      setProductForm({ ...productForm, error: error });
    }
  }


  const deleteProduct = () => {
    setLoaderVisible(true);
    axios.delete("/product/delete", {
      params: new URLSearchParams([["userId", userId], ["productId", id]]),
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      setLoaderVisible(false);
      setProductDelete({ showDeleteDialog: false, isDeleted: true });
    }).catch(error => {
      setLoaderVisible(false);
    })
  }

  let buttons = [];
  switch (mode) {
    case PRODUCT_COMPONENT_MODES.CREATE_MODE:
      if (isLoggedInAdmin) {
        buttons.push(<button
          onClick={createProduct}
          className="primary-btn">Create</button>);
      }
      break;
    case PRODUCT_COMPONENT_MODES.EDIT_MODE:
      if (isLoggedInAdmin) {
        buttons.push(<button className="danger-btn" onClick={fetchProduct}>
          Cancel</button>);
        buttons.push(<button className="primary-btn" onClick={editProduct}>Done</button>);
      }
      break;
    case PRODUCT_COMPONENT_MODES.VIEW_MODE:
      if (isLoggedInAdmin) {
        buttons.push(<button
          className="danger-btn"
          onClick={() => { setProductDelete({ ...setProductDelete, showDeleteDialog: true }) }}>
          Delete</button>);
        buttons.push(<button className="secondary-btn" onClick={() => setMode(PRODUCT_COMPONENT_MODES.EDIT_MODE)}>Edit</button>);
      }
      buttons.push(<button className="primary-btn" onClick={addToCartHandler}>Add to cart</button>);
      break;
    default:
      break;
  }

  return (
    <div className="ProductDetail">
      <Loader show={isLoaderVisible || isAddingToCart} />
      {alertMessageConfig.show && <AlertMessage {...alertMessageConfig} />}
      {productDelete.isDeleted && <AlertMessage
        show
        message="The product has been deleted"
        positiveBtn="OK"
        onPositiveBtnClick={() => { history.replace({ pathname: "/product" }); }} />}
      {productDelete.showDeleteDialog && <ConfirmMessage
        show
        message="Do you want to delete this product?"
        positiveBtn="Yes"
        negativeBtn="No"
        onNegativeBtnClick={() => { setProductDelete({ ...setProductDelete, showDeleteDialog: false }) }}
        onPositiveBtnClick={deleteProduct} />}

      <div className="ProductDetail__left">
        <div className={`Product__imgContainer ${mode !== PRODUCT_COMPONENT_MODES.VIEW_MODE ? 'edit' : ''}`}>
          {!productForm.image.imageUrl &&
            <p className="desc">No image selected</p>
          }
          <img
            className={`.Product__imgContainerImg`}
            src={productForm.image.imageUrl} alt="" />
        </div>
        {mode !== PRODUCT_COMPONENT_MODES.VIEW_MODE &&
          <>
            <div className="Product__imageControls">
              <label htmlFor="image">{productForm.image.imageUrl ? 'Change Image' : 'Add Image'}</label>
              <input type="file" name="" id="image" onChange={imageHandler} />
              <label htmlFor="" onClick={removeImage}>Remove image</label>
            </div>
            <p className="info">Image can be only of type {IMAGE_CONFIG.SUPPORTED_FORMATS_TEXT.join(", ")} and max-size of {IMAGE_CONFIG.MAX_SIZE_TEXT}</p>
          </>}
      </div>
      <div className="ProductDetail__right">

        <div className="form__inputContainer">

          <div className="form__input">
            <label
              className={mode !== PRODUCT_COMPONENT_MODES.VIEW_MODE ? 'edit' : ''}
              htmlFor="name">
              Product name:
            </label>
            <input
              type="text"
              id="name"
              value={productForm.name.value}
              onChange={inputChangeHandler}
              autoComplete="off"
              disabled={mode === PRODUCT_COMPONENT_MODES.VIEW_MODE} />
            <p
              className={`desc ${mode !== PRODUCT_COMPONENT_MODES.VIEW_MODE ? 'edit' : ''}`}>
              min: {PRODUCT_VALIDATION.name.minLength} and max: {PRODUCT_VALIDATION.name.maxLength} characters
            </p>
          </div>

          <div className="form__input">
            <label
              className={mode !== PRODUCT_COMPONENT_MODES.VIEW_MODE ? 'edit' : ''}
              htmlFor="description">
              Product description:
            </label>
            <textarea
              id="description"
              value={productForm.description.value}
              onChange={inputChangeHandler}
              autoComplete="off"
              disabled={mode === PRODUCT_COMPONENT_MODES.VIEW_MODE} />
            <p
              className={`desc ${mode !== PRODUCT_COMPONENT_MODES.VIEW_MODE ? 'edit' : ''}`}>
              min: {PRODUCT_VALIDATION.description.minLength} and max: {PRODUCT_VALIDATION.description.maxLength} characters
            </p>
          </div>

          <div className="form__input">
            <label
              className={mode !== PRODUCT_COMPONENT_MODES.VIEW_MODE ? 'edit' : ''}
              htmlFor="price">Product price:
            </label>
            <p>₹
              <input
                placeholder=""
                type="number"
                value={productForm.price.value}
                onChange={inputChangeHandler}
                id="price"
                autoComplete="off"
                disabled={mode === PRODUCT_COMPONENT_MODES.VIEW_MODE} />
            </p>
            <p
              className={`desc ${mode !== PRODUCT_COMPONENT_MODES.VIEW_MODE ? 'edit' : ''}`}>
              Please enter integer number
            </p>
          </div>
          {mode === PRODUCT_COMPONENT_MODES.VIEW_MODE &&
            <div>
              <span className="Product__sm" style={{ marginRight: '0.5rem' }}>Quantity</span>
              <select ref={ref} className="Product__quantity" name="" id="">
                <option value="1" defaultChecked >1</option>
                <option value="2" >2</option>
                <option value="3" >3</option>
                <option value="4" >4</option>
                <option value="5" >5</option>
              </select>
            </div>
          }
        </div >

        {mode !== PRODUCT_COMPONENT_MODES.VIEW_MODE &&
          <>
            <p className="info">
              All fields are mandatory. Blank spaces will be removed from the starting and ending of the inputs
            </p>
            <br />
            <p className="error">
              {productForm.error}
            </p>
          </>
        }
        <div className="form__links">
          {buttons.map((btn, ind) => {
            return <React.Fragment key={ind}>{btn}</React.Fragment>
          })}
        </div>
      </div >
    </div >
  );
};

const mapStateToProps = state => {
  return {
    isLoggedInAdmin: state.auth.token !== null && state.auth.role !== null && state.auth.role === USER_TYPES.TYPE_ADMIN,
    isLoggedIn: state.auth.token !== null,
    token: state.auth.token,
    userId: state.auth._id,
    addToCartMessage: state.myCart.addToCartMessage,
    isAddingToCart: state.myCart.isAddingToCart
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (productId, productCount) => dispatch(addToCart(productId, productCount)),
    clearAddToCartMessage: () => dispatch(clearAddToCartMessage())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetail));
