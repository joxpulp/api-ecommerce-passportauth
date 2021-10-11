import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from './context/AppContext';
import { socket } from './services/socket/socket';
import Login from './components/login/Login';
import Home from './scenes/Home';
import { Redirect, Switch, Route } from 'react-router-dom';
import Signup from './components/signup/Signup';

function App() {
	const {
		loginData,
		products,
		setProducts,
		messages,
		setMessages,
		loggedData,
		setFetchIsLogged,
	} = useContext(AppContext);
	const isAuth = loginData.data.logged || loggedData.data.logged;

	useEffect(() => {
		setFetchIsLogged(true);
	}, []);

	useEffect(() => {
		socket.on('products', (data) => {
			setProducts(data);
		});
		return () => {
			socket.off('products');
		};
	}, [products]);

	useEffect(() => {
		socket.on('messages', (data) => {
			setMessages(data);
		});
		return () => {
			socket.off('messages');
		};
	}, [messages]);

	return (
		<motion.div
			style={{ height: '100%' }}
			className='d-flex flex-column
			justify-content-center align-items-center'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<motion.h1
				initial={{ opacity: 0, y: '-100%' }}
				animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
				className='text-center my-4 text-light'
			>
				Bienvenido a la API de Productos
			</motion.h1>
			<hr style={{ backgroundColor: 'white', width: '80%' }} />
			<Switch>
				<Route exact path='/login'>
					{!isAuth ? <Login /> : <Redirect to='/' />}
				</Route>
				<Route path='/signup'>
					{!isAuth ? <Signup /> : <Redirect to='/' />}
				</Route>
				<Route exact path='/'>
					{isAuth ? <Home /> : <Redirect to='/login' />}
				</Route>
			</Switch>
		</motion.div>
	);
}

export default App;
