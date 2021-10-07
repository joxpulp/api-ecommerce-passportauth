import io from 'socket.io-client';

export const socket = io('https://ecommerceapicoder.herokuapp.com/', {
	transports: ['websocket'],
});
