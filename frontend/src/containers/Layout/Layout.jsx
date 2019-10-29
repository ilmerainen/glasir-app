import React, { memo, useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RouteNameContext from 'context/routeNameContext';
import routes from 'constants/routes';
import useDataApi from 'hooks/useDataApi';
import SearchAppBar from 'components/SearchAppBar/SearchAppBar';
import ProductContainer from 'containers/ProductContainer/ProductContainer';
import Menu from 'containers/Menu/Menu';
import ProductList from 'containers/ProductList/ProductList';
import BagModal from 'containers/BagModal/BagModal';
import AppContext from 'context/AppContext';
import GoogleAuth from 'containers/GoogleAuth/GoogleAuth';
import SignIn from 'containers/SignIn/SignIn';
import Profile from 'containers/Profile/Profile';
import Checkout from 'containers/Checkout/Checkout';
import customizedTheme from './theme';
import useStyles from './styles';
import 'assets/css/App.css';
import 'assets/css/index.css';

const {
    CATEGORIES_ROUTE,
    PRODUCTS_ROUTE,
    PRODUCTS_BY_CATEGORY_ROUTE,
    SIGNIN_ROUTE,
    SIGNUP_ROUTE,
    PROFILE_ROUTE,
    CHECKOUT_ROUTE,
} = routes;

function Layout() {
    const classes = useStyles();
    const routeNameContext = useContext(RouteNameContext);
    const { bag, setBag } = useContext(AppContext);
    const [openBag, setOpenBag] = useState(false);
    const { isLoading, rawData } = useDataApi({
        url: `${CATEGORIES_ROUTE}`,
    });

    if (!isLoading && rawData) {
        const formated = rawData.reduce((prev, { id, name }) => {
            return {
                ...prev,
                [`${CATEGORIES_ROUTE}/${id}/products`]: name,
            };
        }, {});

        routeNameContext.addRoutes(formated);
    }

    const handleOpenBag = () => {
        setOpenBag(true);
    };

    const handleCloseBag = () => {
        setOpenBag(false);
    };

    const handleCancelItem = name => {
        setBag(prevBag => {
            const currentBag = { ...prevBag };

            delete currentBag[name];

            return currentBag;
        });
    };

    const setProductCount = name => ({ target }) => {
        const count = target.value > 1 ? target.value : 1;

        setBag(value => {
            const data = {
                ...value,
                [name]: {
                    ...value[name],
                    count,
                },
            };
            return data;
        });
    };

    return (
        <ThemeProvider theme={customizedTheme}>
            <BrowserRouter>
                {rawData && (
                    <Grid container className={classes.app}>
                        <Grid container direction="row">
                            <Grid item className={classes.menu}>
                                <Menu />
                            </Grid>
                            <Grid item className={classes.mainSection}>
                                <Grid item>
                                    <SearchAppBar
                                        handleOpenBag={handleOpenBag}
                                    />
                                </Grid>
                                <Container
                                    maxWidth="lg"
                                    className={classes.ProductContainer}
                                >
                                    <Grid item className={classes.block}>
                                        <Switch>
                                            <Route
                                                exact
                                                path={`${PRODUCTS_ROUTE}/:id`}
                                            >
                                                <ProductContainer
                                                    handleOpenBag={
                                                        handleOpenBag
                                                    }
                                                />
                                            </Route>
                                            <Route
                                                exact
                                                path="/categories/:id/products"
                                            >
                                                <ProductList />
                                            </Route>
                                            <Route exact path={SIGNUP_ROUTE}>
                                                <GoogleAuth />
                                            </Route>
                                            <Route exact path={SIGNIN_ROUTE}>
                                                <SignIn />
                                            </Route>
                                            <Route exact path={PROFILE_ROUTE}>
                                                <Profile />
                                            </Route>
                                            <Route exact path={CHECKOUT_ROUTE}>
                                                <Checkout />
                                            </Route>
                                        </Switch>
                                    </Grid>
                                </Container>
                            </Grid>
                        </Grid>
                        <CssBaseline />
                    </Grid>
                )}
                <BagModal
                    bag={bag}
                    open={openBag}
                    onClose={handleCloseBag}
                    setProductCount={setProductCount}
                    handleCancelItem={handleCancelItem}
                />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default memo(Layout);
