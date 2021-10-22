import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { GooSpinner } from 'react-spinners-kit';
import { useForm } from '../../hook/useForm';
import { loginThunk } from '../../redux/reducers/authReducer';
import { removeError, removeLogoutMessage } from '../../redux/reducers/uiReducer';

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
		dispatch(loginThunk({username, password}));
		localStorage.setItem('username', JSON.stringify(username));
	};

	const signup = () => {
		history.push('/signup');
		dispatch(removeError());
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
			<AnimatePresence exitBeforeEnter>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='container alert alert-info text-center'
					role='alert'
				>
					Hasta luego
				</motion.div>
			</AnimatePresence>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, x: -100 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 100 }}
		>
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
					/>
					<label htmlFor='password'>Contrasena</label>
				</div>
				<button
					type='submit'
					className='btn btn-success me-3'
					disabled={loading}
				>
					{loading ? <GooSpinner size={25} /> : 'Ingresar'}
				</button>
				<button
					type='button'
					className='btn btn-secondary'
					onClick={signup}
					disabled={loading}
				>
					Registrarse
				</button>
			</form>
		</motion.div>
	);
}

export default Login;
