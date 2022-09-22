import classNames from 'classnames';

import Button from '~/components/Button';
import Avartar from '~/components/Avartar';
import { formatTime } from '~/lib/formatString';
import { useEffect, useState, memo } from 'react';
import { getUserById } from '~/services/userService';
import { addUserSeenToMess } from '~/services/chatService';

const cx = classNames;

function ItemChat({ data, userLoginData }) {
    var lengthMess = data.message.length - 1;
    var dataLastMess = data.message[lengthMess];

    const [authorMess, setAuthorMess] = useState();
    const [itemSeen, setItemSeen] = useState(false);

    useEffect(() => {
        const fetchAuthorMess = async (dataLastMess) => {
            const author = await getUserById(dataLastMess.authorID);

            setAuthorMess(author);
        };
        fetchAuthorMess(dataLastMess);
    }, [dataLastMess]);

    const checkSeen = (arrSeen, userId) => {
        for (var user of arrSeen) {
            if (user.id === userId) return true;
        }
        return false;
    };

    const getMessageLast = () => {
        var timeCreateAt = formatTime(dataLastMess.createAt, 'hh:mm');

        var arrAuthorName = '';

        if (!!authorMess) arrAuthorName = authorMess.fullName.split(' ');

        var arrUserSeen = dataLastMess.seen;

        var seen = checkSeen(arrUserSeen, userLoginData.id);

        var classSeen = {
            textName: 'font-medium ',
            textChatTitle: 'text-gray-400',
            circleSeen: 'hidden',
        };
        if (!seen) {
            classSeen = {
                textName: 'font-bold ',
                textChatTitle: 'text-gray-900',
                circleSeen: '',
            };
        }
        return {
            timeCreateAt,
            authorName: arrAuthorName[arrAuthorName.length - 1],
            title: dataLastMess.title,
            classSeen,
        };
    };
    const itemDataChat = getMessageLast();

    const putUserSeen = async (dataGroupSeen) => {
        const putUser = await addUserSeenToMess(dataGroupSeen.id, dataGroupSeen);

        console.log(putUser);
    };

    const handleClickChat = () => {
        var currentDate = new Date();
        var userClickSeen = {
            id: userLoginData.id,
            seenAt: currentDate,
        };
        var dataLastMessSeen = dataLastMess;
        var dataGroupSeen = data;

        var seen = checkSeen(dataLastMessSeen.seen, userClickSeen.id);
        if (!seen) {
            dataLastMessSeen.seen.push(userClickSeen);

            if (putUserSeen(dataGroupSeen)) setItemSeen(true);
        }
    };

    return (
        <Button
            onClick={handleClickChat}
            className={cx('rounded-xl h-16 w-full hover:bg-lcn-blue-3 m-0 p-2 mb-1 mt-1')}
        >
            <div className={cx('relative w-full h-full flex items-center')}>
                <Avartar className={cx('h-10 w-10')} src={data.avatar} />
                <div className={cx('bg-lcn-green-1 w-3 h-3 absolute  rounded-full bottom-[2px] left-7')}></div>
                <div className={cx('w-40  h-full ml-2 overflow-hidden')}>
                    <div className={cx('text-left text-lcn-blue-5 h-8 w-96 ', itemDataChat.classSeen.textName)}>
                        {data.name}
                    </div>
                    <div className={cx(' text-xs text-left h-8', itemDataChat.classSeen.textChatTitle)}>
                        <span>{itemDataChat.authorName}: </span> {itemDataChat.title}
                    </div>
                </div>
                <div className={cx('h-full w-8 relative')}>
                    <div
                        className={cx(
                            'h-3 w-3 bg-lcn-blue-4 rounded-full  absolute top-4 right-0',
                            itemDataChat.classSeen.circleSeen,
                        )}
                    ></div>
                    <div
                        className={cx(
                            'text-gray-500 text-xs text-left h-full flex items-end',
                            itemDataChat.classSeen.textChatTitle,
                        )}
                    >
                        {itemDataChat.timeCreateAt}
                    </div>
                </div>
            </div>
        </Button>
    );
}

export default memo(ItemChat);
