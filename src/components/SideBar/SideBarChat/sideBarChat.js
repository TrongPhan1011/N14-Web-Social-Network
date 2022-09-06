import classNames from 'classnames/bind';

import styles from './SideBarChat.module.scss';
import ItemChat from '~/components/ItemChat';

const cx = classNames.bind(styles);

function SideBarChat() {
    return (
        <div className={cx('p-2 h-screen overflow-y-scroll')}>
            <ItemChat />
            <ItemChat />
            <ItemChat />
            <ItemChat />
            <ItemChat />
            <ItemChat />
            <ItemChat />
            <ItemChat />
            <ItemChat />
            <ItemChat />
            <ItemChat />
            <ItemChat />
        </div>
    );
}

export default SideBarChat;
