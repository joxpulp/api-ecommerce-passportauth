import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../hook/useForm';
import { loginThunk } from '../../actions/authActions';
import { GooSpinner } from 'react-spinners-kit';
import { removeError, removeLogoutMessage } from '../../actions/uiAactions';

function Login() {
	const [{ username, password }, handleInputChange] = useForm({
		username: '',
		password: '',
	});

	const history = useHistory();

	// Dispatch an action to the reducer
	const dispatch = useDispatch();
	// Get the state of ui reducer
	const { loading, msgError, logoutMessage } = useSelector((state) => state.ui);

	const login = (e) => {
		e.preventDefault();
		dispatch(loginThunk(username, password));
		localStorage.setItem('username', JSON.stringify(username));
	};

	useEffect(() => {
		setTimeout(() => {
			dispatch(removeLogoutMessage());
		}, 2000);
	}, [dispatch]);

	useEffect(() => {
		setTimeout(() => {
			dispatch(removeError());
		}, 3000);
	}, [dispatch, msgError]);

	if (logoutMessage) {
		return (
			<motion.div
				initial={{ opacity: 0, y: '-100%' }}
				animate={{ opacity: 1, y: 0 }}
				className='container alert alert-info text-center'
				role='alert'
			>
				Hasta luego
			</motion.div>
		);
	}

	return (
		<>
			<AnimatePresence>
				{msgError && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='alert alert-danger text-center'
						role='alert'
					>
						{msgError}
					</motion.div>
				)}
			</AnimatePresence>
			<form id='form' onSubmit={login}>
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
				<button
					className='btn btn-success me-3'
					type='submit'
					disabled={loading}
				>
					{loading ? <GooSpinner size={25} /> : 'Ingresar'}
				</button>
				<button
					className='btn btn-secondary'
					onClick={() => history.push('/signup')}
					disabled={loading}
				>
					Registrarse
				</button>
			</form>
		</>
	);
}

export default Login;
