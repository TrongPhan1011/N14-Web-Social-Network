import classNames from 'classnames';
import { useState, memo } from 'react';
import Button from '~/components/Button';
import { lcnImage } from '~/image';
import { acceptFriend, declineFriend } from '~/services/userService';
import { addGroupChat } from '~/services/chatService';
import { useSelector, useDispatch } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { currentChat } from '~/redux/Slice/sidebarChatSlice';
import { userLogin } from '~/redux/Slice/signInSlice';
import routeConfig from '~/configRoutes';

const cx = classNames;

function ItemChoXacNhan({ friendName, friendId, friendAva }) {
    const dispatch = useDispatch();
    const _route = routeConfig.routeConfig;
    var profile = _route.profile + '?id=' + friendId;
    var img = lcnImage.avatarDefault;

    if (friendAva) {
        img = friendAva;
    }
    const [xacNhan, setXacNhan] = useState(true);
    const [dongY, setDongY] = useState(true);
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);
    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;

    const handleDongY = async () => {
        await acceptFriend(curUser.id, friendId, accessToken, axiosJWT, dispatch);
        var newGroup = {
            name: ' ',
            userCreate: curUser.id,
            avatar: friendAva,

            typeChat: 'inbox',
            member: [curUser.id, friendId],
        };
        var newGroupFetch = await addGroupChat(newGroup, accessToken, axiosJWT);
        if (!!newGroupFetch) {
            dispatch(userLogin(newGroupFetch.userLogin));
            dispatch(currentChat(newGroupFetch.newChat));
            alert('Bạn đã có thể nhắn tin với người này');
        }
    };
    const handleTuchoi = async () => {
        await declineFriend(curUser.id, friendId, accessToken, axiosJWT, dispatch);
    };
    const handleXacNhan = () => {
        if (dongY) {
            handleDongY();
            return (
                <div className={cx('text-white text-xs flex flex-row justify-between text-left h-10')}>
                    <Button
                        className={cx(
                            'w-40 text-gray-500 border-gray-500 m-0 rounded-2xl border  h-5 bg-white flex items-center  justify-center bg-opacity-100 hover:bg-opacity-100',
                            'cursor-not-allowed',
                        )}
                        disabled
                    >
                        Đã đồng ý
                    </Button>
                </div>
            );
        } else {
            handleTuchoi();
            return (
                <div className={cx('text-white text-xs flex flex-row justify-between text-left h-10')}>
                    <Button
                        className={cx(
                            'w-40 text-gray-500 border-gray-500 m-0 rounded-2xl border  h-5 bg-white flex items-center  justify-center bg-opacity-100 hover:bg-opacity-100',
                            'cursor-not-allowed',
                        )}
                        disabled
                    >
                        Đã xoá yêu cầu
                    </Button>
                </div>
            );
        }
    };
    return (
        <Button to={profile} className={cx('rounded-xl h-16 w-full hover:bg-lcn-blue-3 m-0 p-2 mb-1 mt-1')}>
            <div className={cx('relative w-full h-full flex items-center')}>
                <div
                    className={cx(
                        'w-10 h-10 bg-lcn-blue-4 rounded-full overflow-hidden flex justify-center items-center p-1 relative',
                    )}
                >
                    <img src={img} alt="avartar" className={cx('w-full h-full border ')} />
                </div>
                <div className={cx('w-48  h-full ml-2 overflow-hidden')}>
                    <div className={cx('text-left mb-1 text-lcn-blue-5 font-semibold h-6 w-96 ')}>{friendName}</div>

                    {xacNhan ? (
                        <div className={cx('text-white text-xs flex flex-row justify-between text-left h-10')}>
                            <Button
                                className={cx(
                                    'w-20  m-0 rounded-2xl border border-lcn-blue-4 h-5 bg-lcn-blue-4 flex items-center  justify-center bg-opacity-100 hover:bg-opacity-100',
                                )}
                                onClick={() => {
                                    setXacNhan(false);
                                    setDongY(true);
                                }}
                            >
                                Đồng ý
                            </Button>
                            <Button
                                className={cx(
                                    'w-20 m-0 rounded-2xl h-5 border border-red-500  bg-red-400  flex items-center justify-center bg-opacity-100 hover:bg-opacity-100',
                                )}
                                onClick={() => {
                                    setXacNhan(false);
                                    setDongY(false);
                                }}
                            >
                                Xoá
                            </Button>
                        </div>
                    ) : (
                        handleXacNhan()
                    )}
                </div>
            </div>
        </Button>
    );
}

export default memo(ItemChoXacNhan);
