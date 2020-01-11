import React, {useRef} from 'react'
import {
    Typography,
    Grid,
    makeStyles,
    Input,
    InputAdornment
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import {useQuery, useMutation} from '@apollo/react-hooks'

import {FriendCard, Loader} from '../components'
import {
    getReceivedFriendRequestsQuery,
    getSentFriendRequestsQuery,
    acceptRequestMutation,
    deleteRequestMutation,
    sendRequestMutation
} from '../schema'

const useStyles = makeStyles(theme => ({
    searchFieldContainer: {
        textAlign: 'center',
        marginBottom: 50,
    },
    searchField: {
        width: 220
    },
    root: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    section: {
        margin: 10,
    },
    emptyList: {
        textAlign: 'center'
    }
}))

export const FriendRequests = props => {
    const classes = useStyles();
    const contact = useRef();
    const receivedRequests = useQuery(getReceivedFriendRequestsQuery);
    const sentRequests = useQuery(getSentFriendRequestsQuery);
    const [acceptRequest] = useMutation(acceptRequestMutation, {
        refetchQueries:  [{
            query: getReceivedFriendRequestsQuery
        }]
    });
    const [deleteRequest] = useMutation(deleteRequestMutation, {
        refetchQueries:  [
            {
                query: getReceivedFriendRequestsQuery,
            },
            {
                query: getSentFriendRequestsQuery,
            }
        ]
    });
    const sendRequest = useMutation(sendRequestMutation, {
        refetchQueries:  [{
            query: getSentFriendRequestsQuery
        }]
    });
    if (sendRequest[1].data) {
        let data = sendRequest[1].data;
        props.enqueueSnackbar(data.sendFriendRequest.message, { 
            variant: data.sendFriendRequest.ok ? 'success' : 'error',
            persist: false,
            autoHideDuration: 3000
        });
        sendRequest[1].data = null;
    }
    const sendFriendRequest = e => {
        e.preventDefault();
        sendRequest[0]({ variables: { contact: contact.current.value }});
    }
    return (
        <Grid container>
            <Grid item xs={12} className={classes.searchFieldContainer}>
                <form onSubmit={sendFriendRequest}>
                <Input placeholder="Send Request to number" variant="outlined" className={classes.searchField}
                endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                }
                inputRef={contact}
                required
                inputProps={{
                    type: 'tel'
                }}
                />
                </form>
            </Grid>
            <Grid item md className={classes.root}>
                <section className={classes.section}>
                    <Typography variant="h5" component="h3" align='center' gutterBottom>
                        Received Friend Requests
                    </Typography>
                    {receivedRequests.loading || receivedRequests.data.user == null ? (
                        <Loader />
                    ) : (
                        (receivedRequests.data.user.userReceived.length === 0) ? (
                            <p className={classes.emptyList}>No requests received</p>
                         ) :
                         receivedRequests.data.user.userReceived.map((item, index) => (
                            <FriendCard
                                key={index}
                                name={item.fromUser.firstName}
                                contact={item.fromUser.contact}
                                acceptRequest={acceptRequest}
                                deleteRequest={deleteRequest}
                                actions={['accept', 'delete']} />
                        ))
                    )}
                </section>
            </Grid>
            <Grid item md className={classes.root}>
                <section className={classes.section}>
                    <Typography variant="h5" component="h3" align='center' gutterBottom>
                        Sent Friend Requests
                    </Typography>
                    {sentRequests.loading || sentRequests.data.user == null ? (
                        <Loader />
                    ) : (
                        (sentRequests.data.user.userSent.length === 0) ? (
                            <p className={classes.emptyList}>No requests sent</p>
                        ):
                        sentRequests.data.user.userSent.map((item, index) => (
                            <FriendCard
                                key={index}
                                name={item.toUser.firstName}
                                contact={item.toUser.contact}
                                deleteRequest={deleteRequest}
                                actions={['delete']} />
                        ))
                    )}
                </section>
            </Grid>
        </Grid>
    )
}