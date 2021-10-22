<<<<<<< HEAD
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
=======
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddProduct from '../components/addproduct/AddProduct';
import ChatBox from '../components/chatbox/ChatBox';
import ProductTable from '../components/producttable/ProductTable';
import { logoutThunk } from '../redux/reducers/authReducer';
import { setLogoutMessage } from '../redux/reducers/uiReducer';

const Home = ({ socket }) => {
	const dispatch = useDispatch();
	const { username } = useSelector((state) => state.auth);
>>>>>>> frontend-reduxtoolkit

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
