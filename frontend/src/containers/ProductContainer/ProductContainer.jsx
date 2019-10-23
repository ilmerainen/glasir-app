import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import useDataApi from 'hooks/useDataApi';
import { Typography, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import routes from 'constants/routes';
import useStyles from './styles';

const { PRODUCTS_ROUTE } = routes;

function ProductContainer() {
    const classes = useStyles();
    const productId = useParams().id;
    const url = `${PRODUCTS_ROUTE}/${productId}`;
    const { isLoading, rawData } = useDataApi({
        url,
    });
    let product;
    let image;

    if (!isLoading && rawData) {
        const { name, description, price, files } = rawData;

        product = {
            name,
            description,
            price,
        };

        product.name = product.name[0].toUpperCase() + product.name.slice(1);
        image = files[0].path;
    }

    return (
        <>
            {product && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container>
                            <Typography variant="h4">
                                <Box fontWeight="fontWeightBold">
                                    {product.name}
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item md={6}>
                        <img src={image} alt={`${product.name}`} />
                    </Grid>
                    <Grid item md={6}>
                        <Grid container className={classes.orderInfo}>
                            <Typography variant="body2">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Esse voluptatibus iste eius
                                dolorum numquam praesentium asperiores! Animi
                                rerum, officiis vel dolor accusamus totam
                                dignissimos? Doloribus mollitia eius
                                voluptatibus nostrum ex?
                            </Typography>
                        </Grid>
                        <Grid container>
                            <Button
                                variant="contained"
                                color="inherit"
                                className={classes.button}
                            >
                                Buy
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            <Typography variant="h5">
                                <Box fontWeight="fontWeightBold">
                                    {`${product.price}$`}
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            {product.description}
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </>
    );
}

export default memo(ProductContainer);
