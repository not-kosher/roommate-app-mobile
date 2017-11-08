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
  Button,
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
    marginBottom: 15,
  },
  headerOwe: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  balanceContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    // justifyContent: 'center',
    // alignSelf: 'center',
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
    textAlign: 'right',
  },
  roomieName: {
    color: color.TEXT_D_GRAY,
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    marginLeft: 5,
    flexDirection: 'column',
  },
  chargeName: {
    color: color.TEXT_M_GRAY,
    flex: 1.5,
    flexDirection: 'column',
    margin: 2,
    fontSize: 16,
  },
  chargeValue: {
    color: color.TEXT_M_GRAY,
    flex: 1,
    flexDirection: 'column',
    margin: 2,
    fontSize: 16,
  },
  positive: {
    color: color.GREEN,
  },
  negative: {
    color: color.RED,
  },
  button: {
    height: 30,
    width: 75,
  },
  buttonContainer: {
    flex: 1,
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
      {charge[2].length > 0 &&
        <View>
          <Divider style={styles.divider} />
          <Text style={styles.chargeCategoryHeader}>They Owe:</Text>
        </View>
      }
      {charge[2].map((roomieOwsUsercharge) => {
        return (
          <View style={styles.header} key={roomieOwsUsercharge.id}>
            <Text style={styles.chargeName}>{roomieOwsUsercharge.billText}</Text>
            <Text style={{ ...styles.chargeValue, ...styles.positive }}>{roomieOwsUsercharge.total}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="PAID"
                onPress={() => deleteCharge(roomieOwsUsercharge.id)}
                backgroundColor={color.PRIMARY}
                buttonStyle={styles.button}
              />
            </View>
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
          <View style={styles.headerOwe} key={userOwesRoomieCharge.id}>
            <Text style={styles.chargeName}>{userOwesRoomieCharge.billText}</Text>
            <Text style={{ ...styles.chargeValue, ...styles.negative }}>{userOwesRoomieCharge.total}</Text>
            <View style={styles.buttonContainer}/>
          </View>
        );
      })}
    </Card>
  );
};

export default ChargeEntry;
