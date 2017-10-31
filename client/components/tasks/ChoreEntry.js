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

const ChoreEntry = ({ chore, claimChore, firstName, completeChore }) => {
  return (
    <View>
      <Text>{chore.text}</Text>
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
        <Text>{chore.claimer}</Text>
      }
      {chore.claimerId &&
        <View>
          <Text>Claimed:{chore.poster}</Text>
          <Button 
            title="DONE"
            onPress={() => {
              completeChore(chore.id);
            }}
          />
        </View>
      }
    </View>
  );
}

export default ChoreEntry;
