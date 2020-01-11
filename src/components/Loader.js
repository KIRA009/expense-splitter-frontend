import React from 'react';
import {
    CircularProgress,
} from '@material-ui/core';

export const Loader = props => (
    <CircularProgress style={{
        display: 'block',
        margin: 'auto',
        marginTop: 100,
        ...props.style
    }}/>
)