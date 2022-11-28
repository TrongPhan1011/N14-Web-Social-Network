import { useEffect, useState, memo, useCallback } from 'react';

import classNames from 'classnames/bind';

import { getUserById, addFriend, declineFriend } from '~/services/userService';
import { getAllFriend } from '~/services/userService';

import { useSelector, useDispatch } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { userLogin } from '~/redux/Slice/signInSlice';
import { currentChat } from '~/redux/Slice/sidebarChatSlice';
import { getInboxByIdFriend } from '~/services/chatService';
import Dropdown from '~/components/Dropdown';
import ItemDropdown from '~/components/Dropdown/ItemDropdown';
import styles from './ContentProfile.module.scss';
import HeaderProfile from '~/components/HeaderProfile';
import Button from '~/components/Button';
import SubProfile from '~/components/SubProfile';
import { AiOutlineUsergroupAdd, AiOutlineUserDelete } from 'react-icons/ai';
import { RiChat3Line } from 'react-icons/ri';
import { lcnImage } from '~/image';
import Post from '~/components/Post';
import { acceptFriend } from '~/services/userService';
import { useNavigate } from 'react-router-dom';
import config from '~/configRoutes';

const cx = classNames.bind(styles);

function ContentProfile({ userId }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [hiddenMenu, setHiddenMenu] = useState('hidden');
    const [showMenu, setShowMenu] = useState(false);
    const [userProfile, setUserProfile] = useState({});
    const [profile, setProfile] = useState({});
    const [birthday, setBirthday] = useState();
    const [active, setActive] = useState('');
    const [inRelationship, setInRelationship] = useState('');
    const [userFriend, setUserFriend] = useState([]);
    const [count, setCount] = useState(0);

    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    useEffect(() => {
        const getProfile = async () => {
            const getUserProfile = await getUserById(userId, accessToken, axiosJWT, dispatch);
            const getCurrentUserProfile = await getUserById(curUser.id, accessToken, axiosJWT, dispatch);
            dispatch(userLogin(getCurrentUserProfile));

            if (!getUserProfile) {
                navigate(config.routeConfig + '404page');
            }
            setUserProfile(getUserProfile);
            setProfile(getUserProfile?.profile);

            var date = getUserProfile.birthday.split('-');
            var myDate = `${date[2]}-${date[1]}-${date[0]}`;
            setBirthday(myDate);
            if (curUser.id === userId) {
                setActive('hidden');
            } else {
                setActive('');
            }
            var obj = curUser.friend.find((o) => o.id === userId);

            if (!!obj && obj.id === userId && obj.status === 1) {
                setInRelationship('Bạn bè');
            } else if (!!obj && obj.id === userId && obj.status === 2) {
                setInRelationship('Đang gửi lời mời');
            } else if (!!obj && obj.id === userId && obj.status === 0) {
                setInRelationship('Chấp nhận kết bạn');
            } else if (!!obj && obj.id === userId && obj.status === -1) {
                navigate(config + '404page');
            } else if (!!obj && obj.id === userId && obj.status === -2) {
                navigate(config + '404page');
            } else {
                setInRelationship('Kết bạn');
            }
            setCount(0);
            for (var i = 0; i <= getUserProfile.friend.length; i++) {
                if (getUserProfile.friend[i]?.status === 1) {
                    setCount((prev) => prev + 1);
                }
            }
        };

        getProfile();
    }, [userId]);
    console.log(userProfile.email);
    useEffect(() => {
        const getListFriend = async () => {
            const friendByStatus = await getAllFriend(userId, accessToken, axiosJWT);

            setUserFriend(friendByStatus[0].friend);
        };

        getListFriend();
    }, [userId]);

    const handleKetBan = async () => {
        var ketBan = await addFriend(curUser.id, userId, accessToken, axiosJWT, dispatch);
        if (!!ketBan) {
            setInRelationship('Đang gửi lời mời');
        }
    };
    const handleChapNhanKetBan = async () => {
        await acceptFriend(curUser.id, userId, accessToken, axiosJWT, dispatch);
        setInRelationship('Bạn bè');
    };
    const handleHuyKetBan = async () => {
        var huyKetBan = await declineFriend(curUser.id, userId, accessToken, axiosJWT, dispatch);
        if (!!huyKetBan) {
            setInRelationship('Kết bạn');
        }
    };
    const handleBanBe = () => {
        if (inRelationship === 'Kết bạn') {
            handleKetBan();
        } else if (inRelationship === 'Bạn bè') {
            handleShowMenu();
        } else if (inRelationship === 'Chấp nhận kết bạn') {
            handleChapNhanKetBan();
        } else if (inRelationship === 'Đang gửi lời mời') {
            handleHuyKetBan();
        }
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

    const renderData = () => {
        return (
            <>
                <ItemDropdown
                    className={cx('rounded-md text-red-500 font-medium', 'hover:bg-red-100', 'active:bg-red-200')}
                    onClick={handleHuyKetBan}
                >
                    <AiOutlineUserDelete className="text-xl text-red-500 mr-3" />
                    Huỷ kết bạn
                </ItemDropdown>
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
                {renderData()}
            </div>
        );
    };
    const handleInbox = async () => {
        var inboxChat = await getInboxByIdFriend(curUser.id, userId, accessToken, axiosJWT);
        dispatch(currentChat(inboxChat));
        navigate(config.routeConfig.home);
    };
    return (
        <div className={cx(' w-full h-full  flex overflow-hidden justify-center items-center')}>
            <div className={cx(' w-full h-screen bg-white flex flex-col items-center   overflow-y-scroll')}>
                <HeaderProfile
                    avatar={profile?.urlAvartar}
                    coverPhoto={profile?.urlCoverPhoto}
                    userName={userProfile?.fullName}
                    active={active}
                />
                <div className={cx('mb-3 w-full h-14 flex justify-center')}>
                    <div className={cx('w-1/4 h-full flex flex-row justify-between ')}>
                        <Dropdown render={handleLoadMenu} visible={showMenu} hidden={handleHiddenMenu}>
                            <div>
                                <Button
                                    className={cx(
                                        'bg-lcn-blue-3 justify-center items-center w-28 font-[400] h-10 text-lcn-blue-4 border border-lcn-blue-3',
                                        active,
                                    )}
                                    onClick={handleBanBe}
                                >
                                    <AiOutlineUsergroupAdd className={cx('mr-1')} />
                                    {inRelationship}
                                </Button>
                            </div>
                        </Dropdown>
                        <Button
                            className={cx(
                                'bg-lcn-green-1 bg-opacity-20 border font-[400] border-lcn-green-1 border-opacity-25 justify-center items-center w-28 h-10 text-lcn-green-1 hover:bg-opacity-30',
                                'active:bg-opacity-40',
                                active,
                            )}
                            onClick={handleInbox}
                        >
                            <RiChat3Line className={cx('mr-1')} /> Nhắn tin
                        </Button>
                    </div>
                </div>
                <div className={cx('w-full h-full bg-lcn-blue-1')}>
                    <div className={cx('w-full  p-3 flex flex-row justify-around')}>
                        <SubProfile
                            data={userProfile}
                            profile={profile}
                            birthday={birthday}
                            email={userProfile.email}
                        />
                        <SubProfile type="banbe" soLuongBan={count} listFriend={userFriend} userId={userId} />
                        <SubProfile type="img" soLuongAnh="11" />
                    </div>
                </div>
                <div className={cx('w-full bg-lcn-blue-1 m-2 flex flex-col items-center')}>
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>
        </div>
    );
}

export default memo(ContentProfile);
