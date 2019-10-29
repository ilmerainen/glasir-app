import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Avatar from '@material-ui/core/Avatar';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import routes from 'constants/routes';
import AppContext from 'context/AppContext';
import useStyles from './styles';

const { SIGNIN_ROUTE, SIGNUP_ROUTE } = routes;

function SearchAppBar({ handleOpenBag }) {
    const classes = useStyles();
    const { bag, authData } = useContext(AppContext);
    const { isAuth, userData, handleUserLogout } = authData;
    const productCount = Object.keys(bag).length || null;

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
                    {!isAuth ? (
                        <Grid item md={2} className={classes.authLinks}>
                            <Grid container justify="flex-end">
                                <Link
                                    className={classes.authLink}
                                    component={RouterLink}
                                    to={SIGNIN_ROUTE}
                                    variant="overline"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    className={classes.authLink}
                                    component={RouterLink}
                                    to={SIGNUP_ROUTE}
                                    variant="overline"
                                >
                                    Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid item md={2}>
                            <Grid container alignItems="center">
                                <Grid item md={7}>
                                    <Grid container justify="flex-end">
                                        <Link
                                            to="/"
                                            className={classes.authLink}
                                            component={RouterLink}
                                            variant="overline"
                                            onClick={handleUserLogout}
                                        >
                                            LOGOUT
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Grid item md={5}>
                                    <Grid container justify="flex-end">
                                        <RouterLink to="/profile">
                                            <Avatar
                                                alt="user avatar"
                                                src={userData.avatar}
                                                className={classes.avatar}
                                            />
                                        </RouterLink>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    <Grid item md={1} className={classes.shoppingCartIcon}>
                        <Grid container justify="flex-end">
                            <IconButton
                                className={classes.shoppingCartIcon}
                                onClick={handleOpenBag}
                            >
                                <Badge
                                    badgeContent={productCount}
                                    className={classes.basketBadge}
                                >
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
}

SearchAppBar.propTypes = {
    handleOpenBag: PropTypes.func.isRequired,
};

export default memo(SearchAppBar);
