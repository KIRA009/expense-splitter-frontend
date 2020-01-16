import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';

import {loggedInUrls, loggedOutUrls} from './urls';
import {ServerError, Loader, Navbar} from './components';
import {getUserQuery} from './schema';
import {useStyles} from './styles';

const App = () => {
    const {data, loading} = useQuery(getUserQuery);
    const [loggedIn, setLoggedIn] = useState(false);
    const [value, setValue] = useState(0);
    useStyles();
    if (loading) return <Loader />;
    if (!data) return <ServerError />;
    if (data.user !== null || localStorage.getItem('Token') != null) {
        if (!loggedIn) setLoggedIn(true);
    } else {
        if (loggedIn) setLoggedIn(false);
    }
    document.title = `Expense Splitter - ${loggedIn ? loggedInUrls[value].name : loggedOutUrls[value].name}`;
    return (
        <>
            <Router>
                <Navbar tabs={loggedIn ? loggedInUrls : loggedOutUrls} value={value} setValue={setValue}>
                    <Route
                        exact
                        path="/"
                        component={() =>
                            loggedIn ? <Redirect to={loggedInUrls[0].url} /> : <Redirect to={loggedOutUrls[0].url} />
                        }
                    />
                    {loggedOutUrls.map((url, index) => (
                        <Route
                            key={index}
                            component={props =>
                                loggedIn ? <Redirect to={loggedInUrls[0].url} /> : <url.component props={props} />
                            }
                            exact
                            path={url.url}
                        />
                    ))}
                    {loggedInUrls.map((url, index) => (
                        <Route
                            key={index}
                            component={props =>
                                !loggedIn ? <Redirect to={loggedOutUrls[0].url} /> : <url.component props={props} />
                            }
                            exact
                            path={url.url}
                        />
                    ))}
                </Navbar>
            </Router>
        </>
    );
};

export default App;
