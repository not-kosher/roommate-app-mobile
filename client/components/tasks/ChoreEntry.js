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

const ChoreEntry = ({ chore }) => {
  return (
    <View>
      <Text>{chore.text}</Text>
      <Text>Posted:{chore.poster}</Text>
      {!chore.claimerId &&
        <Button small title="CLAIM" />
      }
      {chore.claimerId &&
        <View>
          <Text>Claimed:{chore.poster}</Text>
          <Button small title="DONE" />
        </View>
      }
    </View>
  );
}

export default ChoreEntry;
