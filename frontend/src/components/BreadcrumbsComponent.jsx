import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { useLocation } from 'react-router';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '15px',
    },
}));

export default function BreadcrumbsComponent({ mapObj, maxItems = 2 }) {
    const classes = useStyles();
    const location = useLocation();

    return (
        <Grid container className={classes.root}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                maxItems={maxItems}
                aria-label="breadcrumb"
            >
                {console.log(location.pathname)}
                {location.pathname
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
                        const name = mapObj[formatedUrlPart];

                        return [...prev, { name, urlPart: formatedUrlPart }];
                    }, [])
                    .map(({ name, urlPart }, i, arr) => {
                        console.log(name, urlPart);
                        if (i === arr.length - 1) {
                            return (
                                <Typography key={urlPart} color="textPrimary">
                                    {name}
                                </Typography>
                            );
                        }
                        return (
                            <Link
                                component={RouterLink}
                                key={urlPart}
                                to={urlPart}
                            >
                                {name}
                            </Link>
                        );
                    })}
            </Breadcrumbs>
        </Grid>
    );
}

BreadcrumbsComponent.defaultProps = {
    maxItems: 2,
};

BreadcrumbsComponent.propTypes = {
    mapObj: PropTypes.object.isRequired,
    maxItems: PropTypes.number,
};
