import React, { useState, createContext } from 'react';
import { useFetch } from '../hook/useFetch';

export const AppContext = createContext();

function AppProvider({ children }) {
	const [userLogin, setUserLogin] = useState({});
	const [userSignup, setUserSignup] = useState({});
	const [products, setProducts] = useState([]);
	const [messages, setMessages] = useState([]);
	const [logoutMessage, setLogoutMessage] = useState(false);

	const [fetchLogin, setFetchLogin] = useState(false);
	const [fetchSignup, setFetchSignup] = useState(false);
	const [fetchIsLogged, setFetchIsLogged] = useState(true);
	const [fetchLogout, setFetchLogout] = useState(false);

	const URL = 'https://desafio27.herokuapp.com';

	const { data: loginData, setData: setLoginData, loading: loadingLogin } = useFetch(fetchLogin && `${URL}/api/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(userLogin),
		credentials: 'include',
	});

	const { data: signupData, loading: loadingSignup } = useFetch(
		fetchSignup && `${URL}/api/auth/signup`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userSignup),
			credentials: 'include',
		}
	);

	const { data: loggedData, setData: setLoggedData } = useFetch( fetchIsLogged && `${URL}/api/auth/islogged`, { credentials: 'include' });

	const { data: loggout } = useFetch(fetchLogout && `${URL}/api/auth/logout`, { credentials: 'include' });

	return (
		<AppContext.Provider
			value={{ 
				userLogin, 
				setUserLogin, 
				products, 
				setProducts, 
				messages, 
				setMessages, 
				logoutMessage, 
				setLogoutMessage, 
				loginData, 
				setLoginData, 
				loadingLogin, 
				signupData,
				loadingSignup,
				loggedData,
				setLoggedData,
				loggout,
				userSignup,
				setUserSignup,
				fetchLogin,
				setFetchLogin,
				fetchIsLogged,
				setFetchIsLogged,
				fetchLogout,
				setFetchLogout,
				fetchSignup,
				setFetchSignup,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export default AppProvider;
