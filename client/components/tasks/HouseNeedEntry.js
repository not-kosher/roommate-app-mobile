import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  Divider,
  Button,
  Avatar,
} from 'react-native-elements';

import * as color from '../../styles/common';

const numbersToMonths = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dev',
};

const styles = StyleSheet.create({
  needEntryContainer: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  needEntryContent: {
    flex: 1,
    flexDirection: 'row',
  },
  needInfoColumn: {
    flex: 2,
    flexDirection: 'column',
    paddingLeft: 12,
    paddingRight: 12,
  },
  userName: {
    fontWeight: 'bold',
    color: color.TEXT_D_GRAY,
  },
  userAction: {
    flex: 1,
    flexDirection: 'row',
  },
  userActionText: {
    color: color.TEXT_L_GRAY,
  },
  needButtonColumn: {
    flex: 1.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  needTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  needText: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    color: color.TEXT_D_GRAY,
  },
  date: {
    fontSize: 12,
    marginTop: 3,
    color: color.TEXT_L_GRAY,
  },
  divider: {
    marginTop: 16,
    backgroundColor: color.DIV_GRAY,
  },
  button: {
    padding: 8,
    height: 35,
  },
});

class HouseNeedEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      need: {},
    };
  }
  componentWillMount() {
    this.setState({ need: this.props.houseNeed });
  }
  render() {
    return (
      <View style={styles.needEntryContainer}>
        <View style={styles.needEntryContent}>
          <View>
            {this.state.need.posterImage && !this.state.need.claimerId &&
              <Avatar
                rounded
                medium
                source={{ uri: this.state.need.posterImage }} 
              />
            }
            {this.state.need.claimerImage &&
              <Avatar
                rounded
                medium
                source={{ uri: this.state.need.claimerImage }} 
              />
            }
            {!this.state.need.posterImage && !this.state.need.claimerId &&
              <Avatar
                rounded
                medium
                title={this.state.need.poster.slice(0, 1)} 
              />
            }
            {!this.state.need.claimerImage && this.state.need.claimerId &&
              <Avatar
                rounded
                medium
                title={this.state.need.claimer.slice(0, 1)} 
              />
            }
          </View>
          <View style={styles.needInfoColumn} >
            {!this.state.need.claimer &&
              <View style={styles.userAction}>
                <Text style={styles.userName}>{this.state.need.poster}</Text>
                <Text style={styles.userActionText}> posted</Text>
              </View>
            }
            {this.state.need.claimer &&
              <View style={styles.userAction}>
                <Text style={styles.userName}>{this.state.need.claimer}</Text>
                <Text style={styles.userActionText}> claimed</Text>
              </View>
            }
            <Text style={styles.date}>{`${numbersToMonths[this.state.need.updatedAt.slice(5, 7)]} ${this.state.need.updatedAt.slice(8, 10)}`}</Text>
            <View style={styles.needTextContainer}>
              <Text style={styles.needText}>{this.state.need.text}</Text>
            </View>
          </View>
          <View style={styles.needButtonColumn} >
            {!this.state.need.claimerId &&
              <Button
                title="CLAIM"
                color={color.WHITE}
                backgroundColor={color.PRIMARY}
                fontSize={18}
                buttonStyle={styles.button}
                onPress={() => {
                  this.props.claimNeed(this.state.need.id);
                  this.setState({ need: { ...this.state.need, ...{ claimer: this.props.firstName, claimerId: this.props.userId, claimerImage: this.props.userImage } } });
                }}
              />
            }
            {this.state.need.claimerId === this.props.userId &&
              <Button
                title="DONE"
                color={color.WHITE}
                fontSize={18}
                buttonStyle={styles.button}
                onPress={() => {
                  this.props.completeNeed(this.state.need.id);
                }}
              />
            }
          </View>
        </View>
        <Divider style={styles.divider} />
      </View>
    );
  };
};

export default HouseNeedEntry;
