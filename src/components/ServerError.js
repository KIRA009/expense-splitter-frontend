import React from 'react';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 100,
        textAlign: 'center'
    }
}));

export const ServerError = () => {
    const classes = useStyles();
    return <div className={classes.root}>Sorry, seems like the backend server is down</div>;
};
