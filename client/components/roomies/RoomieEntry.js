import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { Avatar, Card } from 'react-native-elements';

import * as color from '../../styles/common';
import { formatPhoneNumber } from '../../lib/utils';

const styles = {
  container: {
    flex: 1,
    margin: 5,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    flex: 1,
  },
  infoView: {
    flex: 3,
    padding: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: color.TEXT_D_GRAY,
  },
  infoRow: {
    flex: 1,
    flexDirection: 'row',
  },
  infoCol1: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingRight: 10,
  },
  infoCol2: {
    flex: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  category: {
    color: color.TEXT_L_GRAY,
  },
  info: {
    color: color.TEXT_D_GRAY,
  },
};

const RoomieEntry = ({ roomie }) => {
  return (
    <Card
      containerStyle={styles.container}
      wrapperStyle={styles.wrapper}
    >
      <View style={styles.avatar}>
        {roomie.imageUrl ?
          <Avatar
            large
            rounded
            source={{ uri: roomie.imageUrl }}
          />
          :
          <Avatar
            large
            rounded
            title={`${roomie.firstName[0]}${roomie.lastName[0]}`}
          />
        }
      </View>
      <View style={styles.infoView}>
        <Text style={styles.name}>{`${roomie.firstName} ${roomie.lastName}`}</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoCol1}>
            <Text style={styles.category}>Email</Text>
          </View>
          <View style={styles.infoCol2}>
            <Text style={styles.info}>{roomie.username}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoCol1}>
            <Text style={styles.category}>Phone</Text>
          </View>
          <View style={styles.infoCol2}>
            <Text style={styles.info}>{formatPhoneNumber(roomie.phone)}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default RoomieEntry;
