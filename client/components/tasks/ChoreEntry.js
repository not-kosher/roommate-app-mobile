import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  Card,
  Button,
} from 'react-native-elements';

const styles = StyleSheet.create({
  choreEntryContainer: {
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 5,
    marginRight: 5,
  },
  choreInfoColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  choreButtonColumn: {
    flex: 1,
    flexDirection: 'column',
  },
});

const ChoreEntry = ({ chore, claimChore, firstName, completeChore, userId }) => {
  return (
    <Card containerStyle={styles.choreEntryContainer}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.choreInfoColumn}>
          <Text>{chore.text}</Text>
          <Text>{firstName}</Text>
          <Text>Posted:{chore.poster}</Text>
          {chore.claimer &&
            <View>
              <Text>Claimed:{chore.claimer}</Text>
            </View>
          }
        </View>
        <View style={styles.choreButtonColumn}>
          {!chore.claimerId &&
            <Button
              title="CLAIM"
              onPress={() => {
                claimChore(chore.id);
                chore.claimer = firstName;
              }}
            />
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
      </View>
    </Card>
  );
};

export default ChoreEntry;
