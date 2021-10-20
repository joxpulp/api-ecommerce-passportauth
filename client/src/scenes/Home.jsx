import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { logoutThunk } from '../actions/authActions';
import AddProduct from '../components/addproduct/AddProduct';
import ChatBox from '../components/chatbox/ChatBox';
import ProductTable from '../components/producttable/ProductTable';
import { AppContext } from '../context/AppContext';

const Home = ({ socket }) => {
	const { userLogin, setLogoutMessage } = useContext(AppContext);

	const dispatch = useDispatch();

	const handleLogout = () => {
		setLogoutMessage(true);
		dispatch(logoutThunk());
	};

	return (
		<>
			<div className='container alert alert-success text-center' role='alert'>
				Bienvenido {userLogin.username}
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
