import classNames from 'classnames';
import { useEffect, useState, memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';

import ItemChat from '~/components/ItemChat';
import { getChatByIdMember } from '~/services/chatService';
import { currentChat } from '~/redux/Slice/sidebarChatSlice';
import socket from '~/utils/getSocketIO';
import { getChatByIdChat } from '~/services/chatService';

const cx = classNames;

function SideBarChat() {
    const dispatch = useDispatch();

    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var currChat = useSelector((state) => state.sidebarChatSlice.currentChat);
    var axiosJWT = getAxiosJWT(dispatch, currAccount);
    const userLoginData = useSelector((state) => state.persistedReducer.signIn.userLogin);

    const [chatResult, setChatResult] = useState([]);
    const [reRender, setReRender] = useState(true);
    const [newMessReceive, setNewMessReceive] = useState(null);

    useMemo(() => {
        socket.on('getMessage', (data) => {
            if (!!data) {
                setNewMessReceive(data);
            }
        });
        socket.on('getChatRemoved', (data) => {
            if (!!data) {
                setReRender(true);
                dispatch(currentChat(null));
            }
        });
    }, [socket, currChat]);

    useMemo(() => {
        const resetGroupChat = async () => {
            if (!!currChat) {
                if (newMessReceive.title.includes('đã rời nhóm')) {
                } else {
                    var newCurChat = await getChatByIdChat(currChat.id, currAccount.accessToken, axiosJWT);
                    if (!!newCurChat) {
                        dispatch(currentChat(newCurChat));
                    } else dispatch(currentChat(null));
                }
            }
        };
        if (!!newMessReceive) {
            if (newMessReceive.type_mess === 'system') {
                resetGroupChat();
            }
            setReRender(true);
        }
    }, [newMessReceive]);

    useEffect(() => {
        const fetchChat = async () => {
            if (reRender) {
                const arrChat = await getChatByIdMember(userLoginData.id, currAccount.accessToken, axiosJWT);
                if (!!arrChat) {
                    setChatResult(arrChat);

                    setReRender(false);
                }
            }
        };
        fetchChat();
    }, [userLoginData, reRender]);

    // khoi tao socket room
    const handdleConnectSocket = (item) => {
        socket.emit('sendMessage', { receiverId: item.id, contentMessage: null });
    };

    var handleRenderChat = () => {
        if (chatResult.length > 0) {
            chatResult.sort((item1, item2) => item2.updatedAt.localeCompare(item1.updatedAt));
            if (currChat === null) {
                dispatch(currentChat(chatResult[0]));
            }

            return chatResult.map((item) => {
                handdleConnectSocket(item);
                return <ItemChat key={item.id} groupChat={item} userLoginData={userLoginData} />;
            });
        } else return <></>;
    };

    return <div className={cx('p-2 h-full overflow-y-auto')}>{handleRenderChat()}</div>;
}

export default memo(SideBarChat);
