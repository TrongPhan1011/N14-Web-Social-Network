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
export const getMemberOfChat = async (idChat, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/chat/member', {
            params: {
                idChat: idChat,
            },
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        return null;
    }
};
export const getMemberRequest = async (idChat, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/chat/memberWaiting', {
            params: {
                idChat: idChat,
            },
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        return null;
    }
};
export const addMemberToChat = async (idChat, arrMember, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put('/chat/member/' + idChat, arrMember, {
            headers: { token: `baerer ${accessToken}` },
        });
        if (!!res) {
            return res.data;
        }
        return null;
    } catch (error) {
        return null;
    }
};
export const requestMemberChat = async (idChat, arrMember, action, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put('/chat/requestMember/' + idChat, arrMember, {
            params: {
                action: action,
            },
            headers: { token: `baerer ${accessToken}` },
        });
        if (!!res) {
            return res.data;
        }
        return null;
    } catch (error) {
        return null;
    }
};
export const removeMemberChat = async (idChat, arrMember, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put('/chat/removeMember/' + idChat, arrMember, {
            headers: { token: `baerer ${accessToken}` },
        });
        if (!!res) {
            return res.data;
        }
        return null;
    } catch (error) {
        return null;
    }
};
export const addAdminToChat = async (idChat, arrAdmin, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put('/chat/admin/' + idChat, arrAdmin, {
            headers: { token: `baerer ${accessToken}` },
        });
        if (!!res) {
            return res.data;
        }
        return null;
    } catch (error) {
        return null;
    }
};
export const changeStatusChat = async (idChat, status, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put(
            '/chat/status/' + idChat,
            {},
            {
                params: {
                    status: status,
                },
                headers: { token: `baerer ${accessToken}` },
            },
        );
        if (!!res) {
            return res.data;
        }
        return null;
    } catch (error) {
        return null;
    }
};
