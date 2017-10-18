export const updateUsername = (username) => {
  return {
    type: 'UPDATE_USERNAME',
    username,
  };
};

export const updateUserid = (userid) => {
  // update the user id
};

export const updateUser = (user) => {
  return {
    type: 'UPDATE_USER',
    user,
  };
};

export const resetUser = () => {
  // reset user to default values when logging out
};
