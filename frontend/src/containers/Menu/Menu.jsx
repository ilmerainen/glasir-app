import React from 'react';
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

const routeMenuItemsMap = {};

function ListItemLink(props) {
    const { to, ...other } = props;
    const primary = routeMenuItemsMap[to];

    return (
        <li>
            <ListItem button component={RouterLink} to={to} {...other}>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

ListItemLink.defautlProps = {
    open: false,
};

ListItemLink.propTypes = {
    to: PropTypes.string.isRequired,
};

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

export default function Menu({ routeItemMap }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const ExpandIcon = open ? <ExpandLess /> : <ExpandMore />;

    const handleCollapse = () => {
        setOpen(false);
    };

    const handleClick = () => {
        setOpen(prevOpen => !prevOpen);
    };

    Object.assign(routeMenuItemsMap, routeItemMap);

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
                        {Object.keys(routeItemMap)
                            .filter(key => {
                                const regex = /^\/categories\//;
                                return regex.test(key);
                            })
                            .map(name => {
                                return (
                                    <ListItemLink
                                        key={name}
                                        to={`${name}`}
                                        className={classes.nested}
                                    />
                                );
                            })}
                    </List>
                </Collapse>
                <ListItemLink to="/blog" onClick={handleCollapse} />
                <ListItemLink to="/contacts" onClick={handleCollapse} />
            </List>
        </nav>
    );
}

Menu.propTypes = {
    routeItemMap: PropTypes.object.isRequired,
};
