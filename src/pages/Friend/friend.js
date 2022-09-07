import classNames from 'classnames/bind';

import styles from './Friends.module.scss';
import SideBar from '~/components/SideBar';
import ContentFriend from './ContentFriend';
import routeConfig from '~/configRoutes';
import ContentProfile from './ContentProfile';

const cx = classNames.bind(styles);

function Friends() {
    var urlRoute = window.location.pathname;
    console.log(routeConfig.routeConfig.profile);

    const showContent = () => {
        if (urlRoute === routeConfig.routeConfig.profile) return <ContentProfile />;
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
