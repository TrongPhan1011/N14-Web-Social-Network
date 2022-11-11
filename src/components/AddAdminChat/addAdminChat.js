import classNames from 'classnames';

import Button from '~/components/Button';

import { useState, memo, useEffect } from 'react';

import Modal from '~/components/Modal';
import Avartar from '~/components/Avartar';

import { addAdminToChat } from '~/services/chatService';
import { inCludesString } from '~/lib/regexString';
import { currentChat } from '~/redux/Slice/sidebarChatSlice';
import { useDispatch } from 'react-redux';
import { getMemberOfChat } from '~/services/chatService';
import { MdOutlineSecurity } from 'react-icons/md';

const cx = classNames;
function AddAdminChat({ accessToken, axiosJWT, curChat, curUser }) {
    const dispatch = useDispatch();

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
                        {item.isAdmin ? (
                            <>
                                <span className="w-3"></span>
                                <Avartar src={item.profile.urlAvartar} className={cx('h-11 w-11 mr-2 ml-2')} />
                                <div className={cx()}>{item.fullName}</div>
                                <span className="font-semibold text-xs text-lcn-blue-4 bg-lcn-blue-1 p-1 rounded-3xl">
                                    Quản trị viên
                                </span>
                            </>
                        ) : (
                            <>
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
                            </>
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

    const handleAddMember = async () => {
        if (!!listChecked && listChecked.length > 0) {
            var dataNewChat = await addAdminToChat(curChat.id, listChecked, accessToken, axiosJWT);

            if (dataNewChat) {
                dispatch(currentChat(dataNewChat));
                setListChecked([]);
                setListMember([]);
                setShowModal(false);
                alert('Đã cập nhật thông tin quản trị viên');
            }
        }
    };

    const renderModalShowMember = () => {
        if (listMember.length > 0) {
            return (
                <Modal
                    isShow={showModal}
                    className={cx('w-96 text-black p-2 overflow-hidden')}
                    isHidden={handleHideModal}
                >
                    <h4 className="text-center font-semibold border-b border-lcn-blue-3">Thêm thành viên nhóm</h4>
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
                            className={cx('bg-lcn-1 p-1 pr-3 pl-3 text-white bg-lcn-blue-4 bg-opacity-100')}
                            onClick={handleAddMember}
                        >
                            Thêm quyền quản trị viên
                        </Button>
                    </div>
                </Modal>
            );
        }
        return <></>;
    };
    return (
        <>
            <Button className={cx('flex   w-full  p-2 mb-2 hover:bg-lcn-blue-3')} onClick={handleShowModal}>
                <div className={cx('flex items-center')}>
                    <MdOutlineSecurity className={cx('text-lcn-blue-4 w-7 h-7 ')} />
                    <span className={cx('  ml-4  w-4/5 ')}>Quyền quản trị viên</span>
                </div>
            </Button>
            {renderModalShowMember()}
        </>
    );
}

export default memo(AddAdminChat);
