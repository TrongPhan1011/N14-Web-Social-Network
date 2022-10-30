import classNames from 'classnames';
import { useState } from 'react';
import { useEffect, useRef } from 'react';

import { AiFillPlusCircle, AiFillFileImage } from 'react-icons/ai';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import socket from '~/utils/getSocketIO';
import { addMess } from '~/services/messageService';

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
    const [messageSend, setMessageSend] = useState();
    const txtSendRef = useRef();

    useEffect(() => {
        if (!!curChat && !!messageSend) {
            socket.emit('sendMessage', {
                receiverId: curChat.id,
                contentMessage: messageSend,
            });
            txtSendRef.current.value = '';
        }
    }, [messageSend]);

    const saveMess = async (newMessSave, newMess) => {
        if (!!newMessSave) {
            var messData = await addMess(newMessSave, accessToken, axiosJWT);

            newMess.id = messData.id;
            console.log(newMess);
            setMessageSend(newMess);
        }
    };

    const handleSendMessage = () => {
        var newMess = {
            title: currMessage,
            authorID: {
                id: curSignIn.userLogin.id,
                fullName: curSignIn.userLogin.fullName,
                profile: {
                    urlAvartar: curSignIn.userLogin.profile.urlAvartar,
                },
            },

            type: 'text',
            idChat: curChat.id,
            seen: [
                {
                    idSeen: curSignIn.userLogin.id,
                    seenAt: Date.now(),
                },
            ],
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        var newMessSave = {
            title: newMess.title,
            authorID: newMess.authorID.id,
            seen: newMess.seen,
            type_mess: newMess.type,
            idChat: newMess.idChat,
            status: 1,
        };

        saveMess(newMessSave, newMess);
    };
    const handleKeyUpSendMess = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className={cx('h-full  bg-white p-2 w-full mr-20 flex items-center z-20')}>
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
                onKeyUp={handleKeyUpSendMess}
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
