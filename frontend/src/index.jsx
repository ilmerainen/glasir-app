import React from 'react';
import ReactDOM from 'react-dom';
import '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import * as serviceWorker from 'src/serviceWorker.js';
import 'assets/css/index.css';
import Layout from 'containers/Layout/Layout';
import { RouteNameContext } from 'src/context.js';
import useDataApi from 'hooks/useDataApi';
import { ROUTE_NAME_MAP } from 'constants/routeNameMap';
import { CATEGORIES_ROUTE } from 'constants/routes';

function App() {
    const [categoriesData, doFetch] = useDataApi({
        url: `${CATEGORIES_ROUTE}`,
    });

    const categories = categoriesData.data ? categoriesData.data.hits : null;
    let routes = [];
    let routeNameMap;

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

        routes = routes.concat(Object.keys(routeNameMap));
        routes = routes.map(route => {
            const regex = /.\/$/;
            const exact = regex.test(route) ? true : null;
            const routeComponent = (
                <Route exact path={route} key={route}>
                    <Layout />
                </Route>
            );

            return routeComponent;
        });
    }

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <RouteNameContext.Provider value={routeNameMap}>
                        {routes}
                    </RouteNameContext.Provider>
                </Switch>
            </BrowserRouter>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
