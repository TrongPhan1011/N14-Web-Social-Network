import { useEffect, useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import Button from '~/components/Button';
import Avartar from '~/components/Avartar';
import { formatTime } from '~/lib/formatString';
import { getUserById } from '~/services/userService';
import { addUserSeenToMess } from '~/services/chatService';
import { getMessageById } from '~/services/messageService';
import { addGroupChatId, addCountUnseenChat } from '~/redux/Slice/sidebarChatSlice';

const cx = classNames;

function ItemChat({ groupChat, userLoginData }) {
    const dispatch = useDispatch();
    const [messageLast, setMessageLast] = useState('');

    var arrIdMessage = groupChat.message;

    useEffect(() => {
        const getMessageLast = async () => {
            var idLastMessage = arrIdMessage[arrIdMessage.length - 1];

            if (!!idLastMessage) {
                var message = await getMessageById(idLastMessage);

                setMessageLast(message);
            }
        };
        getMessageLast();
    }, []);

    // useEffect(() => {
    //     // const fetchAuthorMess = async (dataLastMess) => {
    //     //     const author = await getUserById(dataLastMess.authorID);
    //     //     setAuthorMess(author);
    //     // };
    //     // fetchAuthorMess(dataLastMess);
    // }, []);

    const getMessageLast = () => {
        var titleMess = '',
            messCreatedAt = '',
            arrAuthorName = [];
        if (!!messageLast) {
            titleMess = messageLast.title || '';
            messCreatedAt = formatTime(messageLast.createdAt, 'hh:mm') || '';
            var fullNameAuthor = messageLast.authorID.fullName;

            arrAuthorName = fullNameAuthor.split(' ');
        }

        // if (!!authorMess) arrAuthorName = authorMess.fullName.split(' ');

        // var statusOnline = 'hidden';
        // const SO_THANH_VIEN_CHAT = 3;
        // if (!!authorMess && authorMess.statusOnline === true && data.member.length < SO_THANH_VIEN_CHAT) {
        //     statusOnline = '';
        // }

        // var arrUserSeen = dataLastMess.seen;

        // var seen = checkSeen(arrUserSeen, userLoginData.id);

        // var classSeen = {
        //     textName: 'font-medium ',
        //     textChatTitle: 'text-gray-400',
        //     circleSeen: 'hidden',
        // };
        // if (!seen) {
        //     classSeen = {
        //         textName: 'font-bold ',
        //         textChatTitle: 'text-gray-900',
        //         circleSeen: '',
        //     };

        // }
        return {
            authorName: arrAuthorName[arrAuthorName.length - 1] || '',
            title: titleMess,
            messCreatedAt,
            // classSeen,
            // statusOnline,
        };
    };
    var itemDataChat = getMessageLast();

    return (
        <>
            {!!itemDataChat ? (
                <Button
                    // onClick={handleClickChat}
                    className={cx('rounded-xl h-16 w-full hover:bg-lcn-blue-3 m-0 p-2 mb-1 mt-1')}
                >
                    <div className={cx('relative w-full h-full flex items-center')}>
                        <Avartar className={cx('h-10 w-10')} src={groupChat.avatar} />
                        <div
                            className={cx(
                                'bg-lcn-green-1 w-3 h-3 absolute  rounded-full bottom-[2px] left-7',
                                // itemDataChat.statusOnline,
                            )}
                        ></div>
                        <div className={cx('w-40  h-full ml-2 overflow-hidden')}>
                            <div className={cx('text-left text-lcn-blue-5 h-8 w-96 ')}>{groupChat.name}</div>
                            <div className={cx(' text-xs text-left h-8')}>
                                <span>{itemDataChat.authorName}: </span> {itemDataChat.title}
                            </div>
                        </div>
                        <div className={cx('h-full w-8 relative')}>
                            <div
                                className={cx(
                                    'h-3 w-3 bg-lcn-blue-4 rounded-full  absolute top-4 right-0',
                                    // itemDataChat.classSeen.circleSeen,
                                )}
                            ></div>
                            <div
                                className={cx(
                                    'text-gray-500 text-xs text-left h-full flex items-end',
                                    // itemDataChat.classSeen.textChatTitle,
                                )}
                            >
                                {itemDataChat.messCreatedAt}
                            </div>
                        </div>
                    </div>
                </Button>
            ) : (
                <></>
            )}
        </>
    );
}

export default memo(ItemChat);
