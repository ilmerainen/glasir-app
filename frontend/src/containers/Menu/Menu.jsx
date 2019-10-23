import React, { useContext, useMemo, memo } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link as RouterLink } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

import Logo from 'components/Logo/Logo';
import ListItemLink from 'components/ListItemLink/ListItemLink';
import RouteNameContext from 'context/routeNameContext';
import beginWithUrl from 'utils/misc/beginWithUrl';
import useStyles from './styles';

function Menu() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const RouteItemName = useContext(RouteNameContext).routes;
    const categories = useMemo(
        () =>
            Object.keys(RouteItemName)
                .filter(route => {
                    return beginWithUrl('/categories/', route);
                })
                .map(route => {
                    return (
                        <ListItemLink
                            className={classes.nested}
                            key={route}
                            to={`${route}`}
                        />
                    );
                }),
        [RouteItemName]
    );

    const handleCollapse = () => {
        setOpen(false);
    };

    const handleClick = () => {
        setOpen(prevOpen => !prevOpen);
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
                <ListItem button onClick={handleClick}>
                    <ListItemText primary="Categories" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse component="li" in={open} timeout="auto" unmountOnExit>
                    <List disablePadding>{categories}</List>
                </Collapse>
                <ListItemLink to="/blog" onClick={handleCollapse} />
                <ListItemLink to="/contacts" onClick={handleCollapse} />
            </List>
        </nav>
    );
}

export default memo(Menu);
