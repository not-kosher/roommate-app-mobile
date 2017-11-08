import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import * as color from '../../styles/common';
import RoomieList from './RoomieList';

const styles = {
  container: {
    flex: 1,
    backgroundColor: color.BG_L_GRAY,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
};

const Roomies = (props) => {
  return (
    <View style={styles.container}>
      <RoomieList roomies={props.roomies} />
      <View style={styles.buttonContainer}>
        <Button
          title="Add Roomie"
          backgroundColor={color.PRIMARY}
          onPress={() => props.navigation.navigate('AddRoomie')}
        />
      </View>
    </View>
  );
};


const mapStateToProps = (store) => {
  return {
    roomies: store.house.roomies,
  };
};

export default connect(mapStateToProps)(Roomies);
