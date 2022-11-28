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
export const getChatByIdChat = async (idChat, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/chat/id/' + idChat, {
            headers: { token: `baerer ${accessToken}` },
        });

        return res.data;
    } catch (error) {
        return null;
    }
};
export const getInboxByIdFriend = async (idUser, idFriend, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/chat/idInbox', {
            params: {
                idUser: idUser,
                idFriend: idFriend,
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
export const getAllFileOfChat = async (idChat, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/chat/fileChat/' + idChat, {
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
export const removeChat = async (idChat, curUserId, accessToken, axiosJWT) => {
    try {
        console.log(curUserId);
        const res = await axiosJWT.put(
            '/chat/removeChat/' + idChat,
            {},
            {
                params: {
                    idCurUser: curUserId,
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
export const leaveChat = async (idChat, idUser, accessToken, axiosJWT) => {
    try {
        console.log(idUser);
        const res = await axiosJWT.put(
            '/chat/memberLeaveChat/' + idChat,
            {},
            {
                params: {
                    idUser: idUser,
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
export const changeNameChat = async (idChat, newNameChat, idUser, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put(
            '/chat/changeNameChat/' + idChat,
            {},
            {
                params: {
                    name: newNameChat,
                    idUser: idUser,
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
export const addGroupChat = async (newGroup, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post('/chat/', newGroup, {
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
