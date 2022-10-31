import { loginSuccess, loginErorr } from '~/redux/Slice/authSlice';
import { userLogin } from '~/redux/Slice/signInSlice';
import { userSignUp } from '~/redux/Slice/signUpSlice';
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

export const sendOTP = async (user, dispatch, navigate) => {
    try {
        const res = await httpRequest.post('otp/', user);
        console.log(res);
        dispatch(userSignUp(user));
        navigate(config.routeConfig.otp);
        return res;
    } catch (error) {
        return null;
    }
};
export const verifyOtp = async (user, navigate) => {
    try {
        const res = await httpRequest.get('otp/verify', {
            params: {
                email: user.userName,
                otp: user.otp,
            },
        });
        navigate(config.routeConfig.suaMatKhau);
        return res;
    } catch (error) {
        return null;
    }
};
export const register = async (user, navigate, dispatch) => {
    try {
        const res = await httpRequest.post('auth/register/', user);
        dispatch(userSignUp(null)); // xoa signIn

        if (!!res) {
            return { userName: user.userName, password: user.password };
        }
        // navigate(config.routeConfig.signIn);
        // return res;
    } catch (error) {
        return null;
    }
};
export const getAuthByMail = async (email) => {
    try {
        const res = await httpRequest.get('auth/getauthbymail', {
            params: {
                email: email,
            },
        });
        return res;
    } catch (error) {
        return null;
    }
};
export const updatePassword = async (user, dispatch, navigate) => {
    try {
        const dataUser = await httpRequest.put('auth/update', user);

        if (!!dataUser) {
            dispatch(userSignUp(null)); // lưu lại user trong redux
            navigate(config.routeConfig.signIn);
            return true;
        } else return false;
    } catch (error) {
        dispatch(loginErorr());
        return false;
    }
};
