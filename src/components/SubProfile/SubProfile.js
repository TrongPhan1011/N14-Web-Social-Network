import { memo, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import GioiThieu from '~/components/GioiThieu';
import CardFriend from '~/components/CardFriend';
import CardImg from '~/components/CardImg';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import ItemBanBe from '~/components/ItemBanBe';

import { FaTimes } from 'react-icons/fa';
const cx = classNames;

function SubProfile({ type, soLuongBan, soLuongAnh, data, profile, birthday, listFriend, userId, email }) {
    const [showModal, setShowModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    // const [listItem, setListItem] = useState([]);
    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;

    var Comp = GioiThieu;
    var title = 'Thông tin chung';
    var soLuong = '';
    var list = [];
    if (type === 'banbe') {
        Comp = CardFriend;
        title = 'Bạn bè';
        soLuong = `(${soLuongBan})`;
        list = listFriend;
    }
    if (type === 'img') {
        Comp = CardImg;
        title = 'Hình ảnh';
        soLuong = `(${soLuongAnh})`;
    }

    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleHideModal = () => {
        setShowModal(false);
    };

    const renderSubProfile = () => {
        if (Comp === GioiThieu) {
            return renderSubGioiThieu();
        } else if (Comp === CardFriend) {
            // setXemThem('opacity-1');
            return renderSubBanBe();
        } else if (Comp === CardImg) {
            return renderSubHinhAnh();
        }
    };
    const renderSubGioiThieu = () => {
        return <Comp gender={data?.gender} birthday={birthday} education={profile?.education} email={email} />;
    };
    const renderSubBanBe = () => {
        return <Comp list={list} />;
    };
    const renderSubHinhAnh = () => {
        return <Comp />;
    };
    const renderAllFriend = () => {
        console.log(list);
        return list
            .filter((item) => {
                return item.fullName.toLowerCase().includes(searchValue);
            })
            .map((item) => {
                return (
                    <ItemBanBe
                        key={item.id}
                        userId={item._id}
                        name={item.fullName}
                        avt={item?.profile?.urlAvartar}
                        onClick={handleHideModal}
                    />
                );
            });
    };
    return (
        <div className={cx('w-[300px] h-[324px] bg-white m-3 rounded-2xl flex flex-col justify-center items-center ')}>
            <Modal isShow={showModal} isHidden={handleHideModal} className={'w-[280px]'}>
                <div className={cx('relative flex items-center p-4 border-b border-lcn-blue-2')}>
                    <p className={cx('w-full text-lg text-lcn-blue-4 font-semibold text-center')}>Danh sách bạn bè</p>
                    <div className={cx('absolute ')}>
                        <Button
                            className={cx(' text-red-500 hover:text-white hover:bg-red-500')}
                            onClick={handleHideModal}
                        >
                            <FaTimes />
                        </Button>
                    </div>
                </div>
                <div className={cx('w-full  items-center flex justify-center p-3')}>
                    <div className={cx('w-full h-10 flex rounded-3xl  border border-lcn-blue-4 ')}>
                        <input
                            type="text"
                            className={cx('w-full h-full  outline-none rounded-3xl pl-3 pr-2 caret-lcn-blue-4')}
                            placeholder="Tìm kiếm người dùng"
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cx('w-full h-3/4  overflow-y-auto p-3')}>{renderAllFriend()}</div>
            </Modal>
            <div className={cx('text-lg font-semibold w-full text-lcn-blue-5 pt-5 flex justify-center h-12')}>
                {title}
                <span>{soLuong}</span>
            </div>
            <div className={cx('h-[228px] w-full')}>{renderSubProfile()}</div>
            {type === 'banbe' && curUser.id !== userId ? (
                <Button
                    className={cx(
                        'w-full h-[48px] flex justify-center text-[#0662BA] font-semibold hover:bg-lcn-blue-2',
                        'items-center',
                    )}
                    onClick={handleShowModal}
                >
                    Xem thêm
                </Button>
            ) : (
                <Button
                    className={cx(
                        'w-full h-[48px] flex justify-center text-[#0662BA] font-semibold hover:bg-lcn-blue-2',
                        'items-center opacity-0 pointer-events-none',
                    )}
                >
                    Xem thêm
                </Button>
            )}
        </div>
    );
}

export default memo(SubProfile);
