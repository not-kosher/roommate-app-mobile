import axios from '../../lib/customAxios';

export const getHouse = (id, cb = () => {}) => {
  return (dispatch) => {
    axios.get(`/api/houses/${id}`)
      .then(({ data }) => {
        dispatch({
          type: 'UPDATE_HOUSE',
          payload: data,
        });
        
        cb();
      })
      .catch((err) => {
        console.log('Error retrieving house', err);
      });
  };
};

export const createHouse = (name, cb) => {
  return (dispatch) => {
    axios.post('/api/houses', { name })
      .then(({ data }) => {
        cb(data.id);
        // update house info
        dispatch({
          type: 'UPDATE_HOUSE',
          payload: data,
        });
        // update house id on user
        dispatch({
          type: 'UPDATE_USER',
          payload: { houseId: data.id },
        });
      })
      .catch((err) => {
        console.log('Error creating the house', err);
      });
  };
};

export const getRoomies = (houseId, cb = () => {}) => {
  return (dispatch) => {
    axios.get(`/api/roomies/${houseId}`)
      .then(({ data }) => {
        dispatch({
          type: 'UPDATE_HOUSE',
          payload: { roomies: data },
        });

        cb();
      })
      .catch(err => console.log('Error retrieving roomies', err));
  };
};

export const updateSocketReady = isReady => (
  (dispatch) => {
    console.log('in the update socket ready action');
    dispatch({
      type: 'UPDATE_HOUSE',
      payload: { readyToJoinSocket: isReady },
    });
  }
);

export const resetHouse = () => {
  return { type: 'RESET_HOUSE' };
};
