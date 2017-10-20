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
  }
};

export const joinHouse = (key) => {

};
