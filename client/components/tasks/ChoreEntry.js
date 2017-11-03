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
  choreEntryContainer: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
  },
  choreEntryContent: {
    flex: 1,
    flexDirection: 'row',
  },
  choreInfoColumn: {
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
  choreButtonColumn: {
    flex: 1.5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  choreTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  choreText: {
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

class ChoreEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chore: {},
    };
  }
  componentWillMount() {
    this.setState({ chore: this.props.chore });
  }
  render() {
    return (
      <View style={styles.choreEntryContainer}>

        <View style={styles.choreEntryContent}>
          <View>
            {this.state.chore.posterImage && !this.state.chore.claimerId &&
              <Avatar
                rounded
                medium
                source={{ uri: this.state.chore.posterImage }} 
              />
            }
            {this.state.chore.claimerImage &&
              <Avatar
                rounded
                medium
                source={{ uri: this.state.chore.claimerImage }} 
              />
            }
            {!this.state.chore.posterImage && !this.state.chore.claimerId &&
              <Avatar
                rounded
                medium
                title={this.state.chore.poster.slice(0, 1)} 
              />
            }
            {!this.state.chore.claimerImage && this.state.chore.claimerId &&
              <Avatar
                rounded
                medium
                title={this.state.chore.claimer.slice(0, 1)} 
              />
            }
          </View>
          <View style={styles.choreInfoColumn}>
            {!this.state.chore.claimer &&
              <View style={styles.userAction}>
                <Text style={styles.userName}>{this.state.chore.poster}</Text>
                <Text style={styles.userActionText}> posted</Text>
              </View>
            }
            {this.state.chore.claimer &&
              <View style={styles.userAction}>
                <Text style={styles.userName}>{this.state.chore.claimer}</Text>
                <Text style={styles.userActionText}> claimed</Text>
              </View>
            }
            <Text style={styles.date}>{`${numbersToMonths[this.state.chore.updatedAt.slice(5, 7)]} ${this.state.chore.updatedAt.slice(8, 10)}`}</Text>
            <View style={styles.choreTextContainer}>
              <Text style={styles.choreText}>{this.state.chore.text}</Text>
            </View>
          </View>
          <View style={styles.choreButtonColumn}>
            {!this.state.chore.claimerId && !this.state.chore.claimer &&
              <Button
                title="CLAIM"
                color={color.WHITE}
                backgroundColor={color.PRIMARY}
                fontSize={18}
                buttonStyle={styles.button}
                onPress={() => {
                  this.setState({ chore: { ...this.state.chore, ...{ claimer: this.props.firstName, claimerId: this.props.userId, claimerImage: this.props.userImage} } });
                  this.props.claimChore(this.state.chore.id);
                }}
              />
            }
            {this.state.chore.claimerId === this.props.userId &&
              <Button
                title="DONE"
                fontSize={18}
                color={color.WHITE}
                buttonStyle={styles.button}
                onPress={() => {
                  this.props.completeChore(this.state.chore.id);
                }}
              />
            }
          </View>
        </View>
        <Divider style={styles.divider} />
      </View>
    );
  }
}


export default ChoreEntry;
