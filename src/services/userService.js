import * as httpRequest from '~/utils/httpRequest';
import { userLogin } from '~/redux/Slice/signInSlice';
import { Navigate } from 'react-router-dom';

export const getUserByUserName = async (userName) => {
    try {
        const res = await httpRequest.get('user/', {
            params: {
                phoneNumber: userName,
            },
        });

        return res[0];
    } catch (error) {
        console.log('Người dùng không tồn tại!');
    }
};
export const getUserByTextSearch = async (searchValue, limit) => {
    try {
        const res = await httpRequest.get('user/', {
            params: {
                q: searchValue,
                _limit: limit,
            },
        });

        return res;
    } catch (error) {
        console.log('Người dùng không tồn tại!');
    }
};
export const getUserById = async (idUser, accessToken, axiosJWT, dispatch) => {
    try {
        const res = await axiosJWT.get(`user/id/${idUser}`, {
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAllFriend = async (idUser, accessToken, axiosJWT, status = 1) => {
    try {
        const res = await axiosJWT.get(`user/friend/${idUser}?status=1`, {
            params: {
                status: status,
            },
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getWaitingFriend = async (idUser, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get(`user/friend/${idUser}?status=2`, {
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const acceptFriend = async (idUser, idFriend, accessToken, axiosJWT, dispatch) => {
    try {
        const res = await axiosJWT.put(
            'user/acceptfriend/',
            {
                idFriend: idFriend,
                idUser: idUser,
            },
            {
                headers: { token: `baerer ${accessToken}` },
            },
        );
        const dataUserLogin = await axiosJWT.get(`user/id/${idUser}`, {
            headers: { token: `baerer ${accessToken}` },
        });

        dispatch(userLogin(dataUserLogin.data));

        return res;
    } catch (error) {
        console.log(error);
    }
};
export const declineFriend = async (idUser, idFriend, accessToken, axiosJWT, dispatch) => {
    try {
        const res = await axiosJWT.put(
            'user/deletefriend/',
            {
                idFriend: idFriend,
                idUser: idUser,
            },
            {
                headers: { token: `baerer ${accessToken}` },
            },
        );
        const dataUserLogin = await axiosJWT.get(`user/id/${idUser}`, {
            headers: { token: `baerer ${accessToken}` },
        });

        dispatch(userLogin(dataUserLogin.data));
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addFriend = async (idUser, idFriend, accessToken, axiosJWT, dispatch) => {
    try {
        const res = await axiosJWT.put(
            'user/addfriend/',
            {
                idFriend: idFriend,
                idUser: idUser,
            },
            {
                headers: { token: `baerer ${accessToken}` },
            },
        );
        const dataUserLogin = await axiosJWT.get(`user/id/${idUser}`, {
            headers: { token: `baerer ${accessToken}` },
        });

        dispatch(userLogin(dataUserLogin.data));
        return res;
    } catch (error) {
        console.log(error);
    }
};
