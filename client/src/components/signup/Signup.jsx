import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { GooSpinner } from 'react-spinners-kit';
import { useForm } from '../../hook/useForm';
import { logout, signupThunk } from '../../actions/authActions';
import { removeError } from '../../actions/uiAactions';

const Signup = () => {
	const [{ username, password, name, lastname, email }, handleInputChange] =
		useForm({ username: '', password: '', name: '', lastname: '', email: '' });

	const dispatch = useDispatch();
	const { loading, msgError } = useSelector((state) => state.ui);
	const { msg } = useSelector((state) => state.auth);

	const history = useHistory();

	const signup = (e) => {
		e.preventDefault();
		dispatch(signupThunk({ username, password, name, lastname, email }));
		dispatch(removeError());
	};

	const backtoLogin = () => {
		history.push('/login');
		dispatch(logout());
	};

	return (
		<form id='form' onSubmit={signup}>
			<h2 className='text-center mb-4 text-light'>Registrate</h2>
			{msgError && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, y: '-100%' }}
					className='container alert alert-danger text-center'
					role='alert'
				>
					{msgError}
				</motion.div>
			)}
			{msg && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, y: '-100%' }}
					className='container alert alert-success text-center'
					role='alert'
				>
					{msg}
					<button className='btn btn-success ms-2' onClick={backtoLogin}>
						Iniciar sesion
					</button>
				</motion.div>
			)}
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
			<div className='form-floating mb-3'>
				<input
					type='text'
					className='form-control'
					name='name'
					placeholder='name'
					value={name}
					onChange={handleInputChange}
					required
				/>
				<label htmlFor='name'>Nombre</label>
			</div>
			<div className='form-floating mb-3'>
				<input
					type='text'
					className='form-control'
					name='lastname'
					placeholder='lastname'
					value={lastname}
					onChange={handleInputChange}
					required
				/>
				<label htmlFor='lastname'>Apellido</label>
			</div>
			<div className='form-floating mb-3'>
				<input
					type='text'
					className='form-control'
					name='email'
					placeholder='email'
					value={email}
					onChange={handleInputChange}
					required
				/>
				<label htmlFor='email'>Email</label>
			</div>
			<button className='btn btn-success me-2' type='submit'>
				{loading ? <GooSpinner size={25} /> : 'Registrarse'}
			</button>
			<button className='btn btn-secondary' onClick={backtoLogin} type='button'>
				Volver al login
			</button>
		</form>
	);
};

export default Signup;
