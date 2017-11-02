import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
};

const styles = StyleSheet.create({
  choreEntryContainer: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  choreEntryContent: {
    flex: 1,
    flexDirection: 'row',
  },
  choreInfoColumn: {
    flex: 2,
    flexDirection: 'column',
    paddingLeft: 12,
    paddingRight: 12,
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
    justifyContent: 'center',
  },
  choreTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  choreText: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  date: {
    fontSize: 10,
  },
  divider: {
    marginTop: 16,
  },
  button: {
    padding: 5,
    height: 25,
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
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
          <Text style={styles.date}>{`${numbersToMonths[chore.updatedAt.slice(5, 7)]} ${chore.updatedAt.slice(8, 10)}`}</Text>
          <View style={styles.choreTextContainer}>
            <Text style={styles.choreText}>{chore.text}</Text>
          </View>
        </View>
        <View style={styles.choreButtonColumn}>
          {!chore.claimerId &&
            <Button
              backgroundColor="white"
              title="CLAIM"
              color="black"
              fontSize={14}
              buttonStyle={styles.button}
              onPress={() => {
                claimChore(chore.id);
                chore.claimer = firstName;
              }}
            />
          }
          {chore.claimerId === userId &&
            <Button
              backgroundColor="white"
              title="DONE"
              color="black"
              fontSize={14}
              buttonStyle={styles.button}
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
