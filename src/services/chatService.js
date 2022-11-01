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
