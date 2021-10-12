import React, { useContext } from 'react';
import AddProduct from '../components/addproduct/AddProduct';
import ChatBox from '../components/chatbox/ChatBox';
import ProductTable from '../components/producttable/ProductTable';
import { AppContext } from '../context/AppContext';
// import { useHistory } from 'react-router-dom';

const Home = () => {
	const {
		userLogin,
		setLogoutMessage,
		setFetchLogout,
		setLoginData,
		setLoggedData,
	} = useContext(AppContext);

	// const history = useHistory();

	const handleLogout = () => {
		setLogoutMessage(true);
		setFetchLogout(true);
		setLoginData({ data: { logged: false } });
		setLoggedData({ data: { logged: false } });
		// history.push('/login');
	};

	return (
		<>
			<div className='container alert alert-success text-center' role='alert'>
				Bienvenido {userLogin.username}
				<button className='btn btn-warning ms-2' onClick={handleLogout}>
					Salir
				</button>
			</div>
			<AddProduct />
			<hr style={{ backgroundColor: 'white', width: '80%' }} />
			<ProductTable />
			<hr style={{ backgroundColor: 'white', width: '80%' }} />
			<ChatBox />
		</>
	);
};

export default Home;
