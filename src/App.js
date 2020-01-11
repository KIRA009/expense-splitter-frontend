import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import {useQuery} from '@apollo/react-hooks'

import {loggedInUrls, loggedOutUrls} from './urls'
import {ServerError, Loader, Navbar} from './components'
import {getUserQuery} from './schema'
import {useStyles} from './styles'

const App = () => {
	const {data, loading} = useQuery(getUserQuery);
	useStyles();
	if (loading) return <Loader />
	if (!data) return <ServerError />
	const isLoggedIn = () => (data.user !== null) || localStorage.getItem('Token') != null
	return (
		<>
		<Router>
			<Navbar tabs={(isLoggedIn()) ? (loggedInUrls) : (loggedOutUrls)}/>
			<Route exact path='/' component={() => (isLoggedIn()) ? (<Redirect to={loggedInUrls[0].url} />) : (<Redirect to={loggedOutUrls[0].url} />)} />
		{
			loggedOutUrls.map((url, index) => (
				<Route key={index} component={props => (isLoggedIn()) ? (<Redirect to={loggedInUrls[0].url} />) : (<url.component props={props}/>)} exact path={url.url}/>
			))
		}
		{
			loggedInUrls.map((url, index) => (
				<Route key={index} component={props => (!isLoggedIn()) ? (<Redirect to={loggedOutUrls[0].url} />) : (<url.component props={props}/>)} exact path={url.url}/>
			))
		}
		</Router>
		</>
	)
}

export default App;
