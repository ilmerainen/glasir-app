import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as RouterLink } from 'react-router-dom';

function ListItemLink(props) {
    const { to, routeItemMap, ...other } = props;
    const primary = routeItemMap[to];

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
    routeItemMap: PropTypes.object.isRequired,
};

export default memo(ListItemLink);
