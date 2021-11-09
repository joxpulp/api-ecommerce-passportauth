import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const {
		setUserLogin,
		setFetchLogin,
		logoutMessage,
		setLogoutMessage,
		fetchLogin,
		loginData,
		loadingLogin,
	} = useContext(AppContext);
	const history = useHistory();

	const login = (e) => {
		e.preventDefault();
		setUserLogin({ username, password });
		setFetchLogin(true);
		history.push('/');
	};

	useEffect(() => {
		setFetchLogin(false);
	}, [fetchLogin]);

	useEffect(() => {
		setTimeout(() => {
			setLogoutMessage(false);
		}, 2000);
	}, [logoutMessage]);

	return (
		<motion.form id='form' onSubmit={login}>
			{logoutMessage ? (
				<motion.div
					initial={{ opacity: 0, y: '-100%' }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: '-100%' }}
					className='container alert alert-info text-center'
					role='alert'
				>
					Hasta luego {username}
				</motion.div>
			) : (
				<>
					{loginData.data.error && !loadingLogin && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0, y: '-100%' }}
							className='container alert alert-danger text-center'
							role='alert'
						>
							{loginData.data.error}
						</motion.div>
					)}
					<h2 className='text-center mb-4 text-light'>Login de usuario</h2>
					<div className='d-flex justify-content-center'>
						<a
							className='btn btn-primary'
							href='http://localhost:8080/api/auth/facebook-login'
						>
							Ingresar con FB
						</a>
					</div>
				</>
			)}
		</motion.form>
	);
}

export default Login;
