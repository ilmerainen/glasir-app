import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

import useStyles from './styles';

function Pagination({ currentPage, pageCount, pathname, changePage }) {
    const classes = useStyles();
    const buttons = [];

    for (let i = 1; i <= pageCount; i++) {
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

        buttons[i] = (
            <Button
                key={`page-${i}`}
                className={className}
                component={component}
                disabled={disabled}
                to={path}
                onClick={() => changePage(i)}
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
    pageCount: PropTypes.number.isRequired,
    pathname: PropTypes.string.isRequired,
    changePage: PropTypes.func.isRequired,
};

export default memo(Pagination);
