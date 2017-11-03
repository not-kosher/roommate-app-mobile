import React from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
} from 'react-native';

import ChargeEntry from './ChargeEntry';

const ChargeList = ({ charges, deleteCharge, username }) => {
  return (
    <ScrollView >
      {charges.map((charge, key) => {
        if (charge[0].username !== username) {
          return <ChargeEntry charge={charge} key={key} deleteCharge={deleteCharge} />;
        }
        return null;
      })}
    </ScrollView>
  );
};

const mapStateToProps = (store) => {
  return {
    username: store.user.username,
  };
};

export default connect(mapStateToProps)(ChargeList);