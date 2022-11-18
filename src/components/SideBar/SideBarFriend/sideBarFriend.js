import classNames from 'classnames';
import { useState, useEffect } from 'react';

import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import ItemChat from '~/components/ItemChat';

import ListItem from '~/components/ListItem';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import { FaTimes } from 'react-icons/fa';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { getChatByIdMember } from '~/services/chatService';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames;

function SideBarFriend({ count, countWaiting }) {
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var currChat = useSelector((state) => state.sidebarChatSlice.currentChat);

    const userLoginData = useSelector((state) => state.persistedReducer.signIn.userLogin);
    const [tabChange, setTabChange] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [chatResult, setChatResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleHideModal = () => {
        setShowModal(false);
    };
    useEffect(() => {
        var axiosJWT = getAxiosJWT(dispatch, currAccount);
        const fetchChat = async () => {
            const arrChat = await getChatByIdMember(userLoginData.id, currAccount.accessToken, axiosJWT);

            if (!!arrChat) {
                setChatResult(
                    arrChat.filter((item) => {
                        return item.typeChat === 'group';
                    }),
                );
            }
        };
        fetchChat();
    }, [userLoginData]);
    console.log(chatResult);
    const renderGroupChat = () => {
        return chatResult
            .filter((item) => {
                return item.name.toLowerCase().includes(searchValue);
            })
            .map((item) => {
                return <ItemChat key={item.id} groupChat={item} userLoginData={userLoginData} />;
            });
    };
    return (
        <div className={cx('p-2 h-screen flex flex-col')}>
            <Modal isShow={showModal} isHidden={handleHideModal} className={'w-[280px]'}>
                <div className={cx('relative flex items-center p-4 border-b border-lcn-blue-2')}>
                    <p className={cx('w-full text-lg text-lcn-blue-4 font-semibold text-center')}>Danh sách nhóm</p>
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
                            placeholder="Tìm kiếm nhóm"
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cx('w-full h-3/4  overflow-y-auto p-3')}>{renderGroupChat()}</div>
            </Modal>
            <Button
                className={cx(
                    'w-full m-0 p-2 mb-1 mt-1 h-16 flex items-center cursor-pointer',
                    'rounded-xl hover:bg-lcn-blue-3',
                )}
                onClick={handleShowModal}
            >
                <div
                    className={cx(
                        'h-10 w-10 text-3xl text-lcn-blue-4 flex justify-center items-center ',
                        'rounded-full border border-lcn-blue-4 border-opacity-50',
                    )}
                >
                    <AiOutlineUsergroupAdd />
                </div>
                <div className={cx('h-full ml-2 w-48 flex items-center text-lg ')}>Danh sách nhóm</div>
            </Button>
            <div className={cx('h-10 w-full text-2xl text-lcn-blue-5')}>
                <h1>Bạn bè ({count})</h1>
            </div>
            <div className={cx('h-10 w-full flex justify-around')}>
                <Button
                    className={cx(
                        'rounded-lcn-login-input ml-2 border w-20 h-8 flex items-center  justify-center',
                        'text-lcn-blue-4 border border-lcn-blue-4',
                        'hover:bg-lcn-blue-4 hover:text-white',
                    )}
                    onClick={() => setTabChange(true)}
                >
                    {!tabChange ? (
                        <div className={cx('h-full w-full p-0')}>Tất cả</div>
                    ) : (
                        <div className={cx('rounded-lcn-login-input p-0 h-full w-full bg-lcn-blue-4 text-white')}>
                            Tất cả
                        </div>
                    )}
                </Button>
                <Button
                    className={cx(
                        'p-0 rounded-lcn-login-input border w-36 h-8 flex items-center  justify-center',
                        'text-lcn-blue-4 border-lcn-blue-4',
                        'hover:bg-lcn-blue-4 hover:text-white ',
                    )}
                    onClick={() => setTabChange(false)}
                >
                    {!tabChange ? (
                        <div className={cx('rounded-lcn-login-input p-0 h-full w-full bg-lcn-blue-4 text-white')}>
                            Chờ xác nhận
                        </div>
                    ) : (
                        <div className={cx('h-full w-full p-0')}>Chờ xác nhận({countWaiting})</div>
                    )}
                </Button>
            </div>
            <div className={cx('w-full h-[556px] ')}>
                {tabChange ? <ListItem type="banBe" /> : <ListItem type="choXacNhan" />}
            </div>
        </div>
    );
}

export default SideBarFriend;
