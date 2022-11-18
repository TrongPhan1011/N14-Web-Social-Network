import classNames from 'classnames';

import Button from '~/components/Button';

import { useState, memo, useEffect } from 'react';

import Modal from '~/components/Modal';
import Avartar from '~/components/Avartar';

import { getAllFriend } from '~/services/userService';
import { addGroupChat } from '~/services/chatService';
import { inCludesString } from '~/lib/regexString';
import { currentChat } from '~/redux/Slice/sidebarChatSlice';
import { useDispatch } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { userLogin } from '~/redux/Slice/signInSlice';
import socket from '~/utils/getSocketIO';
import { addMess } from '~/services/messageService';

const cx = classNames;
function AddGroupChat({ accessToken, axiosJWT, curChat, curUser }) {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [listMember, setListMember] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [listChecked, setListChecked] = useState([]);

    useEffect(() => {
        const fectUser = async () => {
            let userLoginFetch = await getAllFriend(curUser.id, accessToken, axiosJWT);

            setListMember(userLoginFetch[0].friend);
        };
        if (showModal === true) fectUser();
    }, [showModal]);

    const handleShowModal = async () => {
        setShowModal(true);
    };
    const handleHideModal = () => {
        setListChecked([]);
        setListMember([]);
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
            let arrMember = listMember.filter((member) => {
                if (inCludesString(searchValue, member.fullName)) return true;
                else return false;
            });
            let arrMemberFilter = [...arrMember];
            return arrMemberFilter.map((item) => {
                return (
                    <label
                        htmlFor={item._id}
                        key={item._id}
                        className={cx('w-full h-14 hover:bg-lcn-blue-2 p-2 flex m-t-2 rounded-md items-center ')}
                    >
                        <input
                            type="checkbox"
                            name="chkMember"
                            id={item._id}
                            className={cx('')}
                            onChange={getAllChecked}
                            value={item._id}
                        />

                        <Avartar src={item.profile?.urlAvartar} className={cx('h-11 w-11 mr-2 ml-2')} />
                        <div className={cx()}>{item.fullName}</div>
                    </label>
                );
            });
        }
    };
    const handleSearchMember = (e) => {
        let valueSearch = e.target.value;
        setSearchValue(valueSearch);
    };
    const saveMess = async (newGroupFetch) => {
        var newMessSave = {
            title: 'Tạo nhóm thành công',
            authorID: curUser.id,
            seen: [{ id: curUser.id, seenAt: Date.now() }],
            type_mess: 'system',
            idChat: newGroupFetch.newChat.id,
            status: 1,
            file: [],
        };
        if (!!newMessSave) {
            var messData = await addMess(newMessSave, accessToken, axiosJWT);

            socket.emit('sendMessage', {
                receiverId: curChat.id,
                contentMessage: messData,
            });
        }
    };

    const handleAddGroupChat = async () => {
        if (!!listChecked && listChecked.length > 1) {
            var newGroup = {
                name: 'Cuộc trò chuyện mới',
                userCreate: curUser.id,
                avatar: '',
                adminChat: [curUser.id],
                typeChat: 'group',
                member: [curUser.id, ...listChecked],
            };

            var newGroupFetch = await addGroupChat(newGroup, accessToken, axiosJWT);

            if (newGroupFetch) {
                dispatch(userLogin(newGroupFetch.userLogin));
                dispatch(currentChat(newGroupFetch.newChat));

                setListChecked([]);
                setListMember([]);
                setShowModal(false);
                alert('Tạo cuộc trò chuyện thành công');
                saveMess(newGroupFetch);
            }
        } else alert('Vui lòng chọn ít nhất 2 thành viên để tạo nhóm');
    };

    const renderModalShowMember = () => {
        if (listMember.length > 0) {
            return (
                <Modal isShow={showModal} className={cx('w-96 text-black p-2 overflow-hidden')}>
                    <h4 className="text-center font-semibold border-b border-lcn-blue-3">Tạo cuộc trò chuyện mới</h4>
                    <div
                        className={cx(
                            'border border-lcn-blue-4 rounded-3xl w-full h-11 flex items-center p-1 pr-4 pl-4 mt-2',
                        )}
                    >
                        <input
                            type="text"
                            placeholder="Tìm kiếm bạn bè"
                            className={cx('outline-none w-full h-full caret-lcn-blue-4')}
                            onChange={handleSearchMember}
                        />
                    </div>
                    <div className={cx('h-3/4 w-full overflow-scroll p-2')}>{renderItemMember()}</div>
                    <div className={cx('flex justify-between self-end border-t border-lcn-blue-2')}>
                        <Button
                            type="button"
                            className={cx('bg-slate-400 p-1 pr-3 pl-3 text-white text-sm')}
                            onClick={handleHideModal}
                        >
                            Huỷ
                        </Button>
                        <Button
                            type="button"
                            className={cx('bg-lcn-1 p-1 pr-3 pl-3 text-white bg-lcn-blue-4 bg-opacity-100')}
                            onClick={handleAddGroupChat}
                        >
                            Tạo cuộc trò chuyện
                        </Button>
                    </div>
                </Modal>
            );
        }
    };
    return (
        <>
            <Button
                className={cx(
                    'w-10 rounded-full m-0 flex justify-center items-center h-10 bg-lcn-blue-3 ',
                    'hover:text-white ',
                )}
                onClick={handleShowModal}
            >
                <BiEdit className={cx('text-2xl text-lcn-blue-4')} />
            </Button>
            {renderModalShowMember()}
        </>
    );
}

export default memo(AddGroupChat);
