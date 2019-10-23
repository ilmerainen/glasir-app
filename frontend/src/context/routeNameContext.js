import React from 'react';
import routeNameMap from 'constants/routeNameMap';

const routesDef = {
    routes: {
        ...routeNameMap,
    },
    addRoutes(newRoutes) {
        this.routes = {
            ...this.routes,
            ...newRoutes,
        };
    },
};

const RouteNameContext = React.createContext(routesDef);

export default RouteNameContext;
