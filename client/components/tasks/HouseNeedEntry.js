import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Avatar,
  Button,
} from 'react-native-elements';

const HouseNeedEntry = ({ houseNeed, claimNeed, completeNeed, firstName }) => {
  return (
    <View>
      <Text>{houseNeed.text}</Text>
      <Text>Posted: {houseNeed.poster}</Text>
      {houseNeed.claimer &&
        <Text>Claimed: {houseNeed.claimer}</Text>
      }
      {!houseNeed.claimerId &&
        <Button
          title="CLAIM"
          onPress={() => {
            claimNeed(houseNeed.id);
            houseNeed.claimer = firstName;
          }}
        />
      }
    </View>
  );
}

export default HouseNeedEntry;