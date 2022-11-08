import classNames from 'classnames';
import { HiOutlinePaperClip, HiOutlineTrash } from 'react-icons/hi';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiEdit, BiLogOutCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';

import { useEffect } from 'react';

import HeaderProfile from '~/components/HeaderProfile';
import ShowMemberChat from '~/components/ShowMemberChat';
import AddMemberChat from '~/components/AddMemberChat';
import { RiChatPrivateLine } from 'react-icons/ri';

import AddAdminChat from '~/components/AddAdminChat';
import RequestMemberChat from '~/components/RequestMemberChat';
import RemoveMemberChat from '~/components/RemoveMemberChat';

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

    useEffect(() => {}, [curChat]);

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
                        <Button className={cx('flex   w-full p-2 mb-2 hover:bg-red-100')}>
                            <div className={cx('flex items-center')}>
                                <HiOutlineTrash className={cx('text-red-500 w-7 h-7 ')} />{' '}
                                <span className={cx('  ml-4  w-4/5 text-red-500 ')}>Xoá nhóm trò chuyện</span>
                            </div>
                        </Button>
                    </div>
                </details>
            );
        } else return <></>;
    };

    return (
        <>
            <HeaderProfile avatar={curChat.avatar} userName={curChat?.name} />
            <div className={cx('w-full h-0  border-t border-lcn-blue-3 ', 'text-sm')}>
                <div className={cx('  flex flex-col items-center p-5 pt-3  text-lcn-blue-4', '')}>
                    <Button className={cx('flex   w-full  p-2 mb-2 hover:bg-lcn-blue-3')}>
                        <div className={cx('flex items-center hover:text-lcn-blue-4')}>
                            <BiEdit className={cx('text-lcn-blue-4 w-7 h-7 ')} />{' '}
                            <span className={cx('  ml-4  w-4/5 ')}>Đổi tên nhóm</span>
                        </div>
                    </Button>
                    <Button className={cx('flex   w-full  p-2 mb-2 hover:bg-lcn-blue-3')}>
                        <div className={cx('flex items-center')}>
                            <HiOutlinePaperClip className={cx('text-lcn-blue-4 w-7 h-7 ')} />{' '}
                            <span className={cx('  ml-4  w-4/5 ')}>Tài liệu, hình ảnh, video</span>
                        </div>
                    </Button>
                    <ShowMemberChat accessToken={accessToken} axiosJWT={axiosJWT} curChat={curChat} curUser={curUser} />
                    <AddMemberChat accessToken={accessToken} axiosJWT={axiosJWT} curChat={curChat} curUser={curUser} />

                    {renderFuctionalAdmin()}
                    <Button className={cx('flex   w-full p-2 mb-2 hover:bg-red-100')}>
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

export default Group;
