import { useSelector } from 'react-redux';
import classNames from 'classnames';

import SideBar from '~/components/SideBar';
import ContentFriend from './ContentFriend';
import routeConfig from '~/configRoutes';
import ContentProfile from './ContentProfile';

const cx = classNames;

function Friends() {
    const userLoginData = useSelector((state) => state.persistedReducer.signIn.userLogin);

    var urlRoute = window.location.pathname;
    console.log(routeConfig.routeConfig.profile);

    const showContent = () => {
        if (urlRoute === routeConfig.routeConfig.profile) return <ContentProfile />;
        else return <ContentFriend />;
    };

    return (
        <div className={cx('flex overflow-hidden')}>
            <div className={cx('w-[270px] h-screen')}>
                <SideBar type="friend" userLoginData={userLoginData} />
            </div>
            {showContent()}
        </div>
    );
}

export default Friends;
