import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

import useStyles from './styles';

function Pagination({ currentPage, lastPage, pathname }) {
    const classes = useStyles();
    const buttons = [];

    for (let i = 1; i <= lastPage; i++) {
        let className = classes.button;
        let component = RouterLink;
        let disabled = false;

        const path = {
            pathname,
            search: `?page=${i}`,
        };

        if (currentPage === i) {
            className += ` ${classes.active}`;
            component = 'button';
            disabled = true;
        }

        buttons.push(
            <Button
                key={`page-${i}`}
                className={className}
                component={component}
                disabled={disabled}
                to={path}
            >
                {i}
            </Button>
        );
    }

    return (
        <ButtonGroup size="small" aria-label="small outlined button group">
            {buttons}
        </ButtonGroup>
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    pathname: PropTypes.string.isRequired,
};

export default memo(Pagination);
