import classNames from 'classnames';

import Button from '~/components/Button';

import { useState, memo, useEffect } from 'react';

import Modal from '~/components/Modal';
import Avartar from '~/components/Avartar';

import { requestMemberChat, changeStatusChat } from '~/services/chatService';
import { inCludesString } from '~/lib/regexString';
import { currentChat } from '~/redux/Slice/sidebarChatSlice';
import { useDispatch } from 'react-redux';
import { getMemberRequest } from '~/services/chatService';

import { RiUserFollowLine } from 'react-icons/ri';
import { addMess } from '~/services/messageService';
import socket from '~/utils/getSocketIO';
import { getUserById } from '~/services/userService';

const cx = classNames;
function RequestMemberChat({ accessToken, axiosJWT, curChat, curUser }) {
    const dispatch = useDispatch();
    const PUBLIC_CHAT = 1;
    const PRIVATE_CHAT = 2;

    const [showModal, setShowModal] = useState(false);
    const [listMember, setListMember] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [listChecked, setListChecked] = useState([]);
    const [checkedTypeChat, setCheckedTypeChat] = useState(false);

    useEffect(() => {
        if (curChat.status === PUBLIC_CHAT) {
            setCheckedTypeChat(false);
        } else setCheckedTypeChat(true);
    }, [curChat]);

    const handleShowModal = async () => {
        let arrMemberFetch = await getMemberRequest(curChat.id, accessToken, axiosJWT);

        setListMember(arrMemberFetch);
        setShowModal(true);
    };
    const handleHideModal = () => {
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
        if (listMember.length > 0) {
            let arrAdmin = listMember.filter((member) => {
                if (curChat.adminChat.includes(member.id) && inCludesString(searchValue, member.fullName)) {
                    member.isAdmin = true;
                    return true;
                }
                return false;
            });
            let arrMember = listMember.filter((member) => {
                if (!curChat.adminChat.includes(member.id) && inCludesString(searchValue, member.fullName)) return true;
                else return false;
            });
            let arrMemberFilter = [...arrAdmin, ...arrMember];
            return arrMemberFilter.map((item) => {
                return (
                    <label
                        htmlFor={item.id}
                        key={item.id}
                        className={cx('w-full h-14 hover:bg-lcn-blue-2 p-2 flex m-t-2 rounded-md items-center ')}
                    >
                        <>
                            <input
                                type="checkbox"
                                name="chkMember"
                                id={item.id}
                                className={cx('')}
                                onChange={getAllChecked}
                                value={item.id}
                                defaultChecked={false}
                            />
                            <Avartar src={item.profile.urlAvartar} className={cx('h-11 w-11 mr-2 ml-2')} />
                            <div className={cx()}>{item.fullName}</div>
                        </>
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

    const handleRequestMember = async (action) => {
        if (!!listChecked && listChecked.length > 0) {
            var dataNewChat = await requestMemberChat(curChat.id, listChecked, action, accessToken, axiosJWT);

            if (dataNewChat) {
                dispatch(currentChat(dataNewChat));
                setListChecked([]);
                setListMember([]);
                setShowModal(false);

                if (action === 'accept') {
                    for (let memberId of listChecked) {
                        var member = await getUserById(memberId, accessToken, axiosJWT);
                        saveMessSystem(dataNewChat.id, curUser.fullName + ' đã thêm ' + member.fullName);
                    }
                } else {
                    saveMessSystem(
                        dataNewChat.id,
                        listChecked.length + ' thành viên đã bị xoá khỏi danh sách chờ duyệt ',
                    );
                }
            }
        }
    };
    const handleChangeStatusChat = async (e) => {
        e.preventDefault();
        var status = PRIVATE_CHAT;
        if (curChat.status !== PUBLIC_CHAT) status = PUBLIC_CHAT;
        var newChatStatus = await changeStatusChat(curChat.id, status, accessToken, axiosJWT);
        if (newChatStatus) {
            dispatch(currentChat(newChatStatus));
        }
    };

    const renderModalShowMember = () => {
        return (
            <Modal isShow={showModal} className={cx('w-96 text-black p-2 overflow-hidden')} isHidden={handleHideModal}>
                <h4 className="text-center font-semibold border-b border-lcn-blue-3">Thành viên chờ duyệt</h4>
                <div className={cx('flex items-center justify-between h-12 p-1 ')}>
                    <div className="font-semibold">
                        Chế độ duyệt thành viên <br />
                        <i className="text-xs text-gray-500 font-light">
                            Nếu bật, thành viên vào nhóm phải được duyệt bởi quản trị viên
                        </i>
                    </div>

                    <label className="flex items-center cursor-pointer" onClick={handleChangeStatusChat}>
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="toggle"
                                className="sr-only"
                                checked={checkedTypeChat}
                                defaultChecked={false}
                            />

                            <div className={cx('block bg-gray-300 w-10 h-6 rounded-full', 'bg-toggle')}></div>

                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                        </div>
                    </label>
                </div>

                {curChat.status === PRIVATE_CHAT ? (
                    <>
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
                        <div className={cx('flex justify-between self-center border-t border-lcn-blue-2')}>
                            <Button
                                type="button"
                                className={cx('bg-lcn-1 p-1 pr-3 pl-3 text-white bg-red-400 bg-opacity-100')}
                                onClick={() => handleRequestMember('remove')}
                            >
                                Xoá thành viên
                            </Button>
                            <Button
                                type="button"
                                className={cx('bg-lcn-1 p-1 pr-3 pl-3 text-white bg-lcn-blue-4 bg-opacity-100')}
                                onClick={() => handleRequestMember('accept')}
                            >
                                Duyệt thành viên
                            </Button>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </Modal>
        );
    };
    return (
        <>
            <Button className={cx('flex   w-full  p-2 mb-2 hover:bg-lcn-blue-3')} onClick={handleShowModal}>
                <div className={cx('flex items-center')}>
                    <RiUserFollowLine className={cx('text-lcn-blue-4 w-7 h-7 ')} />{' '}
                    <span className={cx('  ml-4  w-4/5 ')}>Duyệt thành viên</span>
                </div>
            </Button>
            {renderModalShowMember()}
        </>
    );
}

export default memo(RequestMemberChat);
