import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  ImagePickerIOS,
  Alert,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  Avatar,
} from 'react-native-elements';

import { updateUser } from '../../redux/actions/userActions';
import * as color from '../../styles/common';
import uploadPicture from '../../lib/storageHelper';
import { formatPhoneNumber, getPlainPhone } from '../../lib/utils';
import form from '../../lib/formValidation';
import TintedLoading from '../loading/TintedLoading';

const styles = {
  editContainer: {
    flex: 1,
    backgroundColor: color.BG_L_GRAY,
  },
  avatar: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  form: {
    flex: 3,
    justifyContent: 'center',
  },
  label: {
    color: color.TEXT_L_GRAY,
  },
  input: {
    color: color.TEXT_M_GRAY,
  },
  buttons: {
    flex: 1,
    justifyContent: 'center',
  },
};

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        imageUrl: this.props.imageUrl,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        phone: this.props.phone,
      },
      isLoading: false,
    };

    this.saveProfile = this.saveProfile.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
  }

  uploadPicture() {
    ImagePickerIOS.openSelectDialog(null, (uri) => {
      this.setState({ isLoading: true });
      uploadPicture(uri, (result) => {
        this.setState({
          user: { ...this.state.user, imageUrl: result.Location },
          isLoading: false,
        });
      });
    }, err => console.log('Error retrieving photo from camera roll', err));
  }

  saveProfile() {
    const validPhone = !(this.state.user.phone && !form.isValidPhone(this.state.user.phone));
    if (this.state.user.firstName && this.state.user.lastName && validPhone) {
      this.setState({ isLoading: true });
      const userInfo = this.state.user;
      // make sure not to update db with empty string as phone number
      if (userInfo.phone === '') userInfo.phone = null;
      this.props.updateUser(userInfo, () => {
        if (this.props.navigation) {
          this.setState({ isLoading: false });
          this.props.navigation.goBack();
        }
      });
    } else if (!validPhone) {
      Alert.alert('Wrong Info', 'Please make sure your phone number is valid.');
    } else {
      Alert.alert('Missing Info', 'Please enter at least your first and last name.');
    }
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <View style={styles.editContainer}>
          <View style={styles.avatar}>
            {this.state.user.imageUrl ?
              <Avatar
                xlarge
                rounded
                source={{ uri: this.state.user.imageUrl }}
                onPress={this.uploadPicture}
              />
              :
              <Avatar
                xlarge
                rounded
                icon={{ name: 'add-a-photo' }}
                onPress={this.uploadPicture}
              />
            }
          </View>
          <View style={styles.form}>
            <FormLabel labelStyle={styles.label}>First Name</FormLabel>
            <FormInput
              placeholder="Enter your first name"
              value={this.state.user.firstName}
              inputStyle={styles.input}
              autoCorrect={false}
              onChangeText={firstName => this.setState({ user: { ...this.state.user, firstName } })}
            />
            <FormValidationMessage>
              {this.state.user.firstName ? ' ' : 'This field is required'}
            </FormValidationMessage>
            <FormLabel labelStyle={styles.label}>Last Name</FormLabel>
            <FormInput
              placeholder="Enter your last name"
              value={this.state.user.lastName}
              inputStyle={styles.input}
              autoCorrect={false}
              onChangeText={lastName => this.setState({ user: { ...this.state.user, lastName } })}
            />
            <FormValidationMessage>
              {this.state.user.lastName ? ' ' : 'This field is required'}
            </FormValidationMessage>
            <FormLabel labelStyle={styles.label}>Phone Number</FormLabel>
            <FormInput
              placeholder="Enter your phone number"
              value={formatPhoneNumber(this.state.user.phone)}
              inputStyle={styles.input}
              autoCorrect={false}
              maxLength={14}
              onChangeText={phone => this.setState({ user: { ...this.state.user, phone: getPlainPhone(phone) } })}
            />
          </View>
          <View style={styles.buttons}>
            <Button
              large
              title="Save"
              onPress={this.saveProfile}
              backgroundColor={color.PRIMARY}
            />
          </View>
        </View>
      );
    }

    return <TintedLoading />;
  }
}

const mapStateToProps = (store) => {
  return {
    username: store.user.username,
    imageUrl: store.user.imageUrl,
    firstName: store.user.firstName,
    lastName: store.user.lastName,
    phone: store.user.phone,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user, cb) => {
      dispatch(updateUser(user, cb));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
