import classNames from 'classnames/bind';
import styles from './Friends.module.scss';
import SideBar from '~/components/SideBar';

const cx = classNames.bind(styles);

function Friends() {
    return (
        <div className={cx('flex')}>
            <div className={cx('w-[270px] h-screen')}>
                <SideBar type="friend" />
            </div>
            <div>friend</div>
        </div>
    );
}

export default Friends;
