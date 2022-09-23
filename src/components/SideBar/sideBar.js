import classNames from 'classnames';
import PropTypes from 'prop-types';
import { memo } from 'react';

import SideBarChat from './SideBarChat';
import SideBarFriend from './SideBarFriend';
import Search from '../Search';
import SideBarNews from './SideBarNews';
import SideBarSetting from './SideBarSetting';

const cx = classNames;
function SideBar({ children, type }) {
    var Comp = SideBarChat;
    var HeaderSideBar = true;

    if (type === 'friend') {
        Comp = SideBarFriend;
    } else if (type === 'profile') {
        Comp = SideBarNews;
    } else if (type === 'setting') {
        Comp = SideBarSetting;
        HeaderSideBar = false;
    }

    return (
        <div className={cx('w-full h-full border-l border-r border-lcn-blue-3')}>
            <div className="w-full h-20 ">{HeaderSideBar ? <Search /> : <></>}</div>
            <div className={cx('h-full ')}>
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
