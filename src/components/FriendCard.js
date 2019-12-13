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
        width: 350,
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


const FriendCard = props => {
    const classes = useStyles();
    return (
        <Paper className={classes.card}>
            <div className={classes.details}>
                <Typography variant="h5" component="h3">
                    {props.name}
                </Typography>
                <Typography variant="subtitle1" component="p">
                    {props.number}
                </Typography>
            </div>
            {(props.actions) ? (
            <div className={classes.actions}>
                {(props.actions.includes("accept")) ? (<><Button
                className={classes.tabs}
                type="submit"
                variant="contained"
                style={{backgroundColor: primColors.light, color: secColors.dark}}
                    > Accept
                </Button>
                <br />
                <br />
                </>) : null}
                {(props.actions.includes("delete")) ? (<Button
                className={classes.tabs}
                type="submit"
                variant="contained"
                style={{backgroundColor: secColors.dark, color: primColors.light}}
                    > Delete
                </Button>) : null}
            </div>
            ) : null}
        </Paper>
    )
}


export default FriendCard;