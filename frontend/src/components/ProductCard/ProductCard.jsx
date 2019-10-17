import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextLink from 'components/TextLink/TextLink';

import useStyles from './styles';

function ProductCard({ id, name, price, img }) {
    const classes = useStyles();
    const alt = name;
    const title = name;
    const href = `/product/${id}`;

    return (
        <Grid item md={3} className={classes.card}>
            <Grid item className={classes.imageBlock}>
                <a href={href} alt={alt}>
                    <img src={img} alt={alt} className={classes.image} />
                </a>
            </Grid>
            <Grid item className={classes.caption}>
                <Grid container>
                    <TextLink href={href} variant="subtitle1">
                        {title}
                    </TextLink>
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
