import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';

import { FiMoreVertical } from 'react-icons/fi';
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
import { removeMessWithUser } from '~/services/messageService';
import socket from '~/utils/getSocketIO';

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
    const [socketMessChange, setSocketMessChange] = useState();
    const [statusMess, setStatusMess] = useState(messageData.status);

    useEffect(() => {
        //  socket.on('getMessChange', (data) => {
        //      if (!!data) {
        //          var messChange = {
        //              id: data.id,
        //              status: data.status,
        //          };
        //          if (!!listMessage && listMessage.length > 0) {
        //              for (let item of listMessage) {
        //                  if (item.id === messChange.id) {
        //                      item.status = messChange.status;
        //                  }
        //              }
        //              console.log(listMessage);
        //          }
        //      }
        //  });
    }, []);

    useEffect(() => {
        socket.emit('sendMessChange', {
            receiverId: curChat.id,
            contentMessage: socketMessChange,
        });
    }, [socketMessChange]);

    var bgMessage = 'bg-slate-100 ',
        flexRowReverse = 'mt-7',
        seen = '',
        hidden = '';

    if (!!from) {
        bgMessage = 'bg-lcn-blue-4 text-white';
        flexRowReverse = 'flex-row-reverse';

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
                        ' rounded-3xl p-2 pr-3 pl-3 text-sm text-center text-gray-400 italic border border-gray-200',
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
    const getMessageChange = (messChange) => {
        return {
            id: messChange.id,
            status: messChange.status,
        };
    };
    const handleRemoveWithUser = async () => {
        var result = await removeMessWithUser(messageData.id, accessToken, axiosJWT);
        if (result === true) {
            // let messRemove = getMessageChange({ id: messageData.id, status: 0 });
            setStatusMess(0);
            // setSocketMessChange(messRemove);
        }
    };

    const renderDataMore = () => {
        return (
            <>
                <ItemDropdown className={cx('rounded-md text-lcn-blue-5 text-sm font-medium ')}>
                    Chuyển tiếp
                </ItemDropdown>
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
                    <ItemDropdown className={cx('rounded-md text-red-500 text-sm font-medium ')}>
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
                className={cx('w-52 bg-white border border-lcn-blue-2 rounded-lg shadow-lg p-2', hiddenMenu)}
                tabIndex="-1"
                {...attrs}
            >
                {renderDataMore()}
            </div>
        );
    };

    return (
        <>
            <div className={cx('message-hover', 'flex w-full items-end mt-2 ', flexRowReverse)}>
                <Avartar className={cx('h-8 w-8 mb-1', hidden)} src={messageData?.authorID.profile.urlAvartar} />

                <div
                    className={cx('max-w-[24.5rem] ml-1 pr-1 pl-1   rounded-xl  ')}
                    title={formatTimeAuto(messageData.createdAt)}
                >
                    <span className={cx('text-xs text-slate-300 pl-2 pr-2  ', hidden)}>
                        {getLastName(messageData?.authorID.fullName)}
                    </span>
                    {renderMessage()}
                    <div className={cx('text-right text-[12px] text-slate-400 pr-2')}>{seen}</div>
                </div>
                <div className={cx('more-hover', '  h-full hidden  self-center', flexRowReverse)}>
                    <Button
                        type="button"
                        className={cx(
                            'p-0 m-0 mr-2 ml-2 text-2xl text-slate-400 hover:text-lcn-blue-4 hover:bg-slate-100',
                        )}
                    >
                        <BiSmile />
                    </Button>
                    <Button
                        type="button"
                        className={cx(
                            'p-0 m-0 text-2xl mr-2 ml-2 text-slate-400 hover:text-lcn-blue-4 hover:bg-slate-100',
                        )}
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
