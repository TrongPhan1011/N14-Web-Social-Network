import * as httpRequest from '~/utils/httpRequest';

export const getMessageById = async (idMessage) => {
    try {
        const res = await httpRequest.get('/message/id/' + idMessage);

        return res;
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
