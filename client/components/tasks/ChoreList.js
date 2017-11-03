import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import ChoreEntry from './ChoreEntry';

const styles = StyleSheet.create({
  choreListContainer: {
    flex: 1,
  },
});

const ChoreList = ({ chores, claimChore, firstName, completeChore, userId, userImage }) => {
  return (
    <ScrollView style={styles.choreListContainer}>
      {
        chores.map((chore) => {
          return (
            <ChoreEntry
              chore={chore}
              key={chore.id}
              claimChore={claimChore}
              firstName={firstName}
              completeChore={completeChore}
              userId={userId}
              userImage={userImage}
            />
          );
        })
      }
    </ScrollView>
  );
};

export default ChoreList;
