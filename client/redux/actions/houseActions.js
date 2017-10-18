const updateHouseId = (houseId) => {
  return {
    type: 'UPDATE_HOUSE_ID',
    houseId,
  };
};

exports.default(updateHouseId);
