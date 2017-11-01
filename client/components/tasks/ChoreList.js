import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import ChoreEntry from './ChoreEntry';

const ChoreList = ({ chores, claimChore, firstName, completeChore }) => {
  return (
    <View>
      <Text>ChoreList</Text>
      {
        chores.map((chore) => {
          return (
            <ChoreEntry
              chore={chore}
              key={chore.id}
              claimChore={claimChore}
              firstName={firstName}
              completeChore={completeChore}
            />
          );
        })
      }
    </View>
  );
};

export default ChoreList;
