import classNames from 'classnames/bind';
import { useCallback, useEffect, useRef, useState } from 'react';

import { FiMoreVertical, FiPaperclip } from 'react-icons/fi';
import { BiSmile } from 'react-icons/bi';
import { MdReply } from 'react-icons/md';

import Button from '~/components/Button';
import Avartar from '~/components/Avartar';
import { formatTimeAuto, getLastName, isEmojiOnly } from '~/lib/formatString';
import style from './ItemMessage.module.scss';
import MessageFile from '~/components/MessageFile';
import Dropdown from '~/components/Dropdown';
import ItemDropdown from '~/components/Dropdown/ItemDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { removeMessWithUser, removeMessWithEveryone, addReaction } from '~/services/messageService';
import socket from '~/utils/getSocketIO';
import ForwardMessage from '~/components/ForwardMessage';
import { replyMes } from '~/redux/Slice/messageSlice';
import FacebookEmoji from 'react-facebook-emoji';

const cx = classNames.bind(style);

function ItemMessage({ children, from, messageData, isLastMess }) {
    const MEMBER_SEEN = {
        MIN: 2,
    };
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    var curChat = useSelector((state) => state.sidebarChatSlice.currentChat);
    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;

    const [showMenu, setShowMenu] = useState(false);

    const [hiddenMenu, setHiddenMenu] = useState('hidden');

    const [statusMess, setStatusMess] = useState(messageData.status);
    const [showEmotion, setShowEmotion] = useState('hidden');

    useEffect(() => {
        socket.emit('removeMess', { receiverId: curChat.id, idMess: '' });
        // socket.emit('sendReactMess', { receiverId: curChat.id, idMess: null });
    }, []);

    var bgMessage = 'bg-slate-100 ',
        flexRowReverse = 'mt-7',
        seen = '',
        hidden = '',
        positionEmotion = '-left-24',
        positionReaction = 'absolute h-0 bottom-2 pl-1',
        positionReply = '-bottom-16 left-8';

    if (!!from) {
        bgMessage = 'bg-lcn-blue-4 text-white';
        flexRowReverse = 'flex-row-reverse';
        positionEmotion = '-left-44';
        positionReaction = 'relative h-3 -top-2';
        positionReply = '-bottom-5';
        hidden = 'hidden';
        if (isLastMess === true) {
            if (!!messageData.seen) {
                seen = 'Đã gửi';
            } else if (!!messageData.seen && messageData?.seen.length === MEMBER_SEEN.MIN) {
                seen = 'Đã xem';
            }
        }
    }

    var renderMessage = () => {
        // status = 0 --> chi xoa minh toi
        if (statusMess === 0 && messageData.authorID.id === curUser.id) {
            return (
                <div
                    className={cx(
                        ' rounded-3xl p-2  pr-3 pl-3 text-sm text-center text-gray-400 italic border border-gray-200',
                    )}
                >
                    Tin nhắn đã được thu với bạn
                </div>
            );
        }
        if (!!messageData.file && messageData.file.length > 0) {
            return <MessageFile messageData={messageData} />;
        }
        if (isEmojiOnly(children)) {
            return <div className={cx('break-words rounded-3xl  pr-1 pl-1 text-3xl text-center')}>{children}</div>;
        }

        return (
            <div className={cx('break-words rounded-3xl p-2 pr-3 pl-3 text-sm text-center', bgMessage)}>{children}</div>
        );
    };

    const handleHiddenMenu = useCallback(() => {
        setHiddenMenu('hidden');
        setShowMenu(false);
    }, []);
    const handleShowMenu = () => {
        if (showMenu === false) {
            setHiddenMenu('');
            setShowMenu(true);
        } else {
            setHiddenMenu('hidden');
            setShowMenu(false);
        }
    };

    const handleRemoveWithUser = async () => {
        var confirmRemove = window.confirm('Bạn có chắc muốn xoá tin nhắn không?');
        if (confirmRemove) {
            var result = await removeMessWithUser(messageData.id, accessToken, axiosJWT);
            if (result === true) {
                setStatusMess(0);
            }
        }
    };
    const handleRemoveWithEveryone = async () => {
        var confirmRemove = window.confirm('Bạn có chắc muốn xoá với mọi người không?');
        if (confirmRemove) {
            socket.emit('removeMess', { receiverId: curChat.id, idMess: '' });
            var result = await removeMessWithEveryone(curChat.id, messageData.id, accessToken, axiosJWT);
            if (!!result) {
                socket.emit('removeMess', { receiverId: curChat.id, idMess: messageData.id });
            }
        }
    };

    const sendReactMess = async (e, typeReact) => {
        e.stopPropagation();

        if (!!messageData.reactionMess && messageData.reactionMess.length > 0) {
            var userReactData = messageData.reactionMess.filter((reaction) => reaction.idUser === curUser.id);
            for (let reactUser of userReactData) {
                if (typeReact === reactUser.type_emotion) {
                    return;
                }
            }
        }
        var newReaction = {
            idUser: {
                id: curUser.id,

                fullName: curUser.fullName,
            },
            type_emotion: typeReact,
        };

        var dataReactSocket = {
            id: messageData.id,
            reactionMess: newReaction,
        };
        var dataReactSave = {
            id: messageData.id,
            reactionMess: {
                idUser: curUser.id,

                type_emotion: typeReact,
            },
        };

        var result = await addReaction(dataReactSave, accessToken, axiosJWT);
        if (result) {
            socket.emit('sendReactMess', { receiverId: curChat.id, contentMessage: dataReactSocket });
        }
        setShowEmotion('hidden');
    };

    const renderDataMore = () => {
        return (
            <>
                <ForwardMessage
                    dataMess={messageData}
                    accessToken={accessToken}
                    axiosJWT={axiosJWT}
                    curChat={curChat}
                    curUser={curUser}
                />

                {!!from && messageData.status !== 0 ? (
                    <ItemDropdown
                        className={cx('rounded-md text-red-500  text-sm font-medium ')}
                        onClick={handleRemoveWithUser}
                    >
                        Xoá chỉ mình tôi
                    </ItemDropdown>
                ) : (
                    <></>
                )}
                {!!from ? (
                    <ItemDropdown
                        className={cx('rounded-md text-red-500 text-sm font-medium ')}
                        onClick={handleRemoveWithEveryone}
                    >
                        Xoá với mọi người
                    </ItemDropdown>
                ) : (
                    <></>
                )}
            </>
        );
    };

    const handleLoadMenu = (attrs) => {
        return (
            <div
                className={cx(
                    'w-52 bg-white border border-lcn-blue-2 rounded-lg shadow-lg p-2',

                    hiddenMenu,
                )}
                tabIndex="-1"
                {...attrs}
            >
                {renderDataMore()}
            </div>
        );
    };

    const getRepMessType = (replyMess) => {
        if (!!replyMess.file) {
            if (replyMess.file.fileType === 'image') {
                return (
                    <div className={' w-24 mr-1  pt-1 overflow-x-hidden  '}>
                        <img
                            src={replyMess.file.path}
                            alt={replyMess.file.title}
                            className={'object-cover rounded-md'}
                        />
                    </div>
                );
            } else if (replyMess.file.fileType === 'video') {
                return (
                    <div className={'w-24 overflow-x-hidden  flex items-end  mr-1  pt-1'}>
                        <video
                            src={replyMess.file.path}
                            alt={replyMess.file.title}
                            className={'object-cover rounded-md'}
                        />
                    </div>
                );
            } else
                return (
                    <div
                        className={cx(
                            ' pr-2 pl-2 h-10 p-1 text-sm  bg-slate-100 bg-opacity-80 t rounded-full m-1 shadow-md flex items-center justify-center font-medium text-slate-400',
                        )}
                    >
                        <FiPaperclip className={cx(' text-lcn-blue-4 p-1 h-8 w-8 bg-lcn-blue-2 rounded-full mr-2 ')} />
                        {replyMess.file.title}
                    </div>
                );
        }
        return (
            <div className={cx('max-w-xs flex mr-1 p-2 pt-1 bg-slate-100 text-slate-500 text-sm  rounded-full  ')}>
                {messageData?.replyMessage?.title}
            </div>
        );
    };

    const renderReplyMess = () => {
        if (!!messageData.replyMessage)
            return (
                <Button
                    href={'#' + messageData.replyMessage.id}
                    className={cx('w-full flex relative opacity-70', positionReply, flexRowReverse)}
                >
                    {getRepMessType(messageData.replyMessage)}
                </Button>
            );
    };

    const renderListReaction = () => {
        var listTypeReact = [];

        return messageData.reactionMess.map((reaction, index) => {
            if (listTypeReact.includes(reaction.type_emotion)) {
                return <span key={index + ''}></span>;
            } else listTypeReact.push(reaction.type_emotion);
            return (
                <span
                    key={index + ' '}
                    className={cx(
                        'ring-2 ring-white w-4 h-4 text-xs  flex items-center justify-center rounded-full bg-slate-100  bg-opacity-80 backdrop-blur-md',
                    )}
                >
                    {reaction.type_emotion}
                </span>
            );
        });
    };
    const getArrItemReact = (type) => {
        return messageData.reactionMess.filter((item) => item.type_emotion === type);
    };

    const renderItemReact = () => {
        var arrLike = getArrItemReact('👍');
        var arrHeart = getArrItemReact('❤');
        var arrHaha = getArrItemReact('😆');
        var arrWow = getArrItemReact('😮');
        var arrSad = getArrItemReact('😢');
        var arrAngry = getArrItemReact('😡');
        var mergeReact = [...arrLike, ...arrHeart, ...arrHaha, ...arrWow, ...arrSad, ...arrAngry];

        return mergeReact.map((item, index) => {
            return (
                <div key={index + ''} className={cx('flex justify-between')}>
                    <div className="flex">
                        <span
                            className={cx(
                                ' w-4 h-4  flex items-center justify-center rounded-full bg-slate-100  bg-opacity-80 backdrop-blur-md',
                            )}
                        >
                            {item.type_emotion}
                        </span>
                    </div>
                    <span className="pl-4">{item.idUser.fullName}</span>
                </div>
            );
        });
    };

    const renderReactMess = () => {
        if (!!messageData.reactionMess && messageData.reactionMess.length > 0)
            return (
                <>
                    <div
                        type="button"
                        className={cx('w-full flex    ', 'hover-react', flexRowReverse, positionReaction)}
                    >
                        {renderListReaction()}

                        <div
                            className={cx(
                                'text-[9px] hidden min-w-[12rem] absolute bg-black bg-opacity-80  text-white p-1 rounded-md',
                                'hover-react-item',
                            )}
                        >
                            {renderItemReact()}
                        </div>
                    </div>
                </>
            );
    };

    return (
        <>
            {renderReplyMess()}

            <div
                id={messageData.id}
                className={cx('message-hover', 'flex w-full items-end mt-2 relative ', flexRowReverse)}
            >
                <Avartar className={cx('h-8 w-8 mb-1', hidden)} src={messageData?.authorID.profile.urlAvartar} />

                <div
                    className={cx('max-w-[24.5rem] ml-1 pr-1 pl-1   rounded-xl  ')}
                    title={formatTimeAuto(messageData.createdAt)}
                >
                    <span className={cx('text-xs text-slate-400 pl-2 pr-2  bg-white rounded-full', hidden)}>
                        {getLastName(messageData?.authorID.fullName)}
                    </span>
                    {renderMessage()}

                    {renderReactMess()}
                    <div className={cx('text-right text-[12px] text-slate-400 pr-2')}>{seen}</div>
                </div>

                <div className={cx('more-hover', '  h-full hidden  self-center', flexRowReverse)}>
                    <Button
                        type="button"
                        className={cx(
                            'p-0 m-0 mr-2 ml-2 text-2xl relative text-slate-400 hover:text-lcn-blue-4 hover:bg-slate-100',
                        )}
                        onClick={() => {
                            if (showEmotion === 'hidden') {
                                setShowEmotion('flex');
                            } else setShowEmotion('hidden');
                        }}
                        // onFocus={() => setShowEmotion('flex')}
                    >
                        <div
                            className={cx(
                                'w-[17rem] h-12 bg-white bg-opacity-80 backdrop-blur-md absolute z-[2] -top-11  rounded-full drop-shadow-md ',
                                showEmotion,
                                positionEmotion,
                                'justify-around items-center border border-gray-100 pr-2 pl-2',
                            )}
                            onBlur={() => setShowEmotion('hidden')}
                        >
                            <Button type="button" className="p-0 pt-2 m-0 " onClick={(e) => sendReactMess(e, '👍')}>
                                <div className="relative -z-10">
                                    <FacebookEmoji type="like" size="sm" />
                                </div>
                            </Button>
                            <Button type="button" className="p-0 pt-2 m-0 " onClick={(e) => sendReactMess(e, '❤')}>
                                <div className="relative -z-10">
                                    <FacebookEmoji type="love" size="sm" />
                                </div>
                            </Button>
                            <Button type="button" className="p-0 pt-2 m-0 " onClick={(e) => sendReactMess(e, '😆')}>
                                <div className="relative -z-10">
                                    <FacebookEmoji type="haha" size="sm" />
                                </div>
                            </Button>
                            <Button type="button" className="p-0 pt-2 m-0 " onClick={(e) => sendReactMess(e, '😮')}>
                                <div className="relative -z-10">
                                    <FacebookEmoji type="wow" size="sm" />
                                </div>
                            </Button>
                            <Button type="button" className="p-0 pt-2 m-0" onClick={(e) => sendReactMess(e, '😢')}>
                                <div className="relative -z-10">
                                    <FacebookEmoji type="sad" size="sm" />
                                </div>
                            </Button>
                            <Button type="button" className=" p-0 pt-2 m-0 " onClick={(e) => sendReactMess(e, '😡')}>
                                <div className="relative -z-10">
                                    <FacebookEmoji type="angry" size="sm" />
                                </div>
                            </Button>
                        </div>
                        <BiSmile />
                    </Button>
                    <Button
                        type="button"
                        className={cx(
                            'p-0 m-0 text-2xl mr-2 ml-2 text-slate-400 hover:text-lcn-blue-4 hover:bg-slate-100',
                        )}
                        onClick={() => {
                            dispatch(replyMes(messageData));
                        }}
                    >
                        <MdReply />
                    </Button>

                    <Dropdown render={handleLoadMenu} visible={showMenu} hidden={handleHiddenMenu}>
                        <div>
                            <Button
                                type="button"
                                className={cx(
                                    'p-0 m-0 text-xl mr-2 ml-2 text-slate-400 hover:text-lcn-blue-4 hover:bg-slate-100',
                                )}
                                onClick={handleShowMenu}
                            >
                                <FiMoreVertical />
                            </Button>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </>
    );
}

export default ItemMessage;
