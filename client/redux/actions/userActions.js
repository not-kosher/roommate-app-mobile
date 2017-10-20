import axios from '../../lib/customAxios';

export const retrieveUser = (username) => {
  return (dispatch) => {
    axios.get(`/api/users/${username}`)
      .then(({ data }) => {
        console.log('Successfully retrieved user data', data);
        dispatch({
          type: 'UPDATE_USER',
          payload: data,
        });
      })
      .catch((err) => {
        console.log('Error retrieving user', err);
      });
  };
};

export const updateUser = (userProps) => {
  return (dispatch, getStore) => {
    const { user } = getStore();
    axios.put(`/api/users/${user.id}/updateProfile`, userProps)
      .then(() => {
        console.log('Successfully updated user');
        dispatch({
          type: 'UPDATE_USER',
          payload: userProps,
        });
      })
      .catch((err) => {
        console.log('Error updating user', err);
      });
  };
};

export const joinHouse = (key) => {
  return (dispatch, getStore) => {
    const { user } = getStore();
    axios.put(`/api/users/${user.id}/joinHouse`, { key })
      .then(({ data }) => {
        console.log('Successfully joined house');
        // update house info
        dispatch({
          type: 'UPDATE_HOUSE',
          payload: data,
        });
        // add house id to user
        dispatch({
          type: 'UPDATE_USER',
          payload: { houseId: key },
        });
      })
      .catch((err) => {
        console.log('Error joining house', err);
      });
  };
};

export const resetUser = () => {
  return {
    type: 'RESET_USER',
  };
};
