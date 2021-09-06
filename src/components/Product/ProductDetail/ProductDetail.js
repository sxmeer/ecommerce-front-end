import React, { useState } from 'react';
// import { useParams } from 'react-router';
import './ProductDetail.css';
import { PRODUCT_COMPONENT_MODES, PRODUCT_VALIDATION, checkValidity, IMAGE_CONFIG } from '../../../config';

//user can reach here by clicking the product
//checks to be present for authenticated user to add in the cart, admin to edit the product
//create product mode for admin
const ProductDetail = ({ product, defaultMode }) => {
  // const { id } = useParams();
  const isAdminMode = true;
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
    }
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     setProductForm({
  //       image: {
  //         imageFile: null,
  //         imageUrl: product.image.imageUrl
  //       },
  //       price: {
  //         value: product.price,
  //         isValid: true
  //       },
  //       name: {
  //         value: product.name,
  //         isValid: true
  //       },
  //       description: {
  //         value: product.description,
  //         isValid: true
  //       }
  //     })
  //   }, 2000);
  // }, [product]);

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

  let buttons = [];
  switch (mode) {
    case PRODUCT_COMPONENT_MODES.CREATE_MODE:
      if (isAdminMode) {
        buttons.push(<button
          onClick={() => {
            setMode(PRODUCT_COMPONENT_MODES.VIEW_MODE)
          }}
          className="primary-btn">Create</button>);
      }
      break;
    case PRODUCT_COMPONENT_MODES.EDIT_MODE:
      if (isAdminMode) {
        buttons.push(<button className="danger-btn">Cancel</button>);
        buttons.push(<button className="primary-btn">Done</button>);
      }
      break;
    case PRODUCT_COMPONENT_MODES.VIEW_MODE:
      if (isAdminMode) {
        buttons.push(<button className="secondary-btn" onClick={() => setMode(PRODUCT_COMPONENT_MODES.EDIT_MODE)}>Edit</button>);
      }
      buttons.push(<button className="primary-btn">Add to cart</button>);
      break;
    default:
      break;
  }

  return (
    <div className="ProductDetail">
      <div className="ProductDetail__left">
        <div className={`Product__imgContainer ${mode !== PRODUCT_COMPONENT_MODES.VIEW_MODE ? 'edit' : ''}`}>
          {!productForm.image.imageUrl &&
            <p className="desc">No image selected</p>
          }
          <img className="Product__img" src={productForm.image.imageUrl} alt="" />
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
        </div >

        {mode !== PRODUCT_COMPONENT_MODES.VIEW_MODE &&
          <p className="info">
            All fields are mandatory. Blank spaces will be removed from the starting and ending of the inputs
          </p>
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


export default ProductDetail;
