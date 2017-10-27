import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
} from 'react-native-elements';

const styles = {
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  positiveBalance: {
    flex: 1,
    flexDirection: 'column',
    color: 'green',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  negativeBalance: {
    flex: 1,
    flexDirection: 'column',
    color: 'red',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  roomieName: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 2,
    flexDirection: 'column',
  },
  positiveCharge: {
    flex: 1,
    flexDirection: 'column',
    color: 'green',
  },
  negativeCharge: {
    flex: 1,
    flexDirection: 'column',
    color: 'red',
  },
};

const ChargeEntry = ({ charge, deleteCharge }) => {
  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.roomieName}>{charge[0].firstName}</Text>
        {charge[1] > 0 &&
          <Text style={styles.negativeBalance}>-{charge[1].toFixed(2)}</Text>
        }
        {charge[1] < 0 &&
          <Text style={styles.positiveBalance}>+{charge[1].toFixed(2) * -1}</Text>
        }
        {charge[1] === 0 &&
          <Text>{charge[1].toFixed(2)}</Text>
        }
      </View>
      {charge[2].map((roomieOwsUsercharge) => {
        return (
          <View style={styles.header} key={roomieOwsUsercharge.id}>
            <Text style={styles.positiveCharge}>{roomieOwsUsercharge.billText}</Text>
            <Text style={styles.positiveCharge}>{roomieOwsUsercharge.total}</Text>
            <TouchableOpacity onPress={() => deleteCharge(roomieOwsUsercharge.id)}>
              <Text>PAID!</Text>
            </TouchableOpacity>
          </View>
        );
      })}
      {charge[3].map((userOwesRoomieCharge) => {
        return (
          <View style={styles.header} key={userOwesRoomieCharge.id}>
            <Text style={styles.negativeCharge}>{userOwesRoomieCharge.billText}</Text>
            <Text style={styles.negativeCharge}>{userOwesRoomieCharge.total}</Text>
            <TouchableOpacity onPress={() => deleteCharge(userOwesRoomieCharge.id)}>
              <Text>PAID!</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </Card>
  );
};

export default ChargeEntry;
