import {
  AWS_S3_BUCKET,
} from 'react-native-dotenv';
import uuid from 'react-native-uuid';
import RNFB from 'react-native-fetch-blob';

import AWS from './awsConfig';

const uploadPicture = (imageUri, cb) => {
  RNFB.fs.readStream(imageUri, 'base64')
    .then((stream) => {
      let data = '';
      stream.open();
      stream.onData((chunk) => {
        data += chunk;
      });
      stream.onEnd(() => {
        const userId = AWS.config.credentials.data.IdentityId;
        const params = {
          Bucket: AWS_S3_BUCKET,
          Key: `${userId}/${uuid.v1()}.jpeg`,
          ContentType: 'image/jpeg',
          // ContentEncoding: 'base64',
          Body: data,
          ACL: 'public-read',
        };
        const client = new AWS.S3();
        client.upload(params, (err, result) => {
          console.log('We finished uploading', result);
          cb(result);
        });
      });
    })
    .catch(err => console.log('Error reading image file', err));
};

export default uploadPicture;

// RNFB.fs.readFile(imageUri, 'base64')
// .then((data) => {
//   const userId = AWS.config.credentials.data.IdentityId;
//   const params = {
//     Bucket: AWS_S3_BUCKET,
//     Key: `${userId}/${uuid.v1()}.jpeg`,
//     ContentType: 'image/jpeg',
//     // ContentEncoding: 'base64',
//     Body: data,
//     ACL: 'public-read',
//   };
//   const client = new AWS.S3();
//   client.upload(params, (err, result) => {
//     console.log('We finished uploading', result);
//     cb(result);
//   });
// })
// .catch(err => console.log('Error reading image file', err));
