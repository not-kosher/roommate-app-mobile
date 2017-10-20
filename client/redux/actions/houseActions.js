import axios from '../../lib/customAxios';

export const createHouse = (name) => {
  return (dispatch) => {
    axios.post('/api/houses', { name })
      .then(({ data }) => {
        dispatch({
          type: 'UPDATE_HOUSE',
          payload: data,
        });
      })
      .catch((err) => {
        console.log('Error creating the house', err);
      });
  }
};

export const joinHouse = (key) => {

};
