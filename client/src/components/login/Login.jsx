import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../hook/useForm';
import { loginThunk } from '../../actions/authActions';

function Login() {
	const [{ username, password }, handleInputChange] = useForm({
		username: '',
		password: '',
	});

	const { logoutMessage, setLogoutMessage, loginData, loadingLogin } =
		useContext(AppContext);

	const history = useHistory();

	// Dispatch an action to the reducer
	const dispatch = useDispatch();

	const login = (e) => {
		e.preventDefault();
		dispatch(loginThunk(username, password));
		history.push('/');
	};

	useEffect(() => {
		setTimeout(() => {
			setLogoutMessage(false);
		}, 2000);
	}, [logoutMessage, setLogoutMessage]);

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
					<div className='form-floating mb-3'>
						<input
							type='text'
							className='form-control'
							name='username'
							placeholder='username'
							value={username}
							onChange={handleInputChange}
							required
							autoFocus
						/>
						<label htmlFor='username'>Username</label>
					</div>
					<div className='form-floating mb-3'>
						<input
							type='password'
							className='form-control'
							name='password'
							placeholder='password'
							value={password}
							onChange={handleInputChange}
							required
							autoFocus
						/>
						<label htmlFor='password'>Contrasena</label>
					</div>
					<button className='btn btn-success me-3' type='submit'>
						Ingresar
					</button>
					<button
						className='btn btn-secondary'
						onClick={() => history.push('/signup')}
					>
						Registrarse
					</button>
				</>
			)}
		</motion.form>
	);
}

export default Login;
