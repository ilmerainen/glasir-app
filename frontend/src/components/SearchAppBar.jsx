import React, { memo } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    shoppingCartIcon: {
        color: theme.palette.common.white,
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.grey[300],
    },
    inputRoot: {
        color: theme.palette.common.white,
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    toolbar: {
        backgroundColor: theme.palette.grey[900],
    },
    authLink: {
        color: theme.palette.common.white,
        marginRight: '15px',
        '&:last-child': {
            margin: 0,
        },
    },
}));

function SearchAppBar() {
    const classes = useStyles();

    return (
        <>
            <AppBar className={classes.root} position="static">
                <Toolbar className={classes.toolbar}>
                    <Hidden lgUp>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Grid item md={9}>
                        <Grid container justify="flex-end">
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item md={2} className={classes.authLinks}>
                        <Grid container justify="flex-end">
                            <Link
                                className={classes.authLink}
                                component={RouterLink}
                                to="/login"
                                variant="overline"
                            >
                                Sign In
                            </Link>
                            <Link
                                className={classes.authLink}
                                component={RouterLink}
                                to="/signup"
                                variant="overline"
                            >
                                Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid item md={1} className={classes.shoppingCartIcon}>
                        <Grid container justify="flex-end">
                            <IconButton className={classes.shoppingCartIcon}>
                                <ShoppingCartIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default memo(SearchAppBar);
