import classNames from 'classnames';
import { HiOutlineUserGroup } from 'react-icons/hi';

import Button from '~/components/Button';

import { getMemberOfChat } from '~/services/chatService';
import { useState, memo } from 'react';
import config from '~/configRoutes';
import Modal from '~/components/Modal';
import Avartar from '~/components/Avartar';
import { inCludesString } from '~/lib/regexString';

const cx = classNames;
function ShowMemberChat({ accessToken, axiosJWT, curChat, curUser }) {
    const [showModal, setShowModal] = useState(false);
    const [listMember, setListMember] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const handleShowModal = async () => {
        let arrMemberFetch = await getMemberOfChat(curChat.id, accessToken, axiosJWT);

        setListMember(arrMemberFetch);

        setShowModal(true);
    };
    const handleHideModal = () => {
        setShowModal(false);
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
                    <div
                        key={item.id}
                        className={cx('w-full h-14 hover:bg-lcn-blue-2 p-2 flex m-t-2 rounded-md items-center')}
                    >
                        <Avartar src={item.profile.urlAvartar} className={cx('h-11 w-11')} />
                        <Button to={config.routeConfig.profile + `?id=${item.id}`} className={cx()} target="_blank">
                            {item.fullName}
                        </Button>
                        {item.isAdmin ? (
                            <span className="font-semibold text-xs text-lcn-blue-4 bg-lcn-blue-1 p-1 rounded-3xl">
                                Quản trị viên
                            </span>
                        ) : (
                            <></>
                        )}
                    </div>
                );
            });
        }
    };
    const handleSearchMember = (e) => {
        let valueSearch = e.target.value;
        setSearchValue(valueSearch);
    };

    const renderModalShowMember = () => {
        if (listMember.length > 0) {
            return (
                <Modal
                    isShow={showModal}
                    isHidden={handleHideModal}
                    className={cx('w-96 text-black p-2 overflow-hidden')}
                >
                    <h4 className="text-center font-semibold border-b border-lcn-blue-3">
                        Thành viên nhóm ({listMember.length})
                    </h4>
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
                    <div className={cx('h-full w-full overflow-scroll p-2')}>{renderItemMember()}</div>
                </Modal>
            );
        }
        return <></>;
    };
    return (
        <>
            <Button type="button" className={cx('flex   w-full  p-2 hover:bg-lcn-blue-3')} onClick={handleShowModal}>
                <div className={cx('flex items-center')}>
                    <HiOutlineUserGroup className={cx('text-lcn-blue-4 w-7 h-7 ')} />{' '}
                    <span className={cx('  ml-4  w-4/5 ')}>Xem thành viên</span>
                </div>
            </Button>
            {renderModalShowMember()}
        </>
    );
}

export default memo(ShowMemberChat);
