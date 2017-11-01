import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  Card,
  Avatar,
} from 'react-native-elements';

import HouseNeedEntry from './HouseNeedEntry';

const HouseNeedList = ({ houseNeeds, claimNeed, completeNeed, firstName, userId}) => {
  return (
    <View>
      <Text>HouseNeedList</Text>
      {
        houseNeeds.map((houseNeed) => {
          return (
            <HouseNeedEntry
              houseNeed={houseNeed}
              key={houseNeed.id}
              claimNeed={claimNeed}
              completeNeed={completeNeed}
              firstName={firstName}
              userId={userId}
            />
          );
        })
      }
    </View>
  );
};

export default HouseNeedList;
