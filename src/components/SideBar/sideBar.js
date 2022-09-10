import classNames from 'classnames';
import PropTypes from 'prop-types';
import { memo } from 'react';

import SideBarChat from './SideBarChat';
import SideBarFriend from './SideBarFriend';
import Search from '../Search';
import SideBarNews from './SideBarNews';

const cx = classNames;
function SideBar({ children, type }) {
    var Comp = SideBarChat;

    if (type === 'friend') {
        Comp = SideBarFriend;
    } else if (type === 'profile') {
        Comp = SideBarNews;
    }
    return (
        <div className={cx('w-full h-full overflow-hidden border-l border-r border-lcn-blue-3')}>
            <div className="w-full h-20 ">
                <Search />
            </div>
            <div className={cx('h-full overflow-hidden ')}>
                <Comp>{children}</Comp>
            </div>
        </div>
    );
}

SideBar.propTypes = {
    type: PropTypes.string,
    children: PropTypes.node,
};

export default memo(SideBar);
