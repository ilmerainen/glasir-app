import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

import { RouteNameContext } from 'src/context';

function ListItemLink({ to, ...other }) {
    const routeItemName = useContext(RouteNameContext);
    const primary = routeItemName[to];

    return (
        <li>
            <ListItem button component={RouterLink} to={to} {...other}>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

ListItemLink.propTypes = {
    to: PropTypes.string.isRequired,
};

export default memo(ListItemLink);
