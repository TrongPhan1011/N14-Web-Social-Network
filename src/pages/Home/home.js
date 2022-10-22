import classNames from 'classnames';

import SideBar from '~/components/SideBar';
import ContentChat from './ContentChat';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';

import { useDispatch, useSelector } from 'react-redux';
import socket from '~/utils/getSocketIO';
import { useEffect } from 'react';

const cx = classNames;
function Home() {
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;

    useEffect(() => {
        socket.emit('addUserSocket', currAccount._id);
    }, [currAccount]);

    return (
        <div className={cx('flex h-screen overflow-hidden')}>
            <div className="w-[270px] h-screen  ">
                <SideBar />
            </div>
            <ContentChat />
        </div>
    );
}

export default Home;
