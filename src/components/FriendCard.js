import React from 'react';
import {Paper, Typography, makeStyles} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import {primColors, secColors} from '../colors';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 350,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 20,
        display: 'flex',
        marginBottom: 30
    },
    details: {
        flex: 1
    },
    actions: {
        flex: 1,
        textAlign: 'right'
    },
    tabs: {
        color: secColors.dark,
        fontSize: 24,
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
            fontSize: 36,
            color: primColors.dark
        }
    }
}));

export const FriendCard = props => {
    const classes = useStyles();
    const {name, actions, contact, ...others} = props;
    return (
        <Paper className={classes.card}>
            <div className={classes.details}>
                <Typography variant="h5" component="h3">
                    {name}
                </Typography>
                <Typography variant="subtitle1" component="p">
                    {contact}
                </Typography>
            </div>
            {actions ? (
                <div className={classes.actions}>
                    {actions.includes('accept') ? (
                        <>
                            <AddCircleIcon
                                type="submit"
                                variant="contained"
                                style={{backgroundColor: primColors.light, color: secColors.dark}}
                                onClick={() => others.accept({variables: {contact}})}
                            />
                            <br />
                            <br />
                        </>
                    ) : null}
                    {actions.includes('delete') ? (
                        <DeleteIcon
                            className={classes.tabs}
                            type="submit"
                            variant="contained"
                            onClick={() => others.delete({variables: {contact, firstName: name}})}
                        />
                    ) : null}
                </div>
            ) : null}
        </Paper>
    );
};
