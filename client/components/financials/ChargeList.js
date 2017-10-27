import React from 'react';
import {
  ScrollView,
} from 'react-native';

import ChargeEntry from './ChargeEntry';

const ChargeList = ({ charges, deleteCharge }) => {
  return (
    <ScrollView >
      {charges.map((charge, key) => {
        return <ChargeEntry charge={charge} key={key} deleteCharge={deleteCharge} />;
      })}
    </ScrollView>
  );
};

export default ChargeList;
