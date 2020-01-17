import React from 'react';
import {Paper, makeStyles, Typography, Grid} from '@material-ui/core';
import {useLazyQuery} from '@apollo/react-hooks';

import {getNotAddedMembers} from '../schema';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 350,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 20,
        display: 'flex',
        marginBottom: 30,
        '&:hover': {
            cursor: 'pointer'
        }
    },
    details: {
        flex: 2
    },
    actions: {
        flex: 1,
        textAlign: 'right'
    }
}));

export const GroupCard = props => {
    const {group, setGroup, setOpen, ...others} = props;
    const notAddedMembers = useLazyQuery(getNotAddedMembers, {variables: {group_name: group.groupName}});
    if (notAddedMembers[1].called && !notAddedMembers[1].loading) {
        others.setNotAddedMembers(notAddedMembers[1].data.notAddedMembers);
        notAddedMembers[1].loading = true;
    }
    group.admin = others.admin;
    const classes = useStyles();
    const handleClick = () => {
        if (group.admin) notAddedMembers[0]();
        setGroup(group);
        setOpen(prev => !prev);
    };
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Paper className={classes.card} onClick={handleClick}>
                <div className={classes.details}>
                    <Typography variant="h5" component="h3">
                        {group.groupName}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                        <small>Created by</small> {group.admin ? `You` : group.groupAdmin.contact}
                    </Typography>
                </div>
                <div className={classes.actions}>Members: {group.groupMember.length + 1}</div>
            </Paper>
        </Grid>
    );
};
