import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

function Login() {
	const {
		userName,
		setUserName,
		setFetchLogin,
		logoutMessage,
		setLogoutMessage,
	} = useContext(AppContext);
	const history = useHistory();

	const login = (e) => {
		e.preventDefault();
		setFetchLogin(true);
		history.push('/');
	};

	useEffect(() => {
		setTimeout(() => {
			setLogoutMessage(false);
		}, 2000);
	}, [logoutMessage]);

	return (
		<motion.form
			id='form'
			onSubmit={login}
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { delay: 0.2, duration: 0.2 },
			}}
		>
			{logoutMessage ? (
				<motion.div
					initial={{ opacity: 0, y: '-100%' }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: '-100%' }}
					className='container alert alert-info text-center'
					role='alert'
				>
					Hasta luego {userName}
				</motion.div>
			) : (
				<>
					<h2 className='text-center mb-4 text-light'>Login de usuario</h2>
					<div className='form-floating mb-3'>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							placeholder='name'
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
							required
						/>
						<label htmlFor='title'>Nombre</label>
					</div>
					<button className='btn btn-success' type='submit'>
						Ingresar
					</button>
				</>
			)}
		</motion.form>
	);
}

export default Login;
