import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TEXT_M_GRAY } from '../../styles/common';

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: '#00000000',
    marginBottom: 8,
    marginRight: 5,
    marginLeft: 5,
    flexDirection: 'row',
  },
  avatarContainer: {
    flex: 1,
    marginTop: 7,
    marginLeft: 5,
  },
  bubbleContainer: {
    flex: 8,
    marginLeft: 9,
  },
  nameText: {
    marginBottom: 4,
    marginLeft: 3,
    color: TEXT_M_GRAY,
    fontSize: 12,
    fontWeight: '600',
  },
});

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

export default MessageView;
