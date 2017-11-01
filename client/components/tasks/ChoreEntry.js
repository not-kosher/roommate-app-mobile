import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  Card,
  Button,
} from 'react-native-elements';

const ChoreEntry = ({ chore, claimChore, firstName, completeChore, userId }) => {
  return (
    <View>
      <Text>{chore.text}</Text>
      <Text>{firstName}</Text>
      <Text>Posted:{chore.poster}</Text>
      {!chore.claimerId &&
        <Button
          title="CLAIM"
          onPress={() => {
            claimChore(chore.id);
            chore.claimer = firstName;
          }}
        />
      }
      {chore.claimer &&
        <View>
          <Text>Claimed:{chore.claimer}</Text>
        </View>
      }
      {chore.claimerId === userId &&
        <Button
          title="DONE"
          onPress={() => {
            completeChore(chore.id);
          }}
        />
      }
    </View>
  );
};

export default ChoreEntry;
