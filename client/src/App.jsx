import React, { useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from './context/AppContext';
import { socket } from './services/socket/socket';
import Login from './components/login/Login';
import Home from './scenes/Home';
import { Switch, useLocation } from 'react-router';
import PrivateRoute from './router/PrivateRoute';
import PublicRoute from './router/PublicRoute';

function App() {
	const {
		loginData,
		products,
		setProducts,
		messages,
		setMessages,
		loggedData,
	} = useContext(AppContext);
	const isAuth = loginData.data.logged || loggedData.data.logged;
	console.log(isAuth);

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

	// const location = useLocation();

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
					<PublicRoute path='/login' component={Login} isAuth={isAuth} />
					<PrivateRoute exact path='/' component={Home} isAuth={isAuth} />
				</Switch>
		</motion.div>
	);
}

export default App;
