import socketIOClient from 'socket.io-client';
import { SERVER_URL } from 'react-native-dotenv';

const socket = socketIOClient(SERVER_URL);

export default socket;

