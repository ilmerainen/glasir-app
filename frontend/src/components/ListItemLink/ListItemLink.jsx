import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

import RouteNameContext from 'context/routeNameContext';

function ListItemLink({ to, ...other }) {
    const routeItemName = useContext(RouteNameContext).routes;
    const primary = routeItemName[to];

    return (
        <li>
            <ListItem button component={Link} to={to} {...other}>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

ListItemLink.propTypes = {
    to: PropTypes.string.isRequired,
};

export default memo(ListItemLink);
