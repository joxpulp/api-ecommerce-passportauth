import React, { useContext, useEffect } from 'react';
import AddProduct from '../components/addproduct/AddProduct';
import ChatBox from '../components/chatbox/ChatBox';
import ProductTable from '../components/producttable/ProductTable';
import { AppContext } from '../context/AppContext';
import { useHistory } from 'react-router-dom';

const Home = ({ socket }) => {
	const {
		userName,
		setLogoutMessage,
		setFetchLogout,
		setFetchLogin,
		fetchLogin,
		setLoginData,
		setLoggedData,
	} = useContext(AppContext);

	const history = useHistory();

	const handleLogout = () => {
		setLogoutMessage(true);
		setFetchLogout(true);
		setLoginData({ data: { logged: false } });
		setLoggedData({ data: { logged: false } });
		// history.push('/login');
	};

	useEffect(() => {
		setFetchLogin(false);
	}, [fetchLogin]);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(userName));
	}, [userName]);

	return (
		<>
			<div className='container alert alert-success text-center' role='alert'>
				Bienvenido {userName}
				<button className='btn btn-warning ms-2' onClick={handleLogout}>
					Salir
				</button>
			</div>
			<AddProduct socket={socket} />
			<hr style={{ backgroundColor: 'white', width: '80%' }} />
			<ProductTable socket={socket} />
			<hr style={{ backgroundColor: 'white', width: '80%' }} />
			<ChatBox socket={socket} />
		</>
	);
};

export default Home;
