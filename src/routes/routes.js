import Home from '~/pages/Home';
import Friends from '~/pages/Friend';
import News from '~/pages/News';

import routeConfig from '~/configRoutes';

//public
const publicRoutes = [
    {
        path: routeConfig.routeConfig.home,
        component: Home,
    },
    {
        path: routeConfig.routeConfig.friends,
        component: Friends,
    },
    {
        path: routeConfig.routeConfig.news,
        component: News,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
