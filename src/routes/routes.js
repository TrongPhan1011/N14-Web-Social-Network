import { LoginLayout } from '~/layout';

import Home from '~/pages/Home';
import Friends from '~/pages/Friend';
import News from '~/pages/News';
import SignUp from '~/pages/SignUp';
import Setting from '~/pages/Setting';
import routeConfig from '~/configRoutes';
import SignIn from '~/pages/SignIn';
import Otp from '~/pages/Otp';
import QuenMatKhau from '~/pages/QuenMatKhau';
import SuaMatKhau from '~/pages/SuaMatKhau';
import Call from '~/pages/Call';
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
        layout: LoginLayout,
    },
    {
        path: routeConfig.routeConfig.signIn,
        component: SignIn,
        layout: LoginLayout,
    },
    {
        path: routeConfig.routeConfig.otp,
        component: Otp,
        layout: LoginLayout,
    },
    {
        path: routeConfig.routeConfig.quenMatKhau,
        component: QuenMatKhau,
        layout: LoginLayout,
    },
    {
        path: routeConfig.routeConfig.suaMatKhau,
        component: SuaMatKhau,
        layout: LoginLayout,
    },
    {
        path: routeConfig.routeConfig.profile,
        component: Friends,
    },
    {
        path: routeConfig.routeConfig.setting,
        component: Setting,
    },
    {
        path: routeConfig.routeConfig.thongTinChung,
        component: Setting,
    },
    {
        path: routeConfig.routeConfig.doiMatKhau,
        component: Setting,
    },
    {
        path: routeConfig.routeConfig.chan,
        component: Setting,
    },
    {
        path: routeConfig.routeConfig.call,
        component: Call,
        layout: null,
    },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
