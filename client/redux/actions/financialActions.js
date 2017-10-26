import axios from '../../lib/customAxios';

export const getAllBills = (id) => {
  return (dispatch) => {
    axios.get(`api/bills/${id}`)
      .then(({ data }) => {
        dispatch({
          type: 'UPDATE_BILLS',
          payload: { bills: data },
        });
      })
      .catch((err) => {
        console.log('Error retrieving bills', err);
      });
  };
};

export const createBill = (houseId, billText, total, posterId, dueDate, recurringBillId, cb) => {
  return (dispatch) => {
    axios.post('/api/bills', {
      houseId: houseId,
      text: billText,
      total: total,
      posterId: posterId,
      dueDate: dueDate,
      recurringbillId: recurringBillId,
    })
      .then((bill) => {
        cb(bill.data[0].id);
        dispatch({
          type: 'ADD_BILL',
          payload: [bill.data[0]],
        });
      })
      .catch(err => console.log(err));
  };
};

export const deleteBill = (id) => {
  return (dispatch) => {
    axios.delete(`api/bills/${id}`)
      .then(({ data }) => {
        dispatch({
          type: 'DELETE_BILL',
          payload: data,
        });
      })
      .catch((err) => {
        console.log('Error deleting bills', err);
      });
  };
};

export const getAllCharges = (id, roomies, userId, cb) => {
  return (dispatch) => {
    axios.get(`api/charges/${id}`)
      .then(({ data }) => {
        dispatch({
          type: 'UPDATE_CHARGES',
          payload: { charges: data },
        });
        return data;
      })
      .then((data) => {
        const formattedCharges = [];
        roomies.forEach((roomie) => {
          const collectedCharges = [roomie];
          const chargesWhereRoomieOwesUser = [];
          const chargesWhereUserOwesRoomie = [];
          data.forEach((charge) => {
            console.log(userId);
            if (charge.lenderId === userId && charge.debtorId === roomie.id) {
              chargesWhereRoomieOwesUser.push(charge);
            } else if (charge.lenderId === roomie.id && charge.debtorId === userId) {
              chargesWhereUserOwesRoomie.push(charge);
            }
          });
          collectedCharges.push(findTotal(chargesWhereRoomieOwesUser, chargesWhereUserOwesRoomie));
          collectedCharges.push(chargesWhereRoomieOwesUser);
          collectedCharges.push(chargesWhereUserOwesRoomie);
          formattedCharges.push(collectedCharges);
        });
        dispatch({
          type: 'UPDATE_FORMATTED_CHARGES',
          payload: formattedCharges,
        });
      })
      .catch(err => console.log('Error fetching charges', err));
  };
};

const findTotal = (roomieOwesArr, userOwesArr) => {
  let roomieOwesTotal = 0;
  let userOwesTotal = 0;
  roomieOwesArr.forEach((charge) => {
    roomieOwesTotal += charge.total;
  });
  userOwesArr.forEach((charge) => {
    userOwesTotal += charge.total;
  });
  return userOwesTotal - roomieOwesTotal;
};

export const createCharge = (houseId, billText, total, lenderId, debtorId, billId, cb) => {
  return (dispatch) => {
    axios.post('/api/charges', {
      houseId: houseId,
      billText: billText,
      total: +total,
      lenderId: lenderId,
      debtorId: debtorId,
      billId: billId,
    })
      .then((charge) => {
        dispatch({
          type: 'ADD_CHARGE',
          payload: [charge.data[0]],
        });
        return charge.data[0];
      })
      .then(() => cb())
      .catch(err => console.log('Error adding charges', err));
  };
};

export const deleteAllChargesForBill = (billId, cb) => {
  return (dispatch) => {
    axios.delete(`/api/charges/${billId}`)
      .then((deletedBillId) => {
        console.log(deleteBill.data)
        cb(deletedBillId.data);
        dispatch({
          type: 'DELETE_ALL_CHARGES_FOR_BILL',
          payload: deletedBillId.data,
        });
      })
      .catch(err => console.log('Error deleting charges', err));
  };
};

