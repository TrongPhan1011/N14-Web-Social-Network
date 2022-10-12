import * as httpRequest from '~/utils/httpRequest';

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
export const getUserById = async (idUser, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get(`user/id/${idUser}`, {
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
