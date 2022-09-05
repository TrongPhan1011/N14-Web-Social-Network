import {LoginLayout} from '~/layout'

import Home from '~/pages/Home';
import Friends from '~/pages/Friend';
import News from '~/pages/News';
import SignUp from '~/pages/SignUp';

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
    {
        path: routeConfig.routeConfig.signUp,
        component: SignUp,
        layout: LoginLayout
    }
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
