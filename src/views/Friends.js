import React from 'react';
import {Typography, makeStyles} from '@material-ui/core';
import {useQuery} from '@apollo/react-hooks';

import {FriendCard, Loader} from '../components';
import {getFriendsQuery} from '../schema';

const useStyles = makeStyles(theme => ({}));

export const Friends = () => {
    const classes = useStyles();
    const friends = useQuery(getFriendsQuery);
    return (
        <section className={classes.section}>
            <Typography variant="h5" component="h3" align="center" gutterBottom>
                Friends
            </Typography>
            {friends.loading ? (
                <Loader />
            ) : friends.data.user.user.length === 0 ? (
                <p className={classes.emptyList}>No requests received</p>
            ) : (
                friends.data.user.user.map((item, index) => (
                    <FriendCard key={index} name={item.friend.firstName} contact={item.friend.contact} />
                ))
            )}
        </section>
    );
};
