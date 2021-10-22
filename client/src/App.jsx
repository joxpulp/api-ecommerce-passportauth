import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './components/login/Login';
import Home from './scenes/Home';
import { Switch, useLocation } from 'react-router-dom';
import Signup from './components/signup/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedThunk } from './actions/authActions';
import PrivateRoute from './router/PrivateRoute';
import PublicRoute from './router/PublicRoute';

function App() {
	const dispatch = useDispatch();
	const { logged } = useSelector((state) => state.auth);

	const location = useLocation();

	useEffect(() => {
		dispatch(isLoggedThunk());
	}, [dispatch]);

	return (
		<motion.div
			style={{ height: '100%' }}
			className='container d-flex flex-column
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
			<AnimatePresence exitBeforeEnter initial={false}>
				<Switch location={location} key={location.pathname}>
					<PublicRoute isAuth={logged} path='/login' component={Login} />
					<PublicRoute isAuth={logged} path='/signup' component={Signup} />
					<PrivateRoute exact isAuth={logged} path='/' component={Home} />
				</Switch>
			</AnimatePresence>
		</motion.div>
	);
}

export default App;
