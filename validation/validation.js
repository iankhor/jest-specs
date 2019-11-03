const validatorsReducer = (...fns) => x => fns.reduce((y, f) => f(y), x);

const validator = (test, errorKey) => {
  return ({ value, errors = [] }) => {
    const isValid = test(value);

    const valid = { value, errors: [...errors] };
    const invalid = { value, errors: [...errors, errorKey] };

    return isValid ? valid : invalid;
  };
};

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isEmail = v => EMAIL_REGEX.test(String(v).toLowerCase());
const validateEmail = validator(isEmail, 'invalid_email');

const isRightLength = v => v.length > 4;
const validateLength = validator(isRightLength, 'too_short');

const validate = validatorsReducer(validateEmail, validateLength);

export default validate;
