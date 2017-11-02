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
};

const styles = StyleSheet.create({
  needEntryContainer: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  needEntryContent: {
    flex: 1,
    flexDirection: 'row',
  },
  needInfoColumn: {
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
  needButtonColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  needTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  needText: {
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
    borderStyle: 'solid',
    borderWidth: 1,
  },
});

const HouseNeedEntry = ({ houseNeed, claimNeed, completeNeed, firstName, userId }) => {
  return (
    <View style={styles.needEntryContainer}>
      <View style={styles.needEntryContent}>
        <View>
          {houseNeed.posterImage && !houseNeed.claimerId &&
            <Avatar
              rounded
              medium
              source={{ uri: houseNeed.posterImage }} 
            />
          }
          {houseNeed.claimerImage &&
            <Avatar
              rounded
              medium
              source={{ uri: houseNeed.claimerImage }} 
            />
          }
          {!houseNeed.posterImage && !houseNeed.claimerId &&
            <Avatar
              rounded
              medium
              title={houseNeed.poster.slice(0, 1)} 
            />
          }
          {!houseNeed.claimerImage && houseNeed.claimerId &&
            <Avatar
              rounded
              medium
              title={houseNeed.claimer.slice(0, 1)} 
            />
          }
        </View>
        <View style={styles.needInfoColumn} >
          {!houseNeed.claimer &&
            <View style={styles.userAction}>
              <Text style={styles.userName}>{houseNeed.poster}</Text>
              <Text> posted</Text>
            </View>
          }
          {houseNeed.claimer &&
            <View style={styles.userAction}>
              <Text style={styles.userName}>{houseNeed.claimer}</Text>
              <Text> claimed</Text>
            </View>
          }
          <Text style={styles.date}>{`${numbersToMonths[houseNeed.updatedAt.slice(5, 7)]} ${houseNeed.updatedAt.slice(8, 10)}`}</Text>
          <View style={styles.needTextContainer}>
            <Text style={styles.needText}>{houseNeed.text}</Text>
          </View>
        </View>
        <View style={styles.needButtonColumn} >
          {!houseNeed.claimerId &&
            <Button
              backgroundColor="white"
              title="CLAIM"
              color="black"
              fontSize={14}
              buttonStyle={styles.button}
              onPress={() => {
                claimNeed(houseNeed.id);
                houseNeed.claimer = firstName;
              }}
            />
          }
          {houseNeed.claimerId === userId &&
            <Button
              backgroundColor="white"
              title="DONE"
              color="black"
              fontSize={14}
              buttonStyle={styles.button}
              onPress={() => {
                completeNeed(houseNeed.id);
              }}
            />
          }
        </View>
      </View>
      <Divider style={styles.divider} />
    </View>
  );
};

export default HouseNeedEntry;
