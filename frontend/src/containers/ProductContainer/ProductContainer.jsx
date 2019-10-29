import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import useDataApi from 'hooks/useDataApi';
import { Typography, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import AppContext from 'context/AppContext';
import routes from 'constants/routes';
import useStyles from './styles';

const { PRODUCTS_ROUTE } = routes;

function ProductContainer({ handleOpenBag }) {
    const classes = useStyles();
    const productId = useParams().id;
    const url = `${PRODUCTS_ROUTE}/${productId}`;
    const { bag, setBag } = useContext(AppContext);
    const { isLoading, rawData } = useDataApi({
        url,
    });
    let product;

    if (!isLoading && rawData) {
        const { id, name, description, price, files } = rawData;
        const formatedName = name[0].toUpperCase() + name.slice(1);

        product = {
            id,
            name: formatedName,
            description,
            price,
            image: files[0].path,
        };
    }

    const handleClickOpen = () => {
        const { id, name, image, price } = product;

        if (!bag[name]) {
            const value = {
                ...bag,
                [name]: {
                    id,
                    image,
                    count: 1,
                    price,
                    url,
                },
            };

            setBag(value);
        }

        handleOpenBag();
    };

    return (
        <>
            {product && (
                <>
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
                            <img src={product.image} alt={`${product.name}`} />
                        </Grid>
                        <Grid item md={6}>
                            <Grid container className={classes.orderInfo}>
                                <Typography variant="body2">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Esse voluptatibus iste
                                    eius dolorum numquam praesentium asperiores!
                                    Animi rerum, officiis vel dolor accusamus
                                    totam dignissimos? Doloribus mollitia eius
                                    voluptatibus nostrum ex?
                                </Typography>
                            </Grid>
                            <Grid container>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={handleClickOpen}
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
                </>
            )}
        </>
    );
}

ProductContainer.propTypes = {
    handleOpenBag: PropTypes.func.isRequired,
};

export default memo(ProductContainer);
