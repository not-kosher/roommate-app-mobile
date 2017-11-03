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
  const firstInitial = user.name.split(' ')[0][0];
  const lastInitial = user.name.split(' ')[1][0];
  
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
          title={`${firstInitial}${lastInitial}`}
        />
      }
    </View>
  );
};

export default CustomAvatar;
