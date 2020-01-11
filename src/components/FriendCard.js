import React from 'react'
import {
    Paper,
    Typography,
    makeStyles,
    Button
} from '@material-ui/core'

import {primColors, secColors} from '../colors'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 350,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 20,
        display: 'flex',
    },
    details: {
        flex: 1,
    },
    actions: {
        flex: 1,
        textAlign: 'right'
    }
}))


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
            {(actions) ? (
            <div className={classes.actions}>
                {(actions.includes("accept")) ? (<><Button
                className={classes.tabs}
                type="submit"
                variant="contained"
                style={{backgroundColor: primColors.light, color: secColors.dark}}
                onClick={() => others.acceptRequest({ variables: { contact } })}
                    > Accept
                </Button>
                <br />
                <br />
                </>) : null}
                {(actions.includes("delete")) ? (<Button
                className={classes.tabs}
                type="submit"
                variant="contained"
                style={{backgroundColor: secColors.dark, color: primColors.light}}
                onClick={() => others.deleteRequest({ variables: { contact } })}
                    > Delete
                </Button>) : null}
            </div>
            ) : null}
        </Paper>
    )
}