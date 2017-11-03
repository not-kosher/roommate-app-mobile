import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

const CustomAvatar = (props) => {
  const { user } = props.currentMessage;
  return (
    <View style={styles.avatarContainer}>
      {user.avatar ?
        <Avatar
          medium
          rounded
          source={{ uri: user.avatar }}
        />
        :
        <Avatar
          medium
          rounded
          title={user.name[0]}
        />
      }
    </View>
  );
};

export default CustomAvatar;
