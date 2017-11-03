import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  Divider,
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import axios from '../../lib/customAxios';
import HouseNavBack from '../HouseNavBack';
import * as color from '../../styles/common';

import HouseNeedList from './HouseNeedList';


const styles = StyleSheet.create({
  needsContainer: {
    flex: 1,
    backgroundColor: color.WHITE,
  },
  needsListContainer: {
    flex: 6,
  },
  divider: {
    backgroundColor: color.DIV_GRAY,
    height: 0.5,
  },
  addNeedContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitFormColumnButton: {
    flex: 1,
    flexDirection: 'column',
  },
  submitFormColumnInput: {
    flex: 2.5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    margin: 8,
    flex: 1,
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.PRIMARY,

  },
  submitText: {
    color: 'white',
    fontSize: 16,
  },
});

class HouseNeedsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      houseNeeds: [],
      text: '',
    };

    this.getNeeds = this.getNeeds.bind(this);
    this.postNeed = this.postNeed.bind(this);
    this.claimNeed = this.claimNeed.bind(this);
    this.completeNeed = this.completeNeed.bind(this);
  }
  componentWillMount() {
    this.getNeeds();
  }
  getNeeds() {
    axios.get(`/api/tasks/${this.props.houseId}`)
      .then((tasks) => {
        const onlyHouseNeeds = tasks.data.filter(need => need.type === 'houseneed');
        onlyHouseNeeds.forEach((need) => {
          this.props.roomies.forEach((roomie) => {
            if (roomie.id === need.posterId) {
              need.poster = roomie.firstName;
              need.posterImage = roomie.imageUrl
            }
            if (roomie.id === need.claimerId) {
              need.claimer = roomie.firstName;
              need.claimerImage = roomie.imageUrl
            }
          });
        });
        this.setState({ houseNeeds: onlyHouseNeeds });
      })
      .catch((err) => {
        console.log('Error retrieving tasks', err);
      });
  }
  postNeed() {
    axios.post('api/tasks/', {
      houseId: this.props.houseId,
      posterId: this.props.userId,
      text: this.state.text,
      type: 'houseneed',
    })
      .then((need) => {
        const newNeed = need.data[0];
        newNeed.poster = this.props.firstName;
        this.state.houseNeeds.push(newNeed);
        this.setState({
          addingneed: !this.state.addingneed,
          houseNeeds: this.state.houseNeeds,
        });
      })
      .catch(err => console.log('Error posting task', err));
  }
  claimNeed(taskId) {
    axios.put(`api/tasks/${taskId}`, {
      claimerId: this.props.userId,
    })
      .then((task) => {
        this.state.houseNeeds.forEach((need) => {
          if (need.id === task.id) {
            need.claimer = this.props.firstName;
            need.claimerId = this.props.userId;
          }
        });
        this.setState({ houseNeeds: this.state.houseNeeds });
      })
      .catch(err => console.log('Error claiming task', err));
  }
  completeNeed(taskId) {
    axios.delete(`api/tasks/${taskId}`)
      .then(() => {
        this.setState({ houseNeeds: this.state.houseNeeds.filter(need => need.id !== taskId) })
      })
      .catch(err => console.log('Error deleting task', err));
  }
  render() {
    return (
      <View style={styles.needsContainer}>
        <View style={styles.needsListContainer}>
          <HouseNeedList
            houseNeeds={this.state.houseNeeds}
            claimNeed={this.claimNeed}
            firstName={this.props.firstName}
            userId={this.props.userId}
            completeNeed={this.completeNeed}
          />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.addNeedContainer}>
          <View style={styles.submitFormColumnInput}>
            <TextInput
              ref={component => this._needInput = component}
              placeholder="Add House Need"
              style={styles.input}
              onChangeText={task => this.setState({ text: task })}
            />
          </View>
          <View style={styles.submitFormColumnButton}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                this.postNeed();
                this._needInput.setNativeProps({text: ''});
              }}
            >
              <Text style={styles.submitText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    username: store.user.username,
    firstName: store.user.firstName,
    roomies: store.house.roomies,
    houseId: store.user.houseId,
    userId: store.user.id,
  };
};

const HouseNeedsViewRedux = connect(mapStateToProps, null)(HouseNeedsView);


const HouseNeeds = StackNavigator({
  HouseNeeds: {
    screen: HouseNeedsViewRedux,
    navigationOptions: ({ navigation }) => ({
      title: 'HouseNeeds',
      headerLeft: <HouseNavBack navigation={navigation} />,
    }),
  },
});

export default HouseNeeds;
