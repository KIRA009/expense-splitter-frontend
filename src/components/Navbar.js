import React from 'react'
import {
    AppBar,
    Toolbar,
    Button,
    makeStyles,
} from '@material-ui/core';

import {primColors, secColors} from '../colors'

const useStyles = makeStyles(theme => ({
    tabs: {
        width: 90,
        margin: 10
    }
}))

const Navbar = ({tabs}) => {
    const classes = useStyles();
    const path = window.location.pathname;
    return (
        <div>
            <AppBar position='static' style={{backgroundColor:primColors.main}}>
                <Toolbar>
                    <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg" style={{padding:5}}>
                        <rect width="60" height="60" style={{fill:secColors.main}}></rect>
                        <text x="22" y="16" fill="#fff" style={{transform:'scale(1.5)', fontWeight:'700'}}>E</text>
                        <polygon points="0,0 60,60 0,60" style={{fill:primColors.main}}></polygon>
                        <text x="6" y="29" fill={secColors.main} style={{transform:'scale(1.5)', fontWeight:'700'}}>S</text>
                    </svg>
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