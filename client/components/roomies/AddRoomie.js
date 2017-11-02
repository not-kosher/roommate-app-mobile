import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  MAILCHIMP_BASEURL,
  MAILCHIMP_LISTURL,
  MAILCHIMP_AUTH,
} from 'react-native-dotenv';

const mailChimpAxios = axios.create({
  baseURL: MAILCHIMP_BASEURL,
  timeout: 5000,
});

class AddRoomie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailInput: '',
    };

    this.sendEmail = this.sendEmail.bind(this);
    this.clearText = this.clearText.bind(this);
  }

  sendEmail() {
    mailChimpAxios({
      method: 'POST',
      url: MAILCHIMP_LISTURL,
      data: {
        members: [
          {
            email_address: this.state.emailInput,
            merge_fields: {
              FNAME: 'LILLIAN IS BOSS',
            },
            status: 'subscribed',
          },
        ],
      },
      headers: {
        Authorization: MAILCHIMP_AUTH,
      },
    })
      .then(() => {
        this.clearText();
        Alert.alert('Success', 'You have succesfully added a roomie!');
      })
      .catch(err => Alert.alert('Error', 'Roommate could not be added. Make sure you have entered a valid email adress.'));
  }

  clearText() {
    this.setState({ emailInput: '' });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Email adress"
          autoCapitalize="none"
          onChangeText={emailInput => this.setState({ emailInput })}
          value={this.state.emailInput}
        />
        <TouchableOpacity
          onPress={() => this.sendEmail()}
        >
          <Text>Invite Roomie</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

const mapStateToProps = (store) => {
  return {
    username: store.user.username,
  };
};

export default connect(mapStateToProps, null)(AddRoomie);
