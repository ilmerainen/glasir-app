import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import '../../assets/css/App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    createMuiTheme,
    makeStyles,
    MuiThemeProvider as ThemeProvider,
} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import { Typography } from '@material-ui/core';
import Menu from '../Menu/Menu';
import { CATEGORIES_ROUTE, MENU_ITEMS } from '../../constants/constants';
import useDataApi from '../../utils/hooks/useDataApi';
import '../../assets/css/index.css';
import Breadcrumbs from '../../components/BreadcrumbsComponent';
import SearchAppBar from '../../components/SearchAppBar';

const customizedTheme = createMuiTheme({
    palette: {
        primary: grey,
        secondary: red,
    },
});

const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2),
    },
    loadingGrid: {
        height: '100vh',
    },
    app: {
        height: '100%',
        width: '100%',
    },
    content: {
        width: 'calc(100% - 280px)',
    },
    menu: {
        height: '100vh',
        width: '280px',
    },
    breadcrumbs: {},
}));

function Layout() {
    const classes = useStyles();
    const [data, menuIsLoading, menuErrorMsg] = useDataApi({
        url: `${CATEGORIES_ROUTE}`,
        initData: null,
    });
    let routeCategoryItemMap;
    let routeMenuItemMap = {
        ...MENU_ITEMS,
    };

    if (data) {
        routeCategoryItemMap = data.reduce((prev, { name }) => {
            const currentObj = { ...prev };
            let formated = name
                .replace(/[^a-zA-Z\d]+(?=\w)/g, '_')
                .toLowerCase();
            formated = `/${formated}`;
            const route = `/categories${formated}`;
            currentObj[route] = name;
            return currentObj;
        }, {});

        routeMenuItemMap = {
            ...routeMenuItemMap,
            ...routeCategoryItemMap,
        };
    }

    return (
        <ThemeProvider theme={customizedTheme}>
            <Grid container className={classes.app}>
                {menuIsLoading && (
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className={classes.loadingGrid}
                    >
                        <CircularProgress className={classes.progress} />
                    </Grid>
                )}
                {menuErrorMsg && (
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justify="center"
                        className={classes.error}
                    >
                        <Typography variant="h2" color="error">
                            Error...
                        </Typography>
                        <Typography variant="h4">{menuErrorMsg}</Typography>
                    </Grid>
                )}
                {!menuIsLoading && data && (
                    <>
                        <Grid container direction="row">
                            <Grid item className={classes.menu}>
                                <Menu
                                    routeCategoryItemMap={routeCategoryItemMap}
                                />
                            </Grid>
                            <Grid item className={classes.content}>
                                <Grid item>
                                    <SearchAppBar />
                                </Grid>
                                <Grid
                                    container
                                    item
                                    className={classes.breadcrumbs}
                                >
                                    <Breadcrumbs
                                        className={classes.breadcrumbs}
                                        routeItemMap={{ ...routeMenuItemMap }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                )}
                <CssBaseline />
            </Grid>
        </ThemeProvider>
    );
}

export default Layout;
