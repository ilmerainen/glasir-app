import React, { useState, useContext, memo, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Typography, Box } from '@material-ui/core/';
import axios from 'axios';

import appContext from 'context/AppContext';
import { AUTH_TOKEN } from 'constants/constants';
import routes from 'constants/routes';
import useStyles from './styles';

const { REACT_APP_API_HOST } = process.env;
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
const { SIGNIN_ROUTE } = routes;

axios.defaults.baseURL = REACT_APP_API_HOST;

function SignIn() {
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
                        url: SIGNIN_ROUTE,
                        data: {
                            access_token: accessToken,
                        },
                    });

                    localStorage.setItem(AUTH_TOKEN, userData.data.token);
                    handleUserLogin(userData.data);
                } catch (err) {
                    if (err.response.status === 401) {
                        setError(err.response.data);
                    }
                }
            };

            sendData();
        }
    });

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
                    <Box fontWeight="fontWeightBold">Sign In</Box>
                </Typography>
            </Grid>
            <GoogleLogin
                clientId={REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign In"
                onSuccess={handleLogin}
                cookiePolicy="single_host_origin"
            />
        </>
    );
}

export default memo(SignIn);
