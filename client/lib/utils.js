export const formatPhoneNumber = (phone) => {
  let formatted = '';

  phone.split('').forEach((num, i) => {
    if (!i) {
      formatted += `(${num}`;
    } else if (i === 2) {
      formatted += `${num}) `;
    } else if (i === 5) {
      formatted += `${num}-`;
    } else {
      formatted += num;
    }
  });

  return formatted;
};

export const getPlainPhone = (formatted) => {
  const re = /[()-\s]/;
  let plain = '';

  formatted.split('').forEach((num) => {
    if (!re.test(num)) {
      plain += num;
    }
  });

  return plain;
};
