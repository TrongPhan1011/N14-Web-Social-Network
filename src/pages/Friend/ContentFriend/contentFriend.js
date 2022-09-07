import classNames from 'classnames/bind';

import styles from './ContentFriend.module.scss';
import { lcnImage } from '~/image';
import ExportConnectFriendSVG from './exportConnectFriend';

const cx = classNames.bind(styles);

function ContentFriend() {
    return (
        <div
            className={cx(
                ' w-full h-full relative flex overflow-hidden justify-center items-center',
                'bg-content-friend',
            )}
        >
            <div className={cx(' w-full h-screen flex  justify-center items-center ')}>
                <img src={lcnImage.connectCircle} alt="bg" className={cx('w-full h-full ', 'fade')} />
            </div>
            <div className={cx(' w-1/2 absolute', 'fade')}>
                <ExportConnectFriendSVG />
            </div>
        </div>
    );
}

export default ContentFriend;
