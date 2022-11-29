export const getMessageById = async (idMessage, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/message/id/' + idMessage, {
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        return null;
    }
};
export const getMessageByIdChat = async (idChat, limit, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/message/limit', {
            params: {
                limit: limit,
                idchat: idChat,
            },
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        return null;
    }
};
export const getMessageFileByIdChat = async (idChat, limit, skip, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/message/mess_file', {
            params: {
                limit: limit,
                skip: skip,
                idchat: idChat,
            },
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        return null;
    }
};

export const addUserSeenToMess = async (idMess, data, accessToken, axiosJWT) => {
    try {
        await axiosJWT.put(`/message/add_seen/${idMess}`, data, {
            headers: { token: `baerer ${accessToken}` },
        });

        return true;
    } catch (error) {
        console.log('Người dùng không tồn tại!');
    }
};
export const addReaction = async (data, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put(`/message/add_reaction`, data, {
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log('Người dùng không tồn tại!');
        return false;
    }
};

export const addMess = async (data, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(`/message/`, data, {
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        console.log('Luu tin nhan khong thanh cong');
    }
};

export const removeMessWithUser = async (idMess, accessToken, axiosJWT) => {
    try {
        await axiosJWT.put(
            `/message/delete_with_user/${idMess}`,
            {},
            {
                headers: { token: `baerer ${accessToken}` },
            },
        );

        return true;
    } catch (error) {
        console.log('Xoa tin nhan khong thanh cong');
    }
};
export const removeMessWithEveryone = async (idChat, idMess, accessToken, axiosJWT) => {
    try {
        await axiosJWT.put(
            `/message/delete_with_everyone/${idChat}/${idMess}`,
            {},
            {
                headers: { token: `baerer ${accessToken}` },
            },
        );

        return true;
    } catch (error) {
        return false;
    }
};
