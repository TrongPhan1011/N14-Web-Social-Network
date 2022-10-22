import classNames from 'classnames';
import { useState } from 'react';
import { useEffect, useRef } from 'react';

import { AiFillPlusCircle, AiFillFileImage } from 'react-icons/ai';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import socket from '~/utils/getSocketIO';

const cx = classNames;

function InputSend({ type }) {
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    var curChat = useSelector((state) => state.sidebarChatSlice.currentChat);

    var curSignIn = useSelector((state) => state.persistedReducer.signIn);

    const [currMessage, setCurrMessage] = useState('');
    const txtSendRef = useRef();

    useEffect(() => {
        // socket.on();
    }, []);

    const handleSendMessage = () => {
        var newMess = {
            title: currMessage,
            authorID: curSignIn.userLogin.id,
            nameAuthor: curSignIn.userLogin.fullName,
            avartar: curSignIn.userLogin.profile.urlAvartar,
            type: 'text',
            idChat: curChat.id,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        socket.emit('sendMessage', {
            senderId: curSignIn.id,
            receiverId: curChat.id,
            contentMessage: newMess,
        });

        txtSendRef.current.value = '';
    };

    var positon = 'absolute bottom-0';
    if (type === 'comment') {
        positon = '';
    }

    return (
        <div className={cx('h-16   bg-white p-2 w-full mr-20 flex items-center', positon)}>
            <Button className={cx('m-0 ml-1')}>
                <AiFillPlusCircle className={cx('text-lcn-blue-4 text-3xl')} />
            </Button>
            <Button className={cx('m-0 ml-1')}>
                <AiFillFileImage className={cx('text-lcn-blue-4 text-3xl')} />
            </Button>
            <input
                type="text"
                className={cx(
                    'w-full h-11 p-3 border border-lcn-blue-4  rounded-3xl m-2 break-words outline-none caret-lcn-blue-4',
                )}
                placeholder="Nhập tin nhắn"
                onChange={(e) => {
                    setCurrMessage(e.target.value.trim());
                }}
                ref={txtSendRef}
            />
            <Button
                type="button"
                className={cx(' flex justify-center items-center rounded-full m-0 w-14  h-12')}
                onClick={handleSendMessage}
            >
                <RiSendPlaneFill className={cx('text-lcn-blue-4 text-4xl hover:text-lcn-blue-5')} />
            </Button>
        </div>
    );
}

export default InputSend;
