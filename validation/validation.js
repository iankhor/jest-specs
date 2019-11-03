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
const isEmail = v => isPresent(v) && EMAIL_REGEX.test(String(v).toLowerCase());
const email = validator(isEmail, 'invalid_email');

const isRightLength = v => isPresent(v) && v.length > 4;
const length = validator(isRightLength, 'too_short');

const isPresent = v => !!v;
const presence = validator(isPresent, 'blank');

const validate = validatorsReducer(email, length, presence);

export default validate;
