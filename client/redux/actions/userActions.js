import axios from '../../lib/customAxios';

export const retrieveUser = (username, cb) => {
  cb = cb || (a => a);
  return (dispatch) => {
    axios.get(`/api/users/${username}`)
      .then(({ data }) => {
        cb(data.houseId);
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
        // update house info
        dispatch({
          type: 'UPDATE_HOUSE',
          payload: data,
        });
        return axios.get(`/api/roomies/${key}`);
      })
      .then(({ data }) => {
        dispatch({
          type: 'UPDATE_HOUSE',
          payload: { roomies: data },
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
