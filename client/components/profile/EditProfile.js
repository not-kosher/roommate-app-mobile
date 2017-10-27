import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';

import { updateUser } from '../../redux/actions/userActions';

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
      isSaving: false,
    };

    this.saveProfile = this.saveProfile.bind(this);
  }

  saveProfile() {
    this.setState({ isSaving: true });

    this.props.updateUser(this.state.user, () => {
      this.setState({ isSaving: false });
    });
    console.log('Updated user', this.props);
  }

  render() {
    if (!this.state.isSaving) {
      return (
        <View>
          <Text>Edit Profile</Text>
          <Image source={{ uri: this.state.imageUrl }} style={{ height: 50, width: 50 }} />
          <TextInput
            placeholder="Image URL"
            value={this.state.user.imageUrl}
            onChangeText={imageUrl => this.setState({ user: { ...this.state.user, imageUrl } })}
          />
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
