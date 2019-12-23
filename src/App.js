import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {useQuery} from '@apollo/react-hooks'

import {loggedInUrls, loggedOutUrls} from './urls'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import {getUserQuery} from './schema'
import {useStyles} from './styles'


const App = () => {
	const {data, loading} = useQuery(getUserQuery);
	useStyles();
	if (loading)
		return <Loader />
	const loggedIn = (data.user !== null);
	return (
		<>
		<Navbar tabs={(loggedIn) ? (loggedInUrls) : (loggedOutUrls)}/>
		<Router>
			<Route exact path='/' component={() => (loggedIn) ? (<Redirect to={loggedInUrls[0].url} />) : (<Redirect to={loggedOutUrls[0].url} />)} />
		{
			loggedOutUrls.map((url, index) => (
				<Route key={index} component={props => (loggedIn) ? (<Redirect to={loggedInUrls[0].url} />) : (<url.component props={props}/>)} exact path={url.url}/>
			))
		}
		{
			loggedInUrls.map((url, index) => (
				<Route key={index} component={props => (!loggedIn) ? (<Redirect to={loggedOutUrls[0].url} />) : (<url.component props={props}/>)} exact path={url.url}/>
			))
		}
		</Router>
		</>
	)
}

export default App;
