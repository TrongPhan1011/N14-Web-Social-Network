import { io } from 'socket.io-client';

const socket = io('https://n14-lcn-socket.herokuapp.com/');

export default socket;
