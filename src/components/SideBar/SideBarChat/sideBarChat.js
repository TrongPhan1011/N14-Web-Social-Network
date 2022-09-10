import classNames from 'classnames';

import ItemChat from '~/components/ItemChat';

const cx = classNames;

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
