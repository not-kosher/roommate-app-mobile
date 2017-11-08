import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';


import HouseNeedEntry from './HouseNeedEntry';

const styles = StyleSheet.create({
  needListContainer: {
    flex: 1,
  },
});

const HouseNeedList = ({ houseNeeds, claimNeed, completeNeed, firstName, userId, userImage}) => {
  return (
    <ScrollView style={styles.needListContainer}>
      {
        houseNeeds.map((houseNeed) => {
          return (
            <HouseNeedEntry
              houseNeed={houseNeed}
              key={houseNeed.id}
              claimNeed={claimNeed}
              completeNeed={completeNeed}
              firstName={firstName}
              userId={userId}
              userImage={userImage}
            />
          );
        })
      }
    </ScrollView>
  );
};

export default HouseNeedList;
