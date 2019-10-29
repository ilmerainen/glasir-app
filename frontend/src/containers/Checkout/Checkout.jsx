import React, { useContext, useState, useEffect, memo } from 'react';
import { Redirect } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';

import { AUTH_TOKEN } from 'constants/constants';
import routes from 'constants/routes';
import CheckoutForm from 'containers/CheckoutForm/CheckoutForm';
import AppContext from 'context/AppContext';
import axios from 'axios';
import useStyles from './styles';

const { PROFILE_ROUTE } = routes;
axios.defaults.headers.common.Authorization = localStorage.getItem(AUTH_TOKEN);

function Checkout() {
    const classes = useStyles();
    const { authData, bag, setBag } = useContext(AppContext);
    const { isAuth } = authData;
    const isEmptyBag = !Object.keys(bag).length;
    const [submittingData, setSubmittingData] = useState();

    useEffect(() => {
        if (!isEmptyBag && submittingData) {
            let result;

            const productsData = Object.values(bag).map(({ id, count }) => {
                return { id, count };
            });
            const submitData = async () => {
                result = axios({
                    url: PROFILE_ROUTE,
                    method: 'POST',
                    data: {
                        ...submittingData,
                        products: productsData,
                    },
                });

                if (result) {
                    setBag({});
                }
            };

            submitData();
        }
    }, [submittingData]);

    const handleSubmitData = data => {
        setSubmittingData(data);
    };

    return (
        <>
            {!isAuth ? (
                <Redirect to="/" />
            ) : (
                <>
                    <Grid container className={classes.block}>
                        <Typography variant="h4">
                            <Box fontWeight="fontWeightBold">Check Out</Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="flex-end">
                            <CheckoutForm submitData={handleSubmitData} />
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}

export default memo(Checkout);
