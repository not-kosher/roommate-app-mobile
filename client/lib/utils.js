export const formatPhoneNumber = (phone) => {
  let formatted = '';

  if (phone) {
    phone.split('').forEach((num, i) => {
      if (!i) {
        formatted += `(${num}`;
      } else if (i === 3) {
        formatted += `) ${num}`;
      } else if (i === 6) {
        formatted += `-${num}`;
      } else {
        formatted += num;
      }
    });
  }

  return formatted;
};

export const getPlainPhone = (formatted) => {
  const re = /[()-\s]/;
  let plain = '';

  if (formatted) {
    formatted.split('').forEach((num) => {
      if (!re.test(num)) {
        plain += num;
      }
    });
  }

  return plain;
};
