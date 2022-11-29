import classNames from 'classnames';

import SideBar from '~/components/SideBar';
import ContentChat from './ContentChat';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';

import { useDispatch, useSelector } from 'react-redux';
import socket from '~/utils/getSocketIO';
import { useEffect, useMemo, useState } from 'react';

const cx = classNames;
function Home() {
    const [showContent, setShowContent] = useState(false);

    var curChat = useSelector((state) => state.sidebarChatSlice.currentChat);

    useMemo(() => {
        if (!!curChat) {
            setShowContent(true);
        }
    }, [curChat]);

    return (
        <div className={cx('flex h-screen overflow-hidden')}>
            <div className="w-[270px] h-screen  ">
                <SideBar />
            </div>
            {showContent && <ContentChat currChat={curChat} />}
        </div>
    );
}

export default Home;
