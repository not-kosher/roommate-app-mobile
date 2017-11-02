import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  Card,
  Button,
  Avatar,
} from 'react-native-elements';

const styles = StyleSheet.create({
  choreEntryContainer: {
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 5,
    marginRight: 5,
  },
  choreEntryContent: {
    flex: 1,
    flexDirection: 'row',
  },
  choreInfoColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  userName: {
    fontWeight: 'bold'
  },
  userAction: {
    flex: 1,
    flexDirection: 'row',
  },
  choreButtonColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  choreText: {
    fontSize: 16,
  },
});

const ChoreEntry = ({ chore, claimChore, firstName, completeChore, userId }) => {
  return (
    <View style={styles.choreEntryContainer}>
      <View style={styles.choreEntryContent}>
        <View>
          {chore.image &&
            <Avatar
              rounded
              source={{ uri: chore.image }} 
            />
          }
          {!chore.image &&
            <Avatar
              rounded
              title={firstName.splice(0, 1)} 
            />
          }
        </View>
        <View style={styles.choreInfoColumn}>
          {!chore.claimer &&
            <View style={styles.userAction}>
              <Text style={styles.userName}>{chore.poster}</Text>
              <Text> posted</Text>
            </View>
          }
          {chore.claimer &&
            <View style={styles.userAction}>
              <Text style={styles.userName}>{chore.claimer}</Text>
              <Text> claimed</Text>
            </View>
          }

          <Text style={styles.choreText}>{chore.text}</Text>
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
    </View>
  );
};

export default ChoreEntry;
