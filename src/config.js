const ORDER_STATUS = {
  STATUS_NEW: "New",
  STATUS_PROCESSING: "Processing",
  STATUS_SHIPPED: "Shipped",
  STATUS_DELIVERED: "Delivered"
};

const PAYMENT_STATUS = {
  STATUS_NOT_PAID: "Not paid",
  STATUS_PAID: "Paid"
};

const PAYMENT_METHOD = {
  METHOD_COD: "Cash on delivery",
  METHOD_ONLINE_PAYMENT: "Online payment"
};

const USER_TYPES = {
  TYPE_ADMIN: "TYPE_ADMIN",
  TYPE_REGULAR: "TYPE_REGULAR"
};

const LOGIN_CONFIG = {
  email: {
    label: "Email",
    validation: {
      minLength: 1,
      required: true
    },
    props: {
      type: "email",
      autoComplete: "off"
    }
  },
  password: {
    label: "Password",
    validation: {
      minLength: 1,
      required: true
    },
    props: {
      type: "password",
      autoComplete: "off"
    }
  }
};

const SIGNUP_CONFIG = {
  sFirstName: {
    label: 'First Name',
    validation: {
      minLength: 3,
      maxLength: 32,
      required: true
    },
    props: {
      type: "text",
      autoComplete: "off"
    }
  },
  sLastName: {
    label: 'Last Name',
    validation: {
      minLength: 3,
      maxLength: 32,
      required: true
    },
    props: {
      type: "text",
      autoComplete: "off"
    }
  },
  sEmail: {
    label: 'Email',
    validation: {
      required: true
    },
    props: {
      type: "email",
      autoComplete: "off"
    }
  },
  sPassword: {
    label: 'Password',
    validation: {
      required: true,
      minLength: 5
    },
    props: {
      type: "password",
      autoComplete: "off"
    }
  },
  sConfirmPassword: {
    label: 'Confirm Password',
    validation: {
      required: true,
    },
    props: {
      type: "password",
      autoComplete: "off"
    }
  }
};

const PRODUCT_VALIDATION = {
  name: {
    minLength: 5,
    maxLength: 32,
    required: true
  },
  description: {
    required: true,
    maxLength: 2000,
    minLength: 10
  },
  price: {
    required: true,
    positiveNumber: true
  }
}

const IMAGE_CONFIG = {
  SUPPORTED_FORMATS: ["image/png", "image/jpeg"],
  SUPPORTED_FORMATS_TEXT: [".png", ".jpeg", ".jpg"],
  MAX_SIZE: 2 * 1024 * 1024,
  MAX_SIZE_TEXT: "2MB"
}

const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return isValid;
  }
  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }
  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.trim().length <= rules.maxLength && isValid;
  }
  if (rules.positiveNumber) {
    let tempVal = Number(value);
    isValid = Number.isInteger(tempVal) && tempVal > 0 && isValid;
  }
  return isValid;
}

const PRODUCT_COMPONENT_MODES = {
  VIEW_MODE: "VIEW_MODE",
  CREATE_MODE: "CREATE_MODE",
  EDIT_MODE: "EDIT_MODE"
};

export {
  ORDER_STATUS, PAYMENT_STATUS, PAYMENT_METHOD, USER_TYPES, IMAGE_CONFIG,
  SIGNUP_CONFIG, LOGIN_CONFIG, PRODUCT_VALIDATION, PRODUCT_COMPONENT_MODES,
  checkValidity
};