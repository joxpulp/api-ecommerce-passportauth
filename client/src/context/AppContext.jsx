import React, { useState, createContext } from 'react';
import { useFetch } from '../hook/useFetch';

export const AppContext = createContext();

function AppProvider({ children }) {
	const [userName, setUserName] = useState(
		JSON.parse(localStorage.getItem('user'))
	);
	const [fetchLogin, setFetchLogin] = useState(false);
	const [fetchIsLogged, setFetchIsLogged] = useState(true);
	const [fetchLogout, setFetchLogout] = useState(false)
	const [products, setProducts] = useState([]);
	const [messages, setMessages] = useState([]);
	const [logoutMessage, setLogoutMessage] = useState(false);

	const { data: loginData, setData: setLoginData } = useFetch(
		fetchLogin && 'https://desafio24.herokuapp.com/api/auth/login',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: userName }),
			credentials: 'include',
		}
	);

	const { data: loggedData, setData: setLoggedData } = useFetch(
		fetchIsLogged && 'https://desafio24.herokuapp.com/api/auth/islogged',
		{ credentials: 'include' }
	);

	const { data: loggout } = useFetch(
		fetchLogout && 'https://desafio24.herokuapp.com/api/auth/logout',
		{ credentials: 'include' }
	);

	return (
		<AppContext.Provider
			value={{
				userName,
				setUserName,
				fetchLogin,
				setFetchLogin,
				loginData,
				loggedData,
				setFetchIsLogged,
				fetchIsLogged,
				products,
				setProducts,
				messages,
				setMessages,
				logoutMessage,
				setLogoutMessage,
				fetchLogout,
				setFetchLogout,
				loggout,
				setLoggedData,
				setLoginData,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export default AppProvider;
