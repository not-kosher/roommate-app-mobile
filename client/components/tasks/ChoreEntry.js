import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  Divider,
  Button,
  Avatar,
} from 'react-native-elements';

const numbersToMonths = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dev',
}

const styles = StyleSheet.create({
  choreEntryContainer: {
    paddingTop: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
  },
  choreEntryContent: {
    flex: 1,
    flexDirection: 'row',
  },
  choreInfoColumn: {
    flex: 2,
    flexDirection: 'column',
    paddingLeft: 8,
    paddingRight: 8,
  },
  userName: {
    fontWeight: 'bold',
  },
  userAction: {
    flex: 1,
    flexDirection: 'row',
  },
  choreButtonColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  choreText: {
    fontSize: 16,
  },
  divider: {
    marginTop: 16,
  },
  button: {
    margin: 0,
    padding: 0,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
  },
});

const ChoreEntry = ({ chore, claimChore, firstName, completeChore, userId }) => {
  return (
    <View style={styles.choreEntryContainer}>
      <View style={styles.choreEntryContent}>
        <View>
          {chore.posterImage && !chore.claimerId &&
            <Avatar
              rounded
              medium
              source={{ uri: chore.posterImage }} 
            />
          }
          {chore.claimerImage &&
            <Avatar
              rounded
              medium
              source={{ uri: chore.claimerImage }} 
            />
          }
          {!chore.posterImage && !chore.claimerId &&
            <Avatar
              rounded
              medium
              title={chore.poster.slice(0, 1)} 
            />
          }
          {!chore.claimerImage && chore.claimerId &&
            <Avatar
              rounded
              medium
              title={chore.claimer.slice(0, 1)} 
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
          
          <Text>{`${numbersToMonths[chore.updatedAt.slice(5, 7)]} ${chore.updatedAt.slice(8, 10)}`}</Text>

          {!chore.claimerId &&
            <Button
              title="CLAIM"
              backgroundColor="white"
              containerViewStyle={styles.button}
              onPress={() => {
                claimChore(chore.id);
                chore.claimer = firstName;
              }}
            />
          }
          {chore.claimerId === userId &&
            <Button
              title="DONE"
              containerViewStyle={styles.button}
              backgroundColor="white"
              onPress={() => {
                completeChore(chore.id);
              }}
            />
          }
        </View>
      </View>
      <Divider style={styles.divider} />
    </View>
  );
};

export default ChoreEntry;
