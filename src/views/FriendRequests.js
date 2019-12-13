import React from 'react'
import {
    Typography,
    Grid,
    makeStyles
} from '@material-ui/core'

import FriendCard from '../components/FriendCard'

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    section: {
        margin: 10,
    }
}))

export default function FriendRequests() {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item md className={classes.root}>
                <section className={classes.section}>
                    <Typography variant="h5" component="h3" align='center' gutterBottom>
                        Received Friend Requests
                    </Typography>
                    <FriendCard
                    name={'Name here'}
                    number={'Number here'}
                    actions={['accept', 'delete']} />
                </section>
            </Grid>
            <Grid item md className={classes.root}>
                <section className={classes.section}>
                    <Typography variant="h5" component="h3" align='center' gutterBottom>
                        Sent Friend Requests
                    </Typography>
                    <FriendCard
                    name={'Name here'}
                    number={'Number here'}
                    actions={['delete']} />
                </section>
            </Grid>
        </Grid>
    )
}
