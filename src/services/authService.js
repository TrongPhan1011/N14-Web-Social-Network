import { loginSuccess, loginErorr } from '~/redux/Slice/authSlice';
import { userLogin } from '~/redux/Slice/signInSlice';
import * as httpRequest from '~/utils/httpRequest';

import config from '~/configRoutes';

export const loginUser = async (user, dispatch, navigate) => {
    try {
        const dataUser = await httpRequest.post('auth/login', user);

        if (!!dataUser) {
            dispatch(loginSuccess(dataUser)); // lưu lại user
            const dataUserLogin = await httpRequest.get('user/account/' + dataUser._id);
            dispatch(userLogin(dataUserLogin));

            navigate(config.routeConfig.home);
            return true;
        } else return false;
    } catch (error) {
        dispatch(loginErorr());
        return false;
    }
};
