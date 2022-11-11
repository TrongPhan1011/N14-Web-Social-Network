import { useState, useEffect, memo } from 'react';

import { useSelector } from 'react-redux';
import classNames from 'classnames';

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
    const [count, setCount] = useState(0);
    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;

    useEffect(() => {
        setCount(0);
        for (var i = 0; i <= curUser.friend.length; i++) {
            if (curUser.friend[i]?.status === 1) {
                setCount((prev) => prev + 1);
            }
        }
    }, [curUser]);

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
                <SideBar type="friend" count={count} />
            </div>
            {showContent()}
        </div>
    );
}

export default memo(Friends);
