import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {useQuery} from '@apollo/react-hooks'

import {urls, loggedInUrls, loggedOutUrls} from './urls'
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
		<Navbar tabs={loggedIn ? loggedInUrls : loggedOutUrls}/>
		<Router>
		{
			urls.map((url, index) => (
				<Route key={index} component={props => <url.component props={props}/>} exact path={url.url}/>
			))
		}
		</Router>
		</>
	)
}

export default App;
