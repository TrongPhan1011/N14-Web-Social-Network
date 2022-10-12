import { loginSuccess, loginErorr } from '~/redux/Slice/authSlice';
import { userLogin } from '~/redux/Slice/signInSlice';
import { logOutSuccess } from '~/redux/Slice/authSlice';
import * as httpRequest from '~/utils/httpRequest';
import config from '~/configRoutes';

export const loginUser = async (user, dispatch, navigate) => {
    try {
        const dataUser = await httpRequest.post('auth/login', user);

        if (!!dataUser) {
            dispatch(loginSuccess(dataUser)); // lưu lại user trong redux
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
export const getRefreshToken = async () => {
    try {
        const res = await httpRequest.post('auth/refresh', {
            withCredentials: true,
        });
        return res;
    } catch (error) {
        return null;
    }
};
export const logout = async (dispatch, navigate, accessToken, axiosJWT) => {
    try {
        await axiosJWT.post(
            'auth/logout',
            { logout: '' },
            {
                headers: { token: `baerer ${accessToken}` },
            },
        );

        dispatch(userLogin(null)); // xoa signIn
        dispatch(logOutSuccess()); // xoa Account
        navigate(config.routeConfig.signIn);
    } catch (error) {
        return null;
    }
};
