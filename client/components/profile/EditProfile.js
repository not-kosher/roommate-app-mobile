import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImagePickerIOS,
} from 'react-native';

import defaultPic from '../../images/default_profile.jpg';
import { updateUser } from '../../redux/actions/userActions';
import uploadPicture from '../../lib/storageHelper';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: this.props.imageUrl,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      phone: this.props.phone,
    };

    this.saveProfile = this.saveProfile.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
  }

  uploadPicture() {
    // when clicking on your profile to upload a new pic
    // calls iphone photo picker api
    // return imageuri passed to storage uploader
    // the s3 url returned from uploader set to state's imageUrl
    ImagePickerIOS.openSelectDialog(null, (uri) => {
      uploadPicture(uri, (data) => {
        this.setState({ imageUrl: data.location });
      });
    }, err => console.log('Error retrieving photo from camera roll', err));
  }

  saveProfile() {
    this.props.updateUser(this.state);
    console.log('Updated user', this.props);
  }

  render() {
    return (
      <View>
        <Text>Edit Profile</Text>
        <TouchableOpacity onPress={this.uploadPicture}>
          <Image
            source={this.state.imageUrl ? { uri: this.state.imageUrl } : defaultPic}
            style={{ height: 150, width: 150 }}
          />
        </TouchableOpacity>
        {/* <TextInput
          placeholder="Image URL"
          value={this.state.imageUrl}
          onChangeText={imageUrl => this.setState({ imageUrl })}
        /> */}
        <TextInput
          placeholder="First Name"
          value={this.state.firstName}
          onChangeText={firstName => this.setState({ firstName })}
        />
        <TextInput
          placeholder="Last Name"
          value={this.state.lastName}
          onChangeText={lastName => this.setState({ lastName })}
        />
        <TextInput
          placeholder="Phone Number"
          value={this.state.phone}
          onChangeText={phone => this.setState({ phone })}
        />
        <TouchableOpacity onPress={this.saveProfile} >
          <View>
            <Text>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
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
    updateUser: (user) => {
      dispatch(updateUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
