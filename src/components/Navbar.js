import React from 'react'
import {
    AppBar,
    Toolbar,
    makeStyles,
} from '@material-ui/core';

import {primColors, secColors} from '../colors'
import {NavLink} from 'react-router-dom'
import {Logo} from '.'

const useStyles = makeStyles(theme => ({
    tab: {
        width: 'auto',
        margin: 10,
        color:secColors.main,
        textDecoration: 'none',
        padding: theme.spacing(1, 2),
        boxShadow: `0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)`,
        textTransform: 'uppercase',
        borderRadius: 4,
    },
    activeTab: {
        color:primColors.light,
        backgroundColor:secColors.dark, 
    }
}))

export const Navbar = ({tabs}) => {
    const classes = useStyles();
    return (
        <div style={{marginBottom: 50}}>
            <AppBar position='static' style={{backgroundColor:primColors.main}}>
                <Toolbar>
                    <Logo />
                    <div style={{marginLeft: 'auto', display: 'flex'}}>
                        {tabs.map((tab, index) => (
                            <NavLink key={index} variant="body2" className={classes.tab} activeClassName={classes.activeTab} to={tab.url}>{tab.name}</NavLink>
                        ))}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}