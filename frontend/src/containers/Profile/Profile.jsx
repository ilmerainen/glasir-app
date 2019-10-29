import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { AUTH_TOKEN } from 'constants/constants';
import AppContext from 'context/AppContext';
import useStyles from './styles';

export default function Profile() {
    const classes = useStyles();
    const { authData } = useContext(AppContext);
    const { isAuth, userData, handleUserLogout } = authData;
    let user;

    if (isAuth) {
        const { surname } = userData;

        user = {
            ...userData,
            surname: surname || '',
        };
    }

    const onLogout = () => {
        handleUserLogout();
        localStorage.clear(AUTH_TOKEN);
    };

    return (
        <>
            {!isAuth && <Redirect to="/" />}
            {isAuth && (
                <>
                    <Grid container className={classes.block}>
                        <Typography variant="h4">
                            <Box fontWeight="fontWeightBold">Profile</Box>
                        </Typography>
                    </Grid>
                    <Grid container className={classes.content}>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Grid item>
                                    <img
                                        alt="user avatar"
                                        src={user.avatar}
                                        className={classes.avatar}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">
                                        {`${user.name} ${user.surname}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Button
                            onClick={onLogout}
                            variant="contained"
                            size="large"
                            color="secondary"
                        >
                            Logout
                        </Button>
                    </Grid>
                </>
            )}
        </>
    );
}
