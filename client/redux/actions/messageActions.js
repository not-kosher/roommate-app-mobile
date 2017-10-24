import axios from '../../lib/customAxios';

export const getMessages = houseId => (
  (dispatch) => {
    axios.get(`api/messages/${houseId}`)
      .then((messages) => {
        dispatch({
          type: 'MESSAGES_RECEIVED',
          payload: messages,
        });
      })
      .catch(err => console.log(`FAILED to get messages: ${err}`));
  }
);

export const addMessage = message => (
  (dispatch) => {
    dispatch({
      type: 'ADD_MESSAGE',
      payload: message,
    });
  }
);
