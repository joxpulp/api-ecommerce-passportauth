import io from 'socket.io-client';

export const socket = io('https://apipassredux.herokuapp.com', {
	transports: ['websocket'],
});
