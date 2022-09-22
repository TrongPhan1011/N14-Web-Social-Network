import classNames from 'classnames';
import { useEffect, useState, memo } from 'react';

import ItemChat from '~/components/ItemChat';
import { getChatByIdMember } from '~/services/chatService';

const cx = classNames;

function SideBarChat({ userLoginData }) {
    const [chatResult, setChatResult] = useState([]);

    useEffect(() => {
        const fetchChat = async () => {
            const arrChat = await getChatByIdMember(userLoginData.id);
            setChatResult(arrChat);
        };
        fetchChat();
    }, []);

    const handleRenderChat = () => {
        return chatResult.map((item) => <ItemChat key={item.id} data={item} userLoginData={userLoginData} />);
    };

    return <div className={cx('p-2 h-screen overflow-y-auto')}>{handleRenderChat()}</div>;
}

export default memo(SideBarChat);
