import React from 'react'
import {
    AppBar,
    Toolbar,
    Button,
    makeStyles,
} from '@material-ui/core';

import {primColors, secColors} from '../colors'
import Logo from './Logo'

const useStyles = makeStyles(theme => ({
    tabs: {
        width: 'auto',
        margin: 10
    }
}))

const Navbar = ({tabs}) => {
    const classes = useStyles();
    const path = window.location.pathname;
    return (
        <div style={{marginBottom: 50}}>
            <AppBar position='static' style={{backgroundColor:primColors.main}}>
                <Toolbar>
                    <Logo />
                    <div style={{marginLeft: 'auto', display: 'flex'}}>
                        {tabs.map((tab, index) => (
                            <Button
                            className={classes.tabs}
                            key={index}
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={path===tab.url}
                            href={tab.url}
                            style={{backgroundColor:secColors.dark, color:primColors.light}}
                                > {tab.name}
                            </Button>
                        ))}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}


export default Navbar;