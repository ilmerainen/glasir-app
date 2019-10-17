import React, { useMemo, useContext, memo } from 'react';
import PropTypes from 'prop-types';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useLocation } from 'react-router';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

import { RouteNameContext } from 'src/context';
import useStyles from './styles';

function Crumbs(path, routeItemNameMap) {
    const crumbs = path
        .split('/')
        .reduce((prev, urlPart, i, arr) => {
            if (!prev.length) {
                return [
                    {
                        name: 'Home',
                        urlPart: '',
                    },
                ];
            }

            if (!urlPart && i === arr.length - 1) {
                return prev;
            }

            const formatedUrlPart = `${prev[i - 1].urlPart}/${urlPart}`;
            const name = routeItemNameMap[formatedUrlPart];

            return [...prev, { name, urlPart: formatedUrlPart }];
        }, [])
        .map(({ name, urlPart }, i, arr) => {
            if (i === arr.length - 1) {
                return (
                    <Typography key={urlPart} color="textPrimary">
                        {name}
                    </Typography>
                );
            }
            return (
                <Link component={RouterLink} key={urlPart} to={urlPart}>
                    {name}
                </Link>
            );
        });

    return crumbs;
}

function BreadcrumbsComponent({ maxItems }) {
    const classes = useStyles();
    const routeItemNameMap = useContext(RouteNameContext);
    const location = useLocation();
    const currentPath = location.pathname;
    const memoizedCrumbs = useMemo(
        () => Crumbs(currentPath, routeItemNameMap),
        [currentPath]
    );

    return (
        <Grid container className={classes.root}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                maxItems={maxItems}
                aria-label="breadcrumb"
            >
                {memoizedCrumbs}
            </Breadcrumbs>
        </Grid>
    );
}

BreadcrumbsComponent.defaultProps = {
    maxItems: 2,
};

BreadcrumbsComponent.propTypes = {
    maxItems: PropTypes.number,
};

export default memo(BreadcrumbsComponent);
