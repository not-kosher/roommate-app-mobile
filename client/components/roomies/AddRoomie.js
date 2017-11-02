import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  View,
  Alert,
} from 'react-native';
import {
  FormInput,
  FormLabel,
  Button,
} from 'react-native-elements';
import {
  MAILCHIMP_BASEURL,
  MAILCHIMP_LISTURL,
  MAILCHIMP_AUTH,
} from 'react-native-dotenv';

import * as color from '../../styles/common';

const styles = {
  container: {
    flex: 1,
    backgroundColor: color.BG_L_GRAY,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
};

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
    const message = `You have been invited to join ${this.props.houseName} by ${this.props.firstName} ${this.props.lastName}!
    
    Download the Abodie app and sign up! When prompted, enter the following house key to join this house:
    ${this.props.key}
    
    Enjoy!`;
    mailChimpAxios({
      method: 'POST',
      url: MAILCHIMP_LISTURL,
      data: {
        members: [
          {
            email_address: this.state.emailInput,
            merge_fields: {
              FNAME: message,
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
      .catch(err => Alert.alert('Error', 'Roommate could not be added! Make sure you have entered a valid email adress.'));
  }

  clearText() {
    this.setState({ emailInput: '' });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <FormLabel>
            Email Address
          </FormLabel>
          <FormInput
            placeholder="Enter an email to send an invite"
            value={this.state.emailInput}
            autoCapitalize="none"
            onChangeText={emailInput => this.setState({ emailInput })}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Invite"
            onPress={() => this.sendEmail()}
            backgroundColor={color.PRIMARY}
          />
        </View>
      </View>

    );
  }
}

const mapStateToProps = (store) => {
  return {
    firstName: store.user.firstName,
    LastName: store.user.lastName,
    houseName: store.house.name,
    key: store.house.id,
  };
};

export default connect(mapStateToProps, null)(AddRoomie);
