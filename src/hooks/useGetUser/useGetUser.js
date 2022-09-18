import { useEffect, useState } from 'react';

import { getUserByUserName } from '~/services/userService';

function useGetUser(userName) {
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchGetUserLogin = async (userName) => {
            const userData = await getUserByUserName(userName);
            setUser(userData);
        };
        fetchGetUserLogin(userName);
    }, [userName]);
    return user;
}

export default useGetUser;
