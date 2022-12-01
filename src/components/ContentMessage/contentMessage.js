import { useSelector } from 'react-redux';
import classNames from 'classnames';

import ItemMessage from '~/components/ItemMessage';

import Avartar from '~/components/Avartar';
import { useEffect, useRef, memo } from 'react';
import { useState } from 'react';
import { getMessageByIdChat } from '~/services/messageService';
import socket from '~/utils/getSocketIO';

const cx = classNames;

function ContentMessage({ currentInbox, curUser, accessToken, axiosJWT }) {
    var curChat = useSelector((state) => state.sidebarChatSlice.currentChat);
    const [listMessage, setListMessage] = useState([]);
    const [limitMessage, setLimitMessage] = useState(30);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [messRemove, setMessRemove] = useState([]);
    const [reactMess, setReactMess] = useState();

    const bottomRef = useRef();

    useEffect(() => {
        socket.on('getMessage', (data) => {
            if (!!data) {
                var getNewMess = {
                    id: data.id,
                    title: data.title,
                    authorID: data.authorID,
                    seen: data.seen,
                    type_mess: data.type_mess,
                    idChat: data.idChat,
                    file: data.file,

                    replyMessage: data.replyMessage,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                };
                setArrivalMessage(getNewMess);
            }
        });
        socket.on('getMessRemoved', (data) => {
            if (!!data) {
                setMessRemove((prev) => [...prev, data]);
            }
        });
        socket.on('getReactMess', (data) => {
            if (!!data) {
                setReactMess(data);
            }
        });

        // theo doi xem tin nhan bat ki nao do co thay doi khong vd: xoa tin, tha cam xuc,....
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

    var renderMessage = () => {
        if (listMessage.length > 0) {
            return listMessage.map((item, index) => {
                // truyen thong tin last mess vao item de in ra dong "da gui","da xem",...
                var isLastMess = false;
                var indexLast = listMessage.length - 1;
                if (index === indexLast) isLastMess = true;
                if (item.type_mess === 'system') {
                    return (
                        <div key={index + ''} className={cx('text-xs text-center mt-2 mb-2 text-slate-500')}>
                            {item.title}
                        </div>
                    );
                }
                if (!!messRemove && messRemove.includes(item.id)) {
                    return <span key={index + ' '}></span>;
                }
                if (!!reactMess && reactMess.id === item.id) {
                    var reactObj = reactMess.reactionMess;

                    if (!!item.reactionMess) {
                        if (!item.reactionMess.includes(reactObj)) item.reactionMess = [...item.reactionMess, reactObj];
                    } else item.reactionMess = [reactObj];
                }

                if (item.authorID?.id === curUser.id) {
                    return (
                        <ItemMessage from="me" key={index + ''} messageData={item} isLastMess={isLastMess}>
                            {item.title}
                        </ItemMessage>
                    );
                } else {
                    return (
                        <ItemMessage key={index + ''} messageData={item}>
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
                <Avartar
                    className={cx('h-16 w-16')}
                    src={curChat.typeChat === 'group' ? curChat?.avatar : currentInbox?.profile?.urlAvartar}
                    typeAvatar={curChat.typeChat === 'group' ? 'group' : 'inbox'}
                    idGroup={curChat.id}
                />
                <div className={cx('text-lcn-blue-5 font-semibold mt-4')}>
                    {curChat.typeChat === 'group' ? curChat?.name : currentInbox?.fullName}
                </div>
                <div className={cx('text-slate-500  text-xs mt-2')}>
                    Bạn đã kết nối với
                    <span className="font-semibold">
                        {curChat.typeChat === 'group' ? curChat?.name : currentInbox?.fullName}
                    </span>
                </div>
            </div>
            <div className={cx('w-full   ')}>
                {renderMessage()}

                <span className="" ref={bottomRef}></span>
            </div>
        </div>
    );
}

export default memo(ContentMessage);
