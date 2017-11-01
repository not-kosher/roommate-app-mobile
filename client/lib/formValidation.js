const passwordErrors = {
  length: 'Must have at least 8 characters',
  lowerCase: 'Must have at least one lower case letter',
  upperCase: 'Must have at least one upper case letter',
  number: 'Must have at least one number',
};

const checkLength = (password) => {
  const regex = /.{8,}/;
  if (regex.test(password)) {
    return;
  }
  return passwordErrors.length;
};

const checkLowerCase = (password) => {
  const regex = /(?=.*?[a-z]).+/;
  if (regex.test(password)) {
    return;
  }
  return passwordErrors.lowerCase;
};

const checkUpperCase = (password) => {
  const regex = /(?=.*?[A-Z]).+/;
  if (regex.test(password)) {
    return;
  }
  return passwordErrors.upperCase;
};

const checkNumber = (password) => {
  const regex = /(?=.*?\d).+/;
  if (regex.test(password)) {
    return;
  }
  return passwordErrors.number;
};

const getPasswordErrors = (password) => {
  const errors = [];
  const passwordError = checkLength(password);
  if (passwordError) errors.push(passwordError);
  const lowerCaseError = checkLowerCase(password);
  if (lowerCaseError) errors.push(lowerCaseError);
  const upperCaseError = checkUpperCase(password);
  if (upperCaseError) errors.push(upperCaseError);
  const numberError = checkNumber(password);
  if (numberError) errors.push(numberError);

  return errors;
};

const isValidEmail = (email) => {
  // very simple validation for string@string.string
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const isValidPhone = (phone) => {
  const regex = /[\d]{10,}/;
  return regex.test(phone);
};

const parseError = (error) => {
  // converts the error to a readable error message
  const e = error.toString();
  if (/UsernameExistsException/.test(e)) {
    return 'An account with that email already exists.';
  } else if (/UserNotFoundException/.test(e) || /NotAuthorizedException/.test(e)) {
    return 'Please enter the correct email and password for your account.';
  }
  return 'There was an error with your request, please try again.';
};

export default {
  passwordErrors, getPasswordErrors, isValidEmail, parseError, isValidPhone,
};
