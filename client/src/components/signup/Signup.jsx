import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { motion } from 'framer-motion';
import { useForm } from '../../hook/useForm';

const Signup = () => {
	const [{ username, password, name, lastname, email }, handleInputChange] =
		useForm({ username: '', password: '', name: '', lastname: '', email: '' });

	const {
		setUserSignup,
		signupData,
		fetchSignup,
		setFetchSignup,
		loadingSignup,
	} = useContext(AppContext);

	const history = useHistory();

	const signup = (e) => {
		e.preventDefault();
		setUserSignup({ username, password, name, lastname, email });
		setFetchSignup(true);
		// (!signupData.data.error && !loadingSignup) && history.push('/login');
	};

	useEffect(() => {
		setFetchSignup(false);
	}, [fetchSignup, setFetchSignup]);

	return (
		<form id='form' onSubmit={signup}>
			<h2 className='text-center mb-4 text-light'>Registrate</h2>
			{signupData.data.error && !loadingSignup && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, y: '-100%' }}
					className='container alert alert-danger text-center'
					role='alert'
				>
					{signupData.data.error}
				</motion.div>
			)}
			{signupData.data.msg && !loadingSignup && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, y: '-100%' }}
					className='container alert alert-success text-center'
					role='alert'
				>
					Usuario creado,{' '}
					<a className='alert-link' href='/login'>
						Iniciar sesion
					</a>
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
				Registrarse
			</button>
			<button
				className='btn btn-secondary'
				onClick={() => history.push('/login')}
				type='button'
			>
				Volver al login
			</button>
		</form>
	);
};

export default Signup;
