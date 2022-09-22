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

export const getUserById = async (id) => {
    try {
        const res = await httpRequest.get('user/', {
            params: {
                id: id,
            },
        });

        return res[0];
    } catch (error) {
        console.log('Người dùng không tồn tại!');
    }
};
