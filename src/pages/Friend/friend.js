import { useState, useEffect, memo } from 'react';

import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { getUserById } from '~/services/userService';
import { useDispatch } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import SideBar from '~/components/SideBar';
import ContentFriend from './ContentFriend';
import routeConfig from '~/configRoutes';
import ContentProfile from './ContentProfile';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const cx = classNames;
function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}
function Friends() {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const [countWaiting, setCountWaiting] = useState(0);
    const [userProfile, setUserProfile] = useState({});

    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    useEffect(() => {
        setCount(0);
        setCountWaiting(0);
        for (var i = 0; i <= curUser.friend.length; i++) {
            if (curUser.friend[i]?.status === 1) {
                setCount((prev) => prev + 1);
            }
            if (curUser.friend[i]?.status === 0) {
                setCountWaiting((prevWaiting) => prevWaiting + 1);
            }
        }
    }, [curUser.friend]);
    useEffect(() => {
        const getProfile = async () => {
            const getUserProfile = await getUserById(curUser.id, curUser.id, accessToken, axiosJWT, dispatch);
            setUserProfile(getUserProfile);
        };
        getProfile();
    }, []);
    let query = useQuery();
    var id = query.get('id');

    var urlRoute = window.location.pathname;

    const showContent = () => {
        if (urlRoute === routeConfig.routeConfig.profile) return <ContentProfile userId={id} count={count} />;
        else return <ContentFriend />;
    };

    return (
        <div className={cx('flex overflow-hidden')}>
            <div className={cx('w-[270px] h-screen')}>
                <SideBar type="friend" count={count} countWaiting={countWaiting} />
            </div>
            {showContent()}
        </div>
    );
}

export default memo(Friends);
