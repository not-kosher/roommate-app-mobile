import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import ChargeEntry from './ChargeEntry'

const ChargeList = ({ charges }) => {
  return (
    <View>
      {charges.map((charge) => {
        return <ChargeEntry charge={charge} key={charge.id} />
      })}
    </View>
  );
};

export default ChargeList;
