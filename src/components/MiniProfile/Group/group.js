import classNames from 'classnames';
import { HiOutlineTrash } from 'react-icons/hi';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiEdit, BiLogOutCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';

import { memo } from 'react';

import HeaderProfile from '~/components/HeaderProfile';
import ShowMemberChat from '~/components/ShowMemberChat';
import AddMemberChat from '~/components/AddMemberChat';

import AddAdminChat from '~/components/AddAdminChat';
import RequestMemberChat from '~/components/RequestMemberChat';
import RemoveMemberChat from '~/components/RemoveMemberChat';
import { leaveChat, removeChat, changeNameChat } from '~/services/chatService';
import { userLogin } from '~/redux/Slice/signInSlice';

import FormConfirm from '~/components/FormConfirm';
import { addMess } from '~/services/messageService';
import socket from '~/utils/getSocketIO';

import AllFileChat from '~/components/AllFileChat';
import ChangeImg from '~/components/ChangeImg';

const cx = classNames;
function Group({ curChat }) {
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;

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
            if (!!messData) {
                socket.emit('sendMessage', {
                    receiverId: id,
                    contentMessage: messData,
                });
            }
        }
    };

    const handleLeaveChat = async () => {
        var confirmRemoveMember = window.confirm('B???n c?? ch???c mu???n r???i nh??m kh??ng?');
        if (confirmRemoveMember) {
            var newUser = await leaveChat(curChat.id, curUser.id, accessToken, axiosJWT);

            if (!!newUser) {
                dispatch(userLogin(newUser));
                saveMessSystem(curChat.id, curUser.fullName + ' ???? r???i nh??m');
            }
        }
    };

    const handleRemoveChat = async (value) => {
        if (value === 'X??c nh???n') {
            var newCurrUser = await removeChat(curChat.id, curUser.id, accessToken, axiosJWT);

            if (!!newCurrUser) {
                dispatch(userLogin(newCurrUser));
                socket.emit('removeAllChat', { receiverId: curChat.id, idChat: curChat.id });
            }
        } else alert('Th??ng tin x??c nh???n kh??ng ????ng');
    };
    const changeNameOfChat = async (value) => {
        if (value.trim() !== '') {
            var newCurrUser = await changeNameChat(curChat.id, value, curUser.id, accessToken, axiosJWT);
            if (!!newCurrUser) {
                saveMessSystem(curChat.id, curUser.fullName + ' ???? ?????i t??n nh??m th??nh ' + value);

                return true;
            }
        } else alert('T??n nh??m b???n ?????t ch??a h???p l???');
        return false;
    };

    const renderFuctionalAdmin = () => {
        if (curChat.adminChat.includes(curUser.id)) {
            return (
                <details className="w-full p-0  mb-2">
                    <summary className={cx('flex   w-full  p-1 hover:bg-yellow-100 rounded-3xl')}>
                        <div className={cx('flex items-center')}>
                            <AiOutlineSetting className={cx('text-yellow-500 w-7 h-7 ')} />{' '}
                            <span className={cx('  ml-4  w-4/5 text-yellow-500')}>Qu???n l?? nh??m</span>
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

                        <RemoveMemberChat
                            accessToken={accessToken}
                            axiosJWT={axiosJWT}
                            curChat={curChat}
                            curUser={curUser}
                        />
                        <FormConfirm
                            title="X??c nh???n xo?? nh??m"
                            nameChat={curChat.name}
                            text={'Nh???p v??o "X??c nh???n" ????? ch???c ch???n b???n mu???n xo?? nh??m n??y'}
                            onAccept={handleRemoveChat}
                        >
                            <Button type="button" className={cx('flex   w-full p-2 mb-2 hover:bg-red-100')}>
                                <div className={cx('flex items-center')}>
                                    <HiOutlineTrash className={cx('text-red-500 w-7 h-7 ')} />{' '}
                                    <span className={cx('  ml-4  w-4/5 text-red-500 ')}>Xo?? nh??m tr?? chuy???n</span>
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
                        title="?????i t??n nh??m"
                        nameChat={curChat.name}
                        text={'Nh???p v??o t??n nh??m b???n mu???n thay ?????i'}
                        onAccept={changeNameOfChat}
                    >
                        <Button type="button" className={cx('flex   w-full  p-2 mb-2 hover:bg-lcn-blue-3')}>
                            <div className={cx('flex items-center hover:text-lcn-blue-4')}>
                                <BiEdit className={cx('text-lcn-blue-4 w-7 h-7 ')} />
                                <span className={cx('  ml-4  w-4/5 ')}>?????i t??n nh??m</span>
                            </div>
                        </Button>
                    </FormConfirm>
                    <ChangeImg accessToken={accessToken} axiosJWT={axiosJWT} curChat={curChat} curUser={curUser} />

                    <AllFileChat accessToken={accessToken} axiosJWT={axiosJWT} curChat={curChat} curUser={curUser} />
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
                            <span className={cx('  ml-4  w-4/5 text-red-500 ')}>R???i nh??m</span>
                        </div>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default memo(Group);
