import classNames from 'classnames';

import Button from '~/components/Button';

import { useState, memo } from 'react';

import Modal from '~/components/Modal';
import Avartar from '~/components/Avartar';

import { addAdminToChat } from '~/services/chatService';
import { inCludesString } from '~/lib/regexString';
import { currentChat } from '~/redux/Slice/sidebarChatSlice';
import { useDispatch } from 'react-redux';
import { getChatByIdMember } from '~/services/chatService';

import { addMess } from '~/services/messageService';
import socket from '~/utils/getSocketIO';
import { getUserById } from '~/services/userService';
import ItemDropdown from '~/components/Dropdown/ItemDropdown';
import { getFirstText } from '~/lib/formatString';

const cx = classNames;
function AddAdminChat({ dataMess, accessToken, axiosJWT, curChat, curUser }) {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [listChat, setListChat] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [listChecked, setListChecked] = useState([]);

    const handleShowModal = async () => {
        let arrChatFetch = await getChatByIdMember(curUser.id, accessToken, axiosJWT);

        var arrInbox = [],
            arrGroup = [];
        for (let chat of arrChatFetch) {
            if (chat.typeChat === 'inbox') {
                var userChatOther;
                if (chat.member[0] !== curUser.id) {
                    userChatOther = await getUserById(chat.member[0], accessToken, axiosJWT);
                } else userChatOther = await getUserById(chat.member[1], accessToken, axiosJWT);

                let chatTemp = { ...chat, name: userChatOther.fullName, avatar: userChatOther.profile.urlAvartar };
                arrInbox = [...arrInbox, chatTemp];
            } else arrGroup = [...arrGroup, chat];
        }
        var arrChatFilter = [...arrInbox, ...arrGroup];
        setListChat(arrChatFilter);

        setShowModal(true);
    };
    const handleHideModal = () => {
        setListChecked([]);
        setListChat([]);
        setShowModal(false);
    };
    const getAllChecked = (e) => {
        // add to list
        if (e.target.checked) {
            setListChecked((prev) => [...prev, e.target.value]);
        } else {
            // remove from list
            setListChecked(listChecked.filter((item) => item !== e.target.value));
        }
    };
    const renderItemMember = () => {
        if (listChat.length > 0) {
            let arrChatFilter = listChat.filter((chat) => {
                if (inCludesString(searchValue, chat.name)) return true;
                else return false;
            });

            return arrChatFilter.map((item) => {
                return (
                    <label
                        htmlFor={item.id}
                        key={item.id}
                        className={cx('w-full h-14 hover:bg-lcn-blue-2 p-2 flex m-t-2 rounded-md items-center ')}
                    >
                        <input
                            type="checkbox"
                            name="chkMember"
                            id={item.id}
                            className={cx('')}
                            onChange={getAllChecked}
                            value={item.id}
                        />
                        <Avartar
                            src={item.avatar}
                            typeAvatar={item.typeChat === 'group' ? 'group' : 'inbox'}
                            idGroup={item.id}
                            className={cx('h-11 w-11 mr-2 ml-2')}
                        />
                        <div className={cx()}>{item.name}</div>
                    </label>
                );
            });
        }
    };
    const handleSearchMember = (e) => {
        let valueSearch = e.target.value;
        setSearchValue(valueSearch);
    };

    const saveMessSystem = async (id, text) => {
        var newMessSave = {
            title: text,
            authorID: curUser.id,
            seen: [{ id: curUser.id, seenAt: Date.now() }],
            type_mess: 'system',
            idChat: id,
            status: 1,
            file: [],
        };
        if (!!newMessSave) {
            var messData = await addMess(newMessSave, accessToken, axiosJWT);
            socket.emit('sendMessage', {
                receiverId: id,
                contentMessage: messData,
            });
        }
    };
    var getNewMess = (curMess, idChat) => {
        var newMess = {
            title: curMess.title,
            authorID: {
                id: curUser.id,
                fullName: curUser.fullName,
                profile: {
                    urlAvartar: curUser.profile.urlAvartar,
                },
            },
            type_mess: curMess.type_mess,
            idChat: idChat,
            seen: [
                {
                    idSeen: curUser.id,
                    seenAt: Date.now(),
                },
            ],
            file: curMess.file,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        var newMessSave = {
            title: newMess.title,
            authorID: newMess.authorID.id,
            seen: newMess.seen,
            type_mess: newMess.type_mess,
            idChat: newMess.idChat,
            status: 1,
            file: newMess.file,
        };

        return { newMessSocket: newMess, newMessSave };
    };
    const saveMess = async (newMessSocket, newMessSave, idChat) => {
        if (!!newMessSave) {
            var messData = await addMess(newMessSave, accessToken, axiosJWT);

            if (!!messData) {
                newMessSocket.id = messData.id;
                socket.emit('sendMessage', {
                    receiverId: idChat,
                    contentMessage: newMessSocket,
                });
            }
        }
    };

    const handleSendForwardMess = async () => {
        if (!!listChecked && listChecked.length > 0) {
            for (let chatId of listChecked) {
                let objNewMess = getNewMess(dataMess, chatId);
                saveMess(objNewMess.newMessSocket, objNewMess.newMessSave, chatId);
            }

            setListChecked([]);
            setListChat([]);
            setShowModal(false);
        }
    };

    const renderMess = () => {
        if (!!dataMess) {
            if (dataMess.file.length > 0) {
                return (
                    <div
                        className={cx(
                            'h-9 max-w-[50%] break-words flex items-center text-sm pr-3 pl-3 italic bg-lcn-blue-2 text-slate-500 rounded-full',
                        )}
                    >
                        Tin nhắn chưa có bản xem trước
                    </div>
                );
            }
            return (
                <div
                    className={cx(
                        'h-9 max-w-[50%] break-words flex items-center text-sm pr-3 pl-3 italic bg-lcn-blue-2 text-slate-500 rounded-full',
                    )}
                >
                    {getFirstText(dataMess.title, 30)}
                </div>
            );
        }
    };

    const renderModalShowChat = () => {
        if (listChat.length > 0) {
            return (
                <Modal
                    isShow={showModal}
                    className={cx('w-96 text-black p-2 overflow-hidden ', 'active-forward')}
                    isHidden={handleHideModal}
                >
                    <h4 className="text-center font-semibold border-b border-lcn-blue-3">Chuyển tiếp tin nhắn</h4>
                    <div
                        className={cx(
                            'border border-lcn-blue-4 rounded-3xl w-full h-10 flex items-center p-1 pr-4 pl-4 mt-2',
                        )}
                    >
                        <input
                            type="text"
                            placeholder="Tìm thành viên"
                            className={cx('outline-none w-full h-full caret-lcn-blue-4')}
                            onChange={handleSearchMember}
                        />
                    </div>

                    <div className={cx('h-2/3 w-full overflow-scroll p-2')}>{renderItemMember()}</div>
                    <div
                        className={cx(
                            'flex mt-2  h-16 justify-between items-center p-2 self-center border-t border-lcn-blue-2',
                        )}
                    >
                        {renderMess()}
                        <Button
                            type="button"
                            className={cx('bg-lcn-1 h-9 p-1 pr-3 pl-3  text-white bg-lcn-blue-4 bg-opacity-100')}
                            onClick={handleSendForwardMess}
                        >
                            Chuyển tiếp
                        </Button>
                    </div>
                </Modal>
            );
        }
        return <></>;
    };
    return (
        <>
            <ItemDropdown
                className={cx('rounded-md m-0 text-lcn-blue-5 text-sm font-medium')}
                onClick={handleShowModal}
            >
                Chuyển tiếp
            </ItemDropdown>
            {renderModalShowChat()}
        </>
    );
}

export default memo(AddAdminChat);
