import axios from '../../lib/customAxios';

export const createHouse = (name) => {
  return (dispatch) => {
    axios.post('/api/houses', { name })
      .then(({ data }) => {
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

export const getRoomies = (houseId) => {
  return (dispatch) => {
    axios.get(`/api/roomies/${houseId}`)
      .then(({ data }) => {
        dispatch({
          type: 'UPDATE_HOUSE',
          payload: { roomies: data },
        });
      })
      .catch(err => console.log('Error retrieving roomies', err));
  };
};

export const resetHouse = () => {
  return { type: 'RESET_HOUSE' };
};
