import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import ItemMessage from '~/components/ItemMessage';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import Avartar from '~/components/Avartar';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { getMessageByIdChat } from '~/services/messageService';

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
    const [limitMessage, setLimitMessage] = useState(10);

    const bottomRef = useRef();
    useEffect(() => {
        const scrollToBottom = () => {
            if (listMessage.length > 5) {
                bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        };
        scrollToBottom();
        const getListMessage = async () => {
            const listMess = await getMessageByIdChat(curChat?.id, limitMessage, accessToken, axiosJWT);
            setListMessage(listMess);
        };
        getListMessage();
    }, [curChat]);

    const renderMessage = () => {
        if (listMessage.length > 0) {
            return listMessage.map((item) => {
                if (item.authorID.id === curUser.id) {
                    return (
                        <ItemMessage from="me" key={item.id} messageData={item}>
                            {item.title}
                        </ItemMessage>
                    );
                } else
                    return (
                        <ItemMessage key={item.id} messageData={item}>
                            {item.title}
                        </ItemMessage>
                    );
            });
        }
    };

    return (
        <div className={cx('p-5 w-full h-screen overflow-scroll pb-20 pt-20')}>
            <div className={cx('h-3/5 flex flex-col justify-center items-center')}>
                <Avartar className={cx('h-16 w-16')} src={curChat?.avatar} />
                <div className={cx('text-lcn-blue-5 font-semibold mt-4')}>{curChat?.name}</div>
                <div className={cx('text-slate-500  text-xs mt-2')}>
                    Bạn đã kết nối với <span className="font-semibold">{curChat?.name}</span>
                </div>
            </div>
            <div className={cx('w-full   ')} ref={bottomRef}>
                {renderMessage()}
            </div>
        </div>
    );
}

export default ContentMessage;
