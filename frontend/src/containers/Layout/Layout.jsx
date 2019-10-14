import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles';

import 'assets/css/App.css';
import 'assets/css/index.css';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import SearchAppBar from 'components/SearchAppBar/SearchAppBar';
import Menu from 'containers/Menu/Menu';
import useStyles from './styles.js';
import customizedTheme from './theme';

function Layout() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={customizedTheme}>
            <Grid container className={classes.app}>
                <Grid container direction="row">
                    <Grid item className={classes.menu}>
                        <Menu />
                    </Grid>
                    <Grid item className={classes.content}>
                        <Grid item>
                            <SearchAppBar />
                        </Grid>
                        <Grid container item className={classes.breadcrumbs}>
                            <Breadcrumbs className={classes.breadcrumbs} />
                        </Grid>
                    </Grid>
                </Grid>
                <CssBaseline />
            </Grid>
        </ThemeProvider>
    );
}

export default memo(Layout);
