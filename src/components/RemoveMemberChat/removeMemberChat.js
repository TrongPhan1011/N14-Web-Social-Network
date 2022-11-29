import classNames from 'classnames';

import Button from '~/components/Button';

import { useState, memo } from 'react';

import Modal from '~/components/Modal';
import Avartar from '~/components/Avartar';

import { removeMemberChat } from '~/services/chatService';
import { inCludesString } from '~/lib/regexString';

import { getMemberOfChat } from '~/services/chatService';

import { AiOutlineUserDelete } from 'react-icons/ai';
import { addMess } from '~/services/messageService';
import socket from '~/utils/getSocketIO';
import { getUserById } from '~/services/userService';

const cx = classNames;
function RemoveMemberChat({ accessToken, axiosJWT, curChat, curUser }) {
    const [showModal, setShowModal] = useState(false);
    const [listMember, setListMember] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [listChecked, setListChecked] = useState([]);

    const handleShowModal = async () => {
        let arrMemberFetch = await getMemberOfChat(curChat.id, accessToken, axiosJWT);

        setListMember(arrMemberFetch);
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
            let arrAdmin = listMember.filter((member) => {
                if (curChat.adminChat.includes(member.id) && inCludesString(searchValue, member.fullName)) {
                    member.isAdmin = true;
                    return true;
                }
                return false;
            });
            arrAdmin = arrAdmin.filter((admin) => admin.id !== curUser.id);

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
                        <input
                            type="checkbox"
                            name="chkMember"
                            id={item.id}
                            className={cx('')}
                            onChange={getAllChecked}
                            value={item.id}
                        />
                        <Avartar src={item.profile.urlAvartar} className={cx('h-11 w-11 mr-2 ml-2')} />
                        <div className={cx()}>{item.fullName}</div>
                        {item.isAdmin ? (
                            <span className="font-semibold text-xs text-yellow-500 bg-yellow-50 border-yellow-200 border p-1 ml-2 rounded-3xl">
                                Quản trị viên
                            </span>
                        ) : (
                            <></>
                        )}
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
            messData = {
                ...messData,
                authorID: {
                    id: curUser.id,
                    fullName: curUser.fullName,
                    profile: {
                        urlAvartar: curUser.profile.urlAvartar,
                    },
                },
            };
            socket.emit('sendMessage', {
                receiverId: id,
                contentMessage: messData,
            });
        }
    };

    const handleRemoveMember = async () => {
        if (!!listChecked && listChecked.length > 0) {
            var confirmRemoveMember = window.confirm('Bạn có chắc muốn xoá người này ra khỏi nhóm không');
            if (confirmRemoveMember) {
                var dataNewChat = await removeMemberChat(curChat.id, listChecked, accessToken, axiosJWT);

                if (dataNewChat) {
                    setListChecked([]);
                    setListMember([]);
                    setShowModal(false);

                    for (let memberId of listChecked) {
                        var member = await getUserById(memberId, accessToken, axiosJWT);
                        saveMessSystem(dataNewChat.id, member.fullName + ' đã bị xoá khỏi nhóm');
                    }
                }
            }
        } else alert('Bạn chưa chọn thành viên cần xoá');
    };

    const renderModalShowMember = () => {
        if (listMember.length > 0) {
            return (
                <Modal
                    isShow={showModal}
                    className={cx('w-96 text-black p-2 overflow-hidden')}
                    isHidden={handleHideModal}
                >
                    <h4 className="text-center font-semibold border-b border-lcn-blue-3">Xoá thành viên khỏi nhóm</h4>
                    <div
                        className={cx(
                            'border border-lcn-blue-4 rounded-3xl w-full h-11 flex items-center p-1 pr-4 pl-4 mt-2',
                        )}
                    >
                        <input
                            type="text"
                            placeholder="Tìm thành viên"
                            className={cx('outline-none w-full h-full caret-lcn-blue-4')}
                            onChange={handleSearchMember}
                        />
                    </div>
                    <div className={cx('h-3/4 w-full overflow-scroll p-2')}>{renderItemMember()}</div>
                    <div className={cx('flex justify-end self-center border-t border-lcn-blue-2')}>
                        <Button
                            type="button"
                            className={cx('bg-lcn-1 p-1 pr-3 pl-3 text-white bg-red-500 bg-opacity-100')}
                            onClick={handleRemoveMember}
                        >
                            Xoá thành viên
                        </Button>
                    </div>
                </Modal>
            );
        }
        return <></>;
    };
    return (
        <>
            <Button className={cx('flex   w-full p-2 mb-2 hover:bg-red-100')} onClick={handleShowModal}>
                <div className={cx('flex items-center')}>
                    <AiOutlineUserDelete className={cx('text-red-500 w-7 h-7 ')} />{' '}
                    <span className={cx('  ml-4  w-4/5 text-red-500 ')}>Xoá thành viên</span>
                </div>
            </Button>
            {renderModalShowMember()}
        </>
    );
}

export default memo(RemoveMemberChat);
