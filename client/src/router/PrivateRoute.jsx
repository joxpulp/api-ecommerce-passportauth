import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
	return (
		<Route {...rest}>{isAuth ? <Component /> : <Redirect to='/login' />}</Route>
	);
};

export default PrivateRoute;

// ** Other version / Framer Motion does not work with this method
// const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
// 	return (
// 		<Route
// 			{...rest}
// 			component={(props) =>
// 				isAuth ? <Component {...props} /> : <Redirect to='/login' />
// 			}
// 		/>
// 	);
// };

// export default PrivateRoute;
