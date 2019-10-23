import React, { memo, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { Typography, Box } from '@material-ui/core';

import RouteNameContext from 'context/routeNameContext';
import constants from 'constants/misc.js';
import getUrlParamsFromObj from 'utils/misc/getUrlParamsFromObj';
import ProductCard from 'components/ProductCard/ProductCard';
import Pagination from 'components/Pagination/Pagination';
import useDataApi from 'hooks/useDataApi';
import useStyles from './styles';

const { PRODUCTS_PER_PAGE } = constants;

function ProductList() {
    const classes = useStyles();
    const { pathname, search } = useLocation();
    const routeItemNameMap = useContext(RouteNameContext).routes;
    const paramsString = getUrlParamsFromObj({
        per_page: PRODUCTS_PER_PAGE,
    });
    const name = routeItemNameMap[pathname];
    const pageParam = search || '?page=1';
    let products;
    let currentPage;
    let lastPage;

    const appendedUrl = `${pathname}${pageParam}&${paramsString}`;
    const { isLoading, rawData } = useDataApi({
        url: appendedUrl,
    });

    if (!isLoading && rawData) {
        currentPage = rawData.current_page;
        lastPage = rawData.last_page;
        products = rawData.data.map(product => {
            return <ProductCard key={product.id} {...product} />;
        });
    }

    return (
        <>
            {products && (
                <>
                    <Grid
                        container
                        className={clsx(classes.pageTitle, classes.block)}
                    >
                        <Grid item>
                            <Typography variant="h4">
                                <Box fontWeight="fontWeightBold">{name}</Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={4}
                        className={clsx(classes.products, classes.block)}
                    >
                        {products}
                    </Grid>
                    <Grid
                        container
                        className={clsx(classes.pagination, classes.block)}
                        justify="center"
                    >
                        <Pagination
                            currentPage={currentPage}
                            lastPage={lastPage}
                            pathname={pathname}
                        />
                    </Grid>
                </>
            )}
        </>
    );
}

export default memo(ProductList);
