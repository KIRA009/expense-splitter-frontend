import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import {SnackbarProvider} from 'notistack';

const client = new ApolloClient({
    request: operation => {
        const Token = localStorage.getItem('Token');
        operation.setContext({
            headers: {
                Token
            }
        });
    },
    uri: 'http://localhost:8000/api/'
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <SnackbarProvider maxSnack={3}>
            <App />
        </SnackbarProvider>
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
