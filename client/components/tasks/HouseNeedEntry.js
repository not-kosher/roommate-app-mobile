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
  needEntryContainer: {
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 5,
    marginRight: 5,
  },
  needEntryContent: {
    flex: 1,
    flexDirection: 'row',
  },
  needInfoColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  needButtonColumn: {
    flex: 1,
    flexDirection: 'column',
  },
});

const HouseNeedEntry = ({ houseNeed, claimNeed, completeNeed, firstName, userId }) => {
  return (
    <Card containerStyle={styles.needEntryContainer}>
      <View style={styles.needEntryContent}>
        <View style={styles.needInfoColumn} >
          <Text>{houseNeed.text}</Text>
          <Text>Posted: {houseNeed.poster}</Text>
          {houseNeed.claimer &&
            <View>
              <Text>Claimed: {houseNeed.claimer}</Text>
            </View>
          }
        </View>
        <View style={styles.needButtonColumn} >
          {!houseNeed.claimerId &&
            <Button
              title="CLAIM"
              onPress={() => {
                claimNeed(houseNeed.id);
                houseNeed.claimer = firstName;
              }}
            />
          }
          {houseNeed.claimerId === userId &&
            <Button
              title="DONE"
              onPress={() => {
                completeNeed(houseNeed.id);
              }}
            />
          }
        </View>
      </View>
    </Card>
  );
};

export default HouseNeedEntry;
