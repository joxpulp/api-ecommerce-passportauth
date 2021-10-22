import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ isAuth, component: Component, ...rest }) => {
	return (
		<Route {...rest}>{isAuth ? <Redirect to='/' /> : <Component />}</Route>
	);
};

export default PublicRoute;


// ** Other version / Framer Motion does not work with this method
// const PublicRoute = ({ isAuth, component: Component, ...rest }) => {
//  	return (
//  		<Route
//  			{...rest}
//  			component={(props) =>
// 				!isAuth ? <Component {...props} /> : <Redirect to='/' />
//  			}
//  		/>
//  	);
//  };

// export default PublicRoute;