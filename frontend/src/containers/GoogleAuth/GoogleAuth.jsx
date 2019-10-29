import React, { useState, useContext, useEffect, memo } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Typography, Box } from '@material-ui/core/';
import axios from 'axios';

import routes from 'constants/routes';
import appContext from 'context/AppContext';
import { AUTH_TOKEN } from 'constants/constants';
import useStyles from './styles';

const { SIGNUP_ROUTE } = routes;
const { REACT_APP_API_HOST } = process.env;
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

axios.defaults.baseURL = REACT_APP_API_HOST;

function GoogleAuth() {
    const classes = useStyles();
    const { authData } = useContext(appContext);
    const { isAuth, handleUserLogin } = authData;
    const [error, setError] = useState();
    const [accessToken, setAccessToken] = useState();

    useEffect(() => {
        if (accessToken) {
            const sendData = async () => {
                let userData;

                try {
                    userData = await axios({
                        method: 'POST',
                        url: SIGNUP_ROUTE,
                        data: {
                            access_token: accessToken,
                        },
                    });

                    localStorage.setItem(AUTH_TOKEN, userData.data.token);
                    handleUserLogin(userData.data);
                } catch (err) {
                    if (err.response.status === 409) {
                        setError(err.response.data);
                    }
                }
            };

            sendData();
        }
    }, [accessToken]);

    const handleLogin = response => {
        setAccessToken(response.accessToken);
    };

    return (
        <>
            {isAuth && <Redirect to="/profile" />}
            {error && (
                <Typography color="secondary" variant="h6">
                    {error}
                </Typography>
            )}
            <Grid container className={classes.block}>
                <Typography variant="h4">
                    <Box fontWeight="fontWeightBold">Sign Up</Box>
                </Typography>
            </Grid>
            <GoogleLogin
                clientId={REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign Up"
                onSuccess={handleLogin}
                cookiePolicy="single_host_origin"
            />
        </>
    );
}

export default memo(GoogleAuth);
