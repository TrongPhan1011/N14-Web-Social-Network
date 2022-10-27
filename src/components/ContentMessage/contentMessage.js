import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import ItemMessage from '~/components/ItemMessage';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import Avartar from '~/components/Avartar';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { getMessageByIdChat } from '~/services/messageService';
import socket from '~/utils/getSocketIO';

const cx = classNames;

function ContentMessage() {
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    var curChat = useSelector((state) => state.sidebarChatSlice.currentChat);

    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;

    const [listMessage, setListMessage] = useState([]);
    const [limitMessage, setLimitMessage] = useState(30);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const bottomRef = useRef();

    useEffect(() => {
        socket.on('getMessage', (data) => {
            if (!!data) {
                var getNewMess = {
                    id: data.id,
                    title: data.title,
                    authorID: data.authorID,
                    seen: data.seen,
                    type_mess: data.type,
                    idChat: data.idChat,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                };
                setArrivalMessage(getNewMess);
            }
        });
    }, []);
    useEffect(() => {
        const scrollToBottom = () => {
            if (listMessage.length > 0) {
                bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        };
        scrollToBottom();
    }, [listMessage]);

    useEffect(() => {
        const getListMessage = async () => {
            const listMess = await getMessageByIdChat(curChat?.id, limitMessage, accessToken, axiosJWT);

            setListMessage(listMess);
        };
        getListMessage();
    }, [curChat]);

    useEffect(() => {
        arrivalMessage &&
            curChat?.member.includes(arrivalMessage.authorID.id) &&
            setListMessage((prev) => [...prev, arrivalMessage]);
    }, [curChat, arrivalMessage]);

    const renderMessage = () => {
        if (listMessage.length > 0) {
            return listMessage.map((item, index) => {
                // truyen thong tin last mess vao item de in ra dong "da gui","da xem",...
                var isLastMess = false;
                var indexLast = listMessage.length - 1;
                if (index === indexLast) isLastMess = true;

                if (item.authorID.id === curUser.id) {
                    return (
                        <ItemMessage
                            from="me"
                            key={index + item.authorID.id}
                            messageData={item}
                            isLastMess={isLastMess}
                        >
                            {item.title}
                        </ItemMessage>
                    );
                } else {
                    return (
                        <ItemMessage key={index + item.authorID.id} messageData={item}>
                            {item.title}
                        </ItemMessage>
                    );
                }
            });
        }
    };

    return (
        <div className={cx('p-5 w-full h-full overflow-y-scroll  pt-20')}>
            <div className={cx('h-4/5 flex flex-col justify-center items-center')}>
                <Avartar className={cx('h-16 w-16')} src={curChat?.avatar} />
                <div className={cx('text-lcn-blue-5 font-semibold mt-4')}>{curChat?.name}</div>
                <div className={cx('text-slate-500  text-xs mt-2')}>
                    Bạn đã kết nối với <span className="font-semibold">{curChat?.name}</span>
                </div>
            </div>
            <div className={cx('w-full  ')}>
                {renderMessage()}
                {/* <ItemMessage>123</ItemMessage>
                <ItemMessage>123</ItemMessage>
                <ItemMessage>123</ItemMessage>
                <ItemMessage>123</ItemMessage>
                <ItemMessage>123</ItemMessage>
                <ItemMessage>123</ItemMessage>
                <ItemMessage>123</ItemMessage>
                <ItemMessage>123</ItemMessage>
                <ItemMessage>123</ItemMessage> */}
                <span className="" ref={bottomRef}></span>
            </div>
        </div>
    );
}

export default ContentMessage;
