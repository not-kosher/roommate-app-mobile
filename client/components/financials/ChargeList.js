import React from 'react';
import {
  ScrollView,
} from 'react-native';

import ChargeEntry from './ChargeEntry';

const ChargeList = ({ charges }) => {
  return (
    <ScrollView>
      {charges.map((charge, key) => {
        return <ChargeEntry charge={charge} key={key} />;
      })}
    </ScrollView>
  );
};

export default ChargeList;
