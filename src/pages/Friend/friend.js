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
    let query = useQuery();
    var id = query.get('id');

    var urlRoute = window.location.pathname;

    const showContent = () => {
        if (urlRoute === routeConfig.routeConfig.profile) return <ContentProfile userId={id} />;
        else return <ContentFriend />;
    };

    return (
        <div className={cx('flex overflow-hidden')}>
            <div className={cx('w-[270px] h-screen')}>
                <SideBar type="friend" />
            </div>
            {showContent()}
        </div>
    );
}

export default Friends;
