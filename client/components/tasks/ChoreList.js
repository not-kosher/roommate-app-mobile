import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Avatar,
} from 'react-native-elements';

import ChoreEntry from './ChoreEntry'

const ChoreList = ({ chores }) => {
  return (
    <View>
      <Text>ChoreList</Text>
      {
        chores.map((chore) => {
          return <ChoreEntry chore={chore} key={chore.id} />;
        })
      }
    </View>
  );
}

export default ChoreList;