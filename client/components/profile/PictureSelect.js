import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ImagePickerIOS,
} from 'react-native';

class PictureSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
  }

  componentWillMount() {
    // load the pictures from camera roll and set state
  }

  selectImage() {
    // set the selected image
  }

  uploadImage() {
    // upload the selected image to s3
    // update db with url
    // update user imageurl with new url
    // go back to edit profile page once all done
  }

  render() {
    return (
      <View>
        <ScrollView>
        </ScrollView>
        <TouchableOpacity>
          <View>
            <Text>Upload</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default PictureSelect;
