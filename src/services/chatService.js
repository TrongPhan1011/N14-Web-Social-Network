import * as httpRequest from '~/utils/httpRequest';

export const getChatByIdMember = async (idMember, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/chat/user_id', {
            params: {
                id: idMember,
            },
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        return null;
    }
};

export const addUserSeenToMess = async (idGroupChat, data) => {
    try {
        await httpRequest.put(`groupchat/${idGroupChat}`, data);

        return true;
    } catch (error) {
        console.log('Người dùng không tồn tại!');
    }
};
