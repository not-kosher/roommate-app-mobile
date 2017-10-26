import AWS from 'aws-sdk';
import {
  AWS_PROJECT_REGION,
} from 'react-native-dotenv';

AWS.config.region = AWS_PROJECT_REGION;

export default AWS;
