import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Logo from '../../components/Logo';
import { MENU_ITEMS } from '../../constants/constants';
import ListItemLink from '../../components/ListItemLink';

const useStyles = makeStyles(theme => ({
    root: {},
    list: {
        paddingTop: 0,
    },
    lists: {
        overflow: 'auto',
        height: 'inherit',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    headLink: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontFamily: 'Roboto Condensed',
        fontWeight: '600',
        color: theme.palette.text.primary,
    },
    head: {
        minHeight: '64px',
        padding: '5%',
        paddingLeft: '16px',
    },
    logo: {
        marginRight: '8px',
        fontSize: '0',
    },
}));

function Menu({ routeCategoryItemMap }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const ExpandIcon = open ? <ExpandLess /> : <ExpandMore />;

    const handleCollapse = () => {
        setOpen(false);
    };

    const handleClick = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const routeMenuItemsMap = {
        ...MENU_ITEMS,
        ...routeCategoryItemMap,
    };

    return (
        <nav className={classes.lists} aria-label="navbar">
            <List className={classes.list}>
                <div className={classes.head}>
                    <Typography
                        className={classes.headLink}
                        variant="h5"
                        component={RouterLink}
                        to="/"
                        onClick={handleCollapse}
                    >
                        <div className={classes.logo}>
                            <Logo />
                        </div>
                        Glasir Shop
                    </Typography>
                </div>
                <Divider />
                <ListItem button open={open} onClick={handleClick}>
                    <ListItemText primary="Categories" />
                    {ExpandIcon}
                </ListItem>
                <Collapse component="li" in={open} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        {Object.keys(routeCategoryItemMap).map(name => {
                            return (
                                <ListItemLink
                                    className={classes.nested}
                                    key={name}
                                    to={`${name}`}
                                    routeItemMap={routeMenuItemsMap}
                                />
                            );
                        })}
                    </List>
                </Collapse>
                <ListItemLink
                    to="/blog"
                    onClick={handleCollapse}
                    routeItemMap={routeMenuItemsMap}
                />
                <ListItemLink
                    to="/contacts"
                    onClick={handleCollapse}
                    routeItemMap={routeMenuItemsMap}
                />
            </List>
        </nav>
    );
}

Menu.propTypes = {
    routeCategoryItemMap: PropTypes.object.isRequired,
};

export default memo(Menu);
