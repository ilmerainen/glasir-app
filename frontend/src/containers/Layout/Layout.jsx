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
import BagContext from 'context/bagContext';
import customizedTheme from './theme';
import useStyles from './styles';
import 'assets/css/App.css';
import 'assets/css/index.css';

const { CATEGORIES_ROUTE, PRODUCTS_ROUTE, PRODUCTS_BY_CATEGORY_ROUTE } = routes;

function Layout() {
    const classes = useStyles();
    const routeNameContext = useContext(RouteNameContext);
    const { bag, setBag } = useContext(BagContext);
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

    const handleCancelItem = name => () => {
        setBag(prevBag => {
            const currentBag = { ...prevBag };

            delete currentBag[name];

            return currentBag;
        });
    };

    const setProductCount = name => ({ target }) => {
        const count = target.value > 1 ? target.value : 1;

        setBag(value => ({
            ...value,
            [name]: {
                ...value[name],
                count,
            },
        }));
    };

    const handleCloseBag = () => {
        setOpenBag(false);
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
                                    <SearchAppBar setOpenBag={setOpenBag} />
                                </Grid>
                                <Container
                                    maxWidth="lg"
                                    className={classes.ProductContainer}
                                >
                                    <Grid
                                        container
                                        className={`${classes.breadcrumbs} ${classes.block}`}
                                    ></Grid>
                                    <Grid item className={classes.block}>
                                        <Switch>
                                            <Route
                                                exact
                                                path={`${PRODUCTS_ROUTE}/:id`}
                                            >
                                                <ProductContainer
                                                    setOpenBag={setOpenBag}
                                                />
                                            </Route>
                                            <Route
                                                exact
                                                path={`${PRODUCTS_BY_CATEGORY_ROUTE}`}
                                            >
                                                <ProductList />
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
