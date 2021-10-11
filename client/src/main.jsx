import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppProvider from './context/AppContext';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store/store';

ReactDOM.render(
	<React.StrictMode>
		<AppProvider>
			<Provider store={store}>
				<Router>
					<App />
				</Router>
			</Provider>
		</AppProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
