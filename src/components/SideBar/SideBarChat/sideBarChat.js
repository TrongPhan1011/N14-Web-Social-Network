import classNames from 'classnames';
import { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';

import ItemChat from '~/components/ItemChat';
import { getChatByIdMember } from '~/services/chatService';
import { currentChat } from '~/redux/Slice/sidebarChatSlice';
import socket from '~/utils/getSocketIO';

const cx = classNames;

function SideBarChat() {
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    const userLoginData = useSelector((state) => state.persistedReducer.signIn.userLogin);

    const [chatResult, setChatResult] = useState([]);

    useEffect(() => {
        const fetchChat = async () => {
            const arrChat = await getChatByIdMember(userLoginData.id, currAccount.accessToken, axiosJWT);

            setChatResult(arrChat);
        };
        fetchChat();
    }, []);

    // khoi tao socket room
    const handdleConnectSocket = (item) => {
        socket.emit('sendMessage', { receiverId: item.id, contentMessage: null });
    };
    console.log(chatResult);

    const handleRenderChat = () => {
        if (chatResult.length > 0) {
            dispatch(currentChat(chatResult[0]));
            return chatResult.map((item) => {
                handdleConnectSocket(item);
                return <ItemChat key={item.id} groupChat={item} userLoginData={userLoginData} />;
            });
        } else return <></>;
    };

    return <div className={cx('p-2 h-full overflow-y-auto')}>{handleRenderChat()}</div>;
}

export default memo(SideBarChat);
