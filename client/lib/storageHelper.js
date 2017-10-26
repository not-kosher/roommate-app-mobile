import {
  AWS_S3_BUCKET,
} from 'react-native-dotenv';
import uuid from 'react-native-uuid';
import RNFB from 'react-native-fetch-blob';

import AWS from './awsConfig';

const uploadPicture = (imageUri) => {
  const client = new AWS.S3();
};

export default uploadPicture;
