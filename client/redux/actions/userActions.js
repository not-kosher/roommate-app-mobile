import axios from '../../lib/customAxios';

export const retrieveUser = (username) => {
  return (dispatch) => {
    axios.get(`/api/users/${username}`)
      .then(({ data }) => {
        console.log('Successfully retrieved user data', data);
        dispatch({
          type: 'UPDATE_USER',
          user: data,
        });
      })
      .catch((err) => {
        console.log('Error retrieving user', err);
      });
  };
};

export const updateUser = (user) => {
  return {
    type: 'UPDATE_USER',
    user,
  };
};

export const resetUser = () => {
  return {
    type: 'RESET_USER',
  };
};
