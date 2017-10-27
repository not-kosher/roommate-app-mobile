import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImagePickerIOS,
  Alert,
} from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';

import defaultPic from '../../images/default_profile.jpg';
import { updateUser } from '../../redux/actions/userActions';
import uploadPicture from '../../lib/storageHelper';

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
    if (this.state.user.firstName && this.state.user.lastName) {
      this.setState({ isLoading: true });
      this.props.updateUser(this.state.user, () => {
        this.setState({ isLoading: false });
        if (this.props.navigation) {
          this.props.navigation.goBack();
        }
      });
    } else {
      Alert.alert('Hold up!', 'Please enter at least your first and last name.');
    }
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <View>
          <Text>Edit Profile</Text>
          <TouchableOpacity onPress={this.uploadPicture}>
            <Image
              source={this.state.user.imageUrl ? { uri: this.state.user.imageUrl } : defaultPic}
              style={{ height: 150, width: 150 }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="First Name"
            value={this.state.user.firstName}
            onChangeText={firstName => this.setState({ user: { ...this.state.user, firstName } })}
          />
          <TextInput
            placeholder="Last Name"
            value={this.state.user.lastName}
            onChangeText={lastName => this.setState({ user: { ...this.state.user, lastName } })}
          />
          <TextInput
            placeholder="Phone Number"
            value={this.state.user.phone}
            onChangeText={phone => this.setState({ user: { ...this.state.user, phone } })}
          />
          <TouchableOpacity onPress={this.saveProfile} >
            <View>
              <Text>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    return <MaterialIndicator />;
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
