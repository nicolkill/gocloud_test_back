const errors = require('./errors');

const ValidationTypes = {
  Exist: 'exist',
  String: 'string',
  Phone: 'phone',
  Email: 'email',
  Name: 'name',
  Nut: 'nut',
};

const validationFunctions = {
  [ValidationTypes.Exist]: {
    fn: (value) => !!value,
    message: 'not exists',
  },
  [ValidationTypes.String]: {
    fn: (value) => !value || typeof value === 'string',
    message: 'is not string',
  },
  [ValidationTypes.Phone]: {
    fn: (value) => !value || (value.length >= 10 && value.substring(value.length - 10).match(/^\d{10}$/)),
    message: 'is not phone',
  },
  [ValidationTypes.Email]: {
    fn: (value) => !value || value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    message: 'is not email',
  },
  [ValidationTypes.Name]: {
    fn: (value) => !value || value.match(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/),
    message: 'is not a name',
  },
  [ValidationTypes.Nut]: {
    fn: (value) => !value || value.match(/^[0-9.\-]+$/),
    message: 'is not a nut format',
  },
};

const validate = (params, options) => {
  const err = [];

  Object.keys(options).forEach(field => {
    const reportedErrors = options[field].map(validateName => {
      let fn;

      if (typeof validateName === 'function') {
        fn = validateName;
      } else {
        const validateFn = validationFunctions[validateName];

        if (!validateFn) {
          throw new Error(`Validation ${validateName} is not found`);
        }
        fn = validateFn.fn;
      }

      const isValid = fn(params[field]);

      return (isValid ? null : validateFn.message);
    }).filter(error => !!error);

    if (reportedErrors.length > 0) {
      err.push({
        [field]: reportedErrors,
      });
    }
  });

  if (err.length > 0) {
    throw new errors.UnprocessableEntity(err);
  }
};

module.exports = {
  validate,
  ValidationTypes,
};
