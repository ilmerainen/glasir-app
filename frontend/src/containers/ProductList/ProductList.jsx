import React, { memo, useContext, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { Typography, Box } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
    const name = routeItemNameMap[pathname];
    const [itemCount, setItemCount] = useState(PRODUCTS_PER_PAGE);
    const paramsString = getUrlParamsFromObj({
        per_page: itemCount,
    });
    const pageParam = search || '?page=1';
    let products;
    let currentPage;
    let lastPage;
    let redirectLink;

    const appendedUrl = `${pathname}${pageParam}&${paramsString}`;
    const { isLoading, rawData } = useDataApi({
        url: appendedUrl,
    });

    if (!isLoading && rawData) {
        if (!rawData.data.length) {
            const route = `${pathname}?page=1`;

            redirectLink = <Redirect to={`${route}`} />;
        } else {
            currentPage = rawData.current_page;
            lastPage = rawData.last_page;
            products = rawData.data.map(product => {
                return <ProductCard key={product.id} {...product} />;
            });
        }
    }

    const handleChangeItemCount = ({ target }) => {
        setItemCount(target.value);
    };

    return (
        <>
            {redirectLink}
            {products && (
                <>
                    <Grid
                        container
                        className={clsx(classes.pageTitle, classes.block)}
                        alignItems="center"
                    >
                        <Grid container className={classes.block}>
                            <Typography variant="h4">
                                <Box fontWeight="fontWeightBold">{name}</Box>
                            </Typography>
                        </Grid>
                        <Grid container>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="items-per-page">
                                    Items
                                </InputLabel>
                                <Select
                                    value={itemCount}
                                    onChange={handleChangeItemCount}
                                >
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                </Select>
                            </FormControl>
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
