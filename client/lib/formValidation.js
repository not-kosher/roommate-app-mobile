import { Alert } from 'react-native';

// check if valid form info
// password regex:
// full: ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d).{8,}$
// at least 8 chars: .{8,}
// at least one lower case: (?=.*?[a-z]).+
// at least one upper case: (?=.*?[A-Z]).+
// at least one number: (?=.*?\d).+

const checkLength = (password) => {
  const regex = /.{8,}/;
  if (regex.test(password)) {
    return;
  }
  return 'Must have at least 8 characters';
};

const checkLowerCase = (password) => {
  const regex = /(?=.*?[a-z]).+/;
  if (regex.test(password)) {
    return;
  }
  return 'Must have at least one lower case letter';
};

const checkUpperCase = (password) => {
  const regex = /(?=.*?[A-Z]).+/;
  if (regex.test(password)) {
    return;
  }
  return 'Must have at least one upper case letter';
};

const checkNumber = (password) => {
  const regex = /(?=.*?\d).+/;
  if (regex.test(password)) {
    return;
  }
  return 'Must have at least one number';
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

  if (errors.length) {
    return errors;
  }
};

const isValidEmail = (email) => {
  // very simple validation for string@string.string
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export default {
  getPasswordErrors, isValidEmail,
};
