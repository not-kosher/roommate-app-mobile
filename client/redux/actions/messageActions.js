import axios from '../../lib/customAxios';

export const getMessages = (houseId, roomies) => (
  (dispatch) => {
    axios.get(`api/messages/${houseId}`)
      .then((messages) => {
        // convert messages to gifted chat format
        const giftedMessages = messages.data.map((message) => {
          let user;
          roomies.forEach((roomie) => {
            if (roomie.id === message.userId) {
              user = {
                _id: roomie.id,
                name: roomie.firstName,
                avatar: roomie.imageUrl,
              };
            }
          });

          return {
            _id: message.giftedId,
            text: message.text,
            createdAt: message.createdAt,
            user,
          };
        });

        dispatch({
          type: 'MESSAGES_RECEIVED',
          payload: giftedMessages,
        });
      })
      .catch(err => console.log(`FAILED to get messages: ${err}`));
  }
);

export const addMessage = messages => (
  (dispatch) => {
    dispatch({
      type: 'ADD_MESSAGE',
      payload: messages,
    });
  }
);
