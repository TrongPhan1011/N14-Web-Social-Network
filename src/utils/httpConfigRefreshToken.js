import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getRefreshToken } from '~/services/authService';

import { loginSuccess } from '~/redux/Slice/authSlice';

export const getAxiosJWT = (dispatch, currAccount) => {
    axios.defaults.withCredentials = true;
    var axiosJWT = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
    });
    var token = currAccount.accessToken;
    axiosJWT.interceptors.request.use(
        async (config) => {
            var currDate = new Date();
            var decodeToken = jwtDecode(token);
            if (decodeToken.exp < currDate.getTime() / 1000) {
                var newToken = await getRefreshToken();
                var refreshUser = {
                    ...currAccount,
                    accessToken: newToken.accessToken,
                };
                dispatch(loginSuccess(refreshUser));
                config.headers['token'] = 'baerer ' + newToken.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    );
    return axiosJWT;
};
