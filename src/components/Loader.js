import React from 'react';
import {
    CircularProgress,
    makeStyles
} from '@material-ui/core';

const Loader = props => (
    <CircularProgress style={{
        display: 'block',
        margin: 'auto',
        marginTop: 100
    }}/>
)

export default Loader;