import * as httpRequest from '~/utils/httpRequest';

export const getChatByIdMember = async (idMember) => {
    try {
        const res = await httpRequest.get('groupchat/', {
            params: {
                member_like: idMember,
            },
        });

        return res;
    } catch (error) {
        console.log('Tin nhắn không tồn tại!');
    }
};

export const addUserSeenToMess = async (idGroupChat, data) => {
    try {
        const res = await httpRequest.put(`groupchat/${idGroupChat}`, data);

        return true;
    } catch (error) {
        console.log('Người dùng không tồn tại!');
    }
};
