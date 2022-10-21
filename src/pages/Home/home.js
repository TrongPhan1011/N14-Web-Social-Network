import classNames from 'classnames';

import SideBar from '~/components/SideBar';
import ContentChat from './ContentChat';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserById } from '~/services/userService';

const cx = classNames;
function Home() {
    // const dispatch = useDispatch();
    // var currAuth = useSelector((state) => state.persistedReducer.auth);
    // var currAccount = currAuth.currentUser;
    // var axiosJWT = getAxiosJWT(dispatch, currAccount);

    // useEffect(() => {
    //     const getUser = async () => {
    //         var user = await getUserById('633cf97fb4ca527f2a25f670', currAccount.accessToken, axiosJWT);
    //         console.log(user);
    //     };
    //     getUser();
    // }, []);
    return (
        <div className={cx('flex h-screen overflow-hidden')}>
            <div className="w-[270px] h-screen  ">
                <SideBar />
            </div>
            <ContentChat />
        </div>
    );
}

export default Home;
