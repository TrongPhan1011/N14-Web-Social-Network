import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useMemo, useState } from 'react';

import SideBar from '~/components/SideBar';
import ContentChat from './ContentChat';
import { lcnImage } from '~/image';

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
            {!!showContent ? (
                <ContentChat currChat={curChat} />
            ) : (
                <div className={cx(' w-full h-full flex overflow-hidden ')}>
                    <img src={lcnImage.welcome} alt="chao mung ban" className="object-fit w-full h-full" />
                </div>
            )}
        </div>
    );
}

export default Home;
