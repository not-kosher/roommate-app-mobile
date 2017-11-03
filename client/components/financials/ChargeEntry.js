import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Avatar,
  Divider,
} from 'react-native-elements';

import * as color from '../../styles/common';

const styles = {
  card: {
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 5,
    marginRight: 5,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
  },
  balanceContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  chargeCategoryHeader: {
    color: color.TEXT_L_GRAY,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 5,
  },
  divider: {
    marginTop: 8,
  },
  balance: {
    flex: 1,
    flexDirection: 'column',
    color: color.GREEN,
    fontSize: 22,
    fontWeight: 'bold',
  },
  roomieName: {
    color: color.TEXT_D_GRAY,
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    marginLeft: 5,
    flexDirection: 'column',
  },
  charge: {
    color: color.TEXT_M_GRAY,
    flex: 1,
    flexDirection: 'column',
    margin: 2,
  },
  positive: {
    color: color.GREEN,
  },
  negative: {
    color: color.RED,
  },
};

const ChargeEntry = ({ charge, deleteCharge }) => {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.header}>
        {charge[0].imageUrl &&
          <Avatar
            small
            rounded
            source={{ uri: charge[0].imageUrl }}
          />
        }
        {!charge[0].imageUrl &&
          <Avatar
            small
            rounded
            title={`${charge[0].firstName.slice(0, 1)}${charge[0].lastName.slice(0, 1)}`}
          />
        }
        <Text style={styles.roomieName}>{charge[0].firstName}</Text>
        <View style={styles.balanceContainer}>
          {charge[1] > 0 &&
            <Text style={{ ...styles.balance, ...styles.negative }}>-{charge[1].toFixed(2)}</Text>
          }
          {charge[1] < 0 &&
            <Text style={{ ...styles.balance, ...styles.positive }}>+{charge[1].toFixed(2) * -1}</Text>
          }
          {charge[1] === 0 &&
            <Text>{charge[1].toFixed(2)}</Text>
          }
        </View>
      </View>
      {charge[2].length > 0 &&
        <View>
          <Divider style={styles.divider} />
          <Text style={styles.chargeCategoryHeader}>They Owe:</Text>
        </View>
      }
      {charge[2].map((roomieOwsUsercharge) => {
        return (
          <View style={styles.header} key={roomieOwsUsercharge.id}>
            <Text style={styles.charge}>{roomieOwsUsercharge.billText}</Text>
            <Text style={{ ...styles.charge, ...styles.positive }}>{roomieOwsUsercharge.total}</Text>
            <TouchableOpacity onPress={() => deleteCharge(roomieOwsUsercharge.id)}>
              <Text>PAID!</Text>
            </TouchableOpacity>
          </View>
        );
      })}
      {charge[3].length > 0 &&
        <View>
          <Divider style={styles.divider} />
          <Text style={styles.chargeCategoryHeader}>You Owe:</Text>
        </View>
      }
      {charge[3].map((userOwesRoomieCharge) => {
        return (
          <View style={styles.header} key={userOwesRoomieCharge.id}>
            <Text style={styles.charge}>{userOwesRoomieCharge.billText}</Text>
            <Text style={{ ...styles.charge, ...styles.negative }}>{userOwesRoomieCharge.total}</Text>
          </View>
        );
      })}
    </Card>
  );
};

export default ChargeEntry;
