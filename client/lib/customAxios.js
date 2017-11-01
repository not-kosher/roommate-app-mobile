import Axios from 'axios';
import {
  SERVER_URL,
} from 'react-native-dotenv';


const axios = Axios.create({
  baseURL: SERVER_URL,
  timeout: 5000,
});

export default axios;


