import React, { memo } from 'react';
import PropTypes from 'prop-types';
import useDataApi from 'hooks/useDataApi';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import ProductCard from 'components/ProductCard/ProductCard';
import Pagination from 'components/Pagination/Pagination';
import { Typography, Box } from '@material-ui/core';

import useStyles from './styles';

function ProductContainer({ name, location }) {
    const classes = useStyles();
    let products;
    let currentPage;
    let pageCount;
    const { pathname, search } = location;
    const url = `${pathname}${search}`;

    const [{ isLoading, isError, data }, doFetch] = useDataApi({
        url,
    });

    const changePage = pageNumber => {
        doFetch({
            url: `${pathname}?page=${pageNumber}`,
        });
    };

    if (!isLoading && data.hits) {
        products = data.hits.data;
        currentPage = data.hits.current_page;
        pageCount = data.hits.last_page;

        products = products.map(product => {
            const { id } = product;
            return <ProductCard key={id} {...product} />;
        });
    }

    return (
        <>
            {!isLoading && data.hits && (
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
                            pageCount={pageCount}
                            pathname={pathname}
                            changePage={changePage}
                        />
                    </Grid>
                </>
            )}
        </>
    );
}

ProductContainer.propTypes = {
    name: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
};

export default memo(ProductContainer);
