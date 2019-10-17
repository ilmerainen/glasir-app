import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'assets/css/App.css';
import 'assets/css/index.css';
import { RouteNameContext } from 'src/context';
import { CATEGORIES_ROUTE } from 'constants/routes';
import { ROUTE_NAME_MAP } from 'constants/routeNameMap';
import useDataApi from 'hooks/useDataApi';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import SearchAppBar from 'components/SearchAppBar/SearchAppBar';
import Menu from 'containers/Menu/Menu';
import ProductContainer from 'containers/ProductContainer/ProductContainer';
import useStyles from './styles';
import customizedTheme from './theme';

function Layout() {
    const classes = useStyles();

    const [categoriesData, doFetch] = useDataApi({
        url: `${CATEGORIES_ROUTE}`,
    });

    const categories = categoriesData.data ? categoriesData.data.hits : null;
    const { isLoading } = categoriesData; // && ... further data loading
    let routeNameMap;
    let categoriesRoutes;

    if (categories) {
        const formated = categories.reduce((prev, { id, name }) => {
            return {
                ...prev,
                [`${CATEGORIES_ROUTE}/${id}`]: name,
            };
        }, {});

        routeNameMap = {
            ...ROUTE_NAME_MAP,
            ...formated,
        };

        categoriesRoutes = categories.map(({ id }) => {
            const route = `/categories/${id}`;
            const routeComponent = (
                <Route
                    exact
                    path={route}
                    key={id}
                    render={({ location }) => (
                        <ProductContainer
                            name={routeNameMap[route]}
                            location={location}
                        />
                    )}
                />
            );

            return routeComponent;
        });
    }

    return (
        <ThemeProvider theme={customizedTheme}>
            <RouteNameContext.Provider value={routeNameMap}>
                <BrowserRouter>
                    {!isLoading && categories && (
                        <Grid container className={classes.app}>
                            <Grid container direction="row">
                                <Grid item className={classes.menu}>
                                    <Menu />
                                </Grid>
                                <Grid item className={classes.mainSection}>
                                    <Grid item>
                                        <SearchAppBar />
                                    </Grid>
                                    <Container
                                        maxWidth="lg"
                                        className={classes.ProductContainer}
                                    >
                                        <Grid
                                            container
                                            className={`${classes.breadcrumbs} ${classes.block}`}
                                        >
                                            <Breadcrumbs
                                                className={classes.breadcrumbs}
                                            />
                                        </Grid>
                                        <Grid item className={classes.block}>
                                            <Switch>{categoriesRoutes}</Switch>
                                        </Grid>
                                    </Container>
                                </Grid>
                            </Grid>
                            <CssBaseline />
                        </Grid>
                    )}
                </BrowserRouter>
            </RouteNameContext.Provider>
        </ThemeProvider>
    );
}

export default memo(Layout);
