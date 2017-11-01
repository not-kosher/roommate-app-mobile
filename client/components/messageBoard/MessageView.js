import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { P_DARK } from '../../styles/common';

const MessageView = (props) => {
  const isOtherUser = !(props.currentMessage.user.name === props.user.name);

  return (
    <View style={styles.messageContainer}>
      {isOtherUser &&
        <View style={styles.avatarContainer}>
          {props.renderAvatar(props)}
        </View>
      }

      <View style={styles.bubbleContainer}>
        {isOtherUser && 
          <Text style={styles.nameText}>
            {props.currentMessage.user.name}
          </Text>
        }
        {props.renderBubble(props)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: '#00000000',
    marginBottom: 10,
    flexDirection: 'row',
  },
  avatarContainer: {
    flex: 1,
    marginTop: 15,
    marginLeft: 5,
  },
  bubbleContainer: {
    flex: 8,
    marginRight: 5,
  },
  nameText: {
    marginBottom: 4,
    marginLeft: 3,
    color: P_DARK,
  },
});

export default MessageView;
