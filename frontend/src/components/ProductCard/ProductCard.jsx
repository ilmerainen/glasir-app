import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import useStyles from './styles';

function ProductCard({ id, name, price, img }) {
    const classes = useStyles();
    const route = `/products/${id}`;

    return (
        <Grid item md={3} className={classes.card}>
            <Grid item className={classes.imageBlock}>
                <RouterLink to={route} className={classes.textLink}>
                    <img src={img} alt={name} className={classes.image} />
                </RouterLink>
            </Grid>
            <Grid item className={classes.caption}>
                <Grid container>
                    <Typography
                        component={RouterLink}
                        to={route}
                        className={classes.textLink}
                    >
                        {name}
                    </Typography>
                </Grid>
                <Grid container>
                    <Typography variant="h6">{price}$</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
};

export default memo(ProductCard);
