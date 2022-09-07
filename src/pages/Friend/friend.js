import classNames from 'classnames/bind';

import styles from './Friends.module.scss';
import SideBar from '~/components/SideBar';
import ContentFriend from './ContentFriend';

const cx = classNames.bind(styles);

function Friends() {
    return (
        <div className={cx('flex overflow-hidden')}>
            <div className={cx('w-[270px] h-screen')}>
                <SideBar type="friend" />
            </div>
            <ContentFriend />
        </div>
    );
}

export default Friends;
