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
  return 'Must be at least 8 characters long';
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

const isValidPassword = (password) => {
  const errors = [];
  const passwordError = checkLength(password);
  if (passwordError) errors.push(passwordError);
  const lowerCaseError = checkLowerCase(password);
  if (lowerCaseError) errors.push(lowerCaseError);
  const upperCaseError = checkUpperCase(password);
  if (upperCaseError) errors.push(upperCaseError);
  const numberError = checkNumber(password);
  if (numberError) errors.push(numberError);

  // if there are error messages, password is invalid, alert the issues
  if (errors.length) {
    const message = errors.join('\n');
    Alert.alert('Please fix the following with your password', message);
    return false;
  }
  return true;
};

export default isValidPassword;
