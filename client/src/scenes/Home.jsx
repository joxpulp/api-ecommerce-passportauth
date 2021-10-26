import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from '../redux/reducers/authReducer';
import { setLogoutMessage } from '../redux/reducers/uiReducer';
import AddProduct from '../components/addproduct/AddProduct';
import ProductTable from '../components/producttable/ProductTable';
import ChatBox from '../components/chatbox/ChatBox';

const Home = () => {
	const dispatch = useDispatch();
	const { username } = useSelector((state) => state.auth);

	const handleLogout = () => {
		dispatch(setLogoutMessage());
		dispatch(logoutThunk());
	};

	return (
		<>
			<div className='container alert alert-success text-center' role='alert'>
				Bienvenido {username}
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
