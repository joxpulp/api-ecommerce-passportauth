import React, { useState, createContext, useEffect } from 'react';
import { socket } from '../services/socket/socket';

export const AppContext = createContext();

function AppProvider({ children }) {
	const [products, setProducts] = useState([]);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.on('products', (data) => {
			setProducts(data);
		});
		return () => {
			socket.off('products');
		};
	}, [products, setProducts]);

	useEffect(() => {
		socket.on('messages', (data) => {
			setMessages(data);
		});
		return () => {
			socket.off('messages');
		};
	}, [messages, setMessages]);

	return (
		<AppContext.Provider
			value={{
				products,
				setProducts,
				messages,
				setMessages,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export default AppProvider;
