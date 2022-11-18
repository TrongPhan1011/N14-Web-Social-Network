import classNames from 'classnames';
import { HiOutlinePaperClip, HiOutlineTrash } from 'react-icons/hi';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiEdit, BiLogOutCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';

import { memo } from 'react';

import HeaderProfile from '~/components/HeaderProfile';
import ShowMemberChat from '~/components/ShowMemberChat';
import AddMemberChat from '~/components/AddMemberChat';
import { RiChatPrivateLine } from 'react-icons/ri';

import AddAdminChat from '~/components/AddAdminChat';
import RequestMemberChat from '~/components/RequestMemberChat';
import RemoveMemberChat from '~/components/RemoveMemberChat';
import { leaveChat, removeChat, changeNameChat } from '~/services/chatService';
import { userLogin } from '~/redux/Slice/signInSlice';
import { removeCurrentChat } from '~/redux/Slice/sidebarChatSlice';
import FormConfirm from '~/components/FormConfirm';

const cx = classNames;
function Group() {
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    var curChat = useSelector((state) => state.sidebarChatSlice.currentChat);

    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;

    const handleLeaveChat = async () => {
        var confirmRemoveMember = window.confirm('Bạn có chắc muốn rời nhóm không?');
        if (confirmRemoveMember) {
            var newUser = await leaveChat(curChat.id, curUser.id, accessToken, axiosJWT);

            if (!!newUser) {
                dispatch(removeCurrentChat(null));
                dispatch(userLogin(newUser));
                alert('Bạn đã rời nhóm');
            }
        }
    };

    const handleRemoveChat = async (value) => {
        if (value === 'Xác nhận') {
            var newCurrUser = await removeChat(curChat.id, curUser.id, accessToken, axiosJWT);

            if (!!newCurrUser) {
                dispatch(userLogin(newCurrUser));
            }
            alert('Nhóm đã xoá thành công');
        } else alert('Thông tin xác nhận không đúng');
    };
    const changeNameOfChat = async (value) => {
        if (!!value) {
            var newCurrUser = await changeNameChat(curChat.id, value, curUser.id, accessToken, axiosJWT);

            console.log(newCurrUser);
            if (!!newCurrUser) {
                dispatch(userLogin(newCurrUser));
                alert('Đổi tên nhóm thành công');
            }
        } else alert('Thông tin xác nhận không đúng');
    };

    const renderFuctionalAdmin = () => {
        if (curChat.adminChat.includes(curUser.id)) {
            return (
                <details className="w-full p-0  mb-2">
                    <summary className={cx('flex   w-full  p-1 hover:bg-yellow-100 rounded-3xl')}>
                        <div className={cx('flex items-center')}>
                            <AiOutlineSetting className={cx('text-yellow-500 w-7 h-7 ')} />{' '}
                            <span className={cx('  ml-4  w-4/5 text-yellow-500')}>Quản lý nhóm</span>
                        </div>
                    </summary>
                    <div className={cx('w-full bg-yellow-100 bg-opacity-50 rounded-lg p-2 pl-1')}>
                        <AddAdminChat
                            accessToken={accessToken}
                            axiosJWT={axiosJWT}
                            curChat={curChat}
                            curUser={curUser}
                        />

                        <RequestMemberChat
                            accessToken={accessToken}
                            axiosJWT={axiosJWT}
                            curChat={curChat}
                            curUser={curUser}
                        />
                        <Button className={cx('flex   w-full  p-2 mb-2 hover:bg-lcn-blue-3')}>
                            <div className={cx('flex items-center')}>
                                <RiChatPrivateLine className={cx('text-lcn-blue-4 w-7 h-7 ')} />{' '}
                                <span className={cx('  ml-4  w-4/5 ')}>Quyền gửi tin nhắn</span>
                            </div>
                        </Button>
                        <RemoveMemberChat
                            accessToken={accessToken}
                            axiosJWT={axiosJWT}
                            curChat={curChat}
                            curUser={curUser}
                        />
                        <FormConfirm
                            title="Xác nhận xoá nhóm"
                            nameChat={curChat.name}
                            text={'Nhập vào "Xác nhận" để chắc chắn bạn muốn xoá nhóm này'}
                            onAccept={handleRemoveChat}
                        >
                            <Button type="button" className={cx('flex   w-full p-2 mb-2 hover:bg-red-100')}>
                                <div className={cx('flex items-center')}>
                                    <HiOutlineTrash className={cx('text-red-500 w-7 h-7 ')} />{' '}
                                    <span className={cx('  ml-4  w-4/5 text-red-500 ')}>Xoá nhóm trò chuyện</span>
                                </div>
                            </Button>
                        </FormConfirm>
                    </div>
                </details>
            );
        } else return <></>;
    };

    return (
        <>
            {!!curChat && (
                <HeaderProfile
                    avatar={curChat?.avatar}
                    userName={curChat?.name}
                    typeAvatar={'group'}
                    idGroup={curChat?.id}
                />
            )}
            <div className={cx('w-full h-0  border-t border-lcn-blue-3 ', 'text-sm')}>
                <div className={cx('  flex flex-col items-center p-5 pt-3  text-lcn-blue-4', '')}>
                    <FormConfirm
                        title="Đổi tên nhóm"
                        nameChat={curChat.name}
                        text={'Nhập vào tên nhóm bạn muốn thay đổi'}
                        onAccept={changeNameOfChat}
                    >
                        <Button type="button" className={cx('flex   w-full  p-2 mb-2 hover:bg-lcn-blue-3')}>
                            <div className={cx('flex items-center hover:text-lcn-blue-4')}>
                                <BiEdit className={cx('text-lcn-blue-4 w-7 h-7 ')} />
                                <span className={cx('  ml-4  w-4/5 ')}>Đổi tên nhóm</span>
                            </div>
                        </Button>
                    </FormConfirm>

                    <Button className={cx('flex   w-full  p-2 mb-2 hover:bg-lcn-blue-3')}>
                        <div className={cx('flex items-center')}>
                            <HiOutlinePaperClip className={cx('text-lcn-blue-4 w-7 h-7 ')} />{' '}
                            <span className={cx('  ml-4  w-4/5 ')}>Tài liệu, hình ảnh, video</span>
                        </div>
                    </Button>
                    <ShowMemberChat accessToken={accessToken} axiosJWT={axiosJWT} curChat={curChat} curUser={curUser} />
                    <AddMemberChat accessToken={accessToken} axiosJWT={axiosJWT} curChat={curChat} curUser={curUser} />

                    {renderFuctionalAdmin()}
                    <Button
                        type="button"
                        className={cx('flex   w-full p-2 mb-2 hover:bg-red-100')}
                        onClick={handleLeaveChat}
                    >
                        <div className={cx('flex items-center')}>
                            <BiLogOutCircle className={cx('text-red-500 w-7 h-7 ')} />{' '}
                            <span className={cx('  ml-4  w-4/5 text-red-500 ')}>Rời nhóm</span>
                        </div>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default memo(Group);
