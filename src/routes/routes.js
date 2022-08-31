import Home from '~/pages/Home';

import routeConfig from '~/configRoutes';

//public
const publicRoutes = [
    {
        path: routeConfig.routeConfig.home,
        component: Home,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
