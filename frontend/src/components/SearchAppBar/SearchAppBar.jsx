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
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

import BagContext from 'context/bagContext';
import useStyles from './styles';

function SearchAppBar({ setOpenBag }) {
    const classes = useStyles();
    const { bag } = useContext(BagContext);
    const productCount = Object.keys(bag).length || null;

    const handleIconClick = () => {
        setOpenBag(true);
    };

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
                            <IconButton
                                className={classes.shoppingCartIcon}
                                onClick={handleIconClick}
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
    setOpenBag: PropTypes.func.isRequired,
};

export default memo(SearchAppBar);
