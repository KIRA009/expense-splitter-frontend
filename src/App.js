import React from 'react';
import urls from './urls'
import {BrowserRouter as Router, Route} from 'react-router-dom'

const App = () => {
	return (
		<Router>
		{
			urls.map((url, index) => (
				<Route key={index} component={props => <url.component props={props}/>} exact path={url.url}/>
			))
		}
		</Router>
	)
	// return <SignUp />;
}

export default App;
