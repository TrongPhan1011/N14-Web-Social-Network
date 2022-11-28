import classNames from 'classnames';
import { useState, memo, useEffect } from 'react';

import { FaPhone, FaVideo, FaInfoCircle } from 'react-icons/fa';

import Button from '~/components/Button';

import ContentMessage from '~/components/ContentMessage';
import InputSend from '~/components/InputSend';
import MiniProfile from '~/components/MiniProfile';
import { useDispatch, useSelector } from 'react-redux';

import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { getUserById } from '~/services/userService';

import Avartar from '~/components/Avartar';
import config from '~/configRoutes';
import { callerData } from '~/redux/Slice/callSlice';

const cx = classNames;

function ContentChat() {
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);
    var currChat = useSelector((state) => state.sidebarChatSlice.currentChat);

    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;

    var [widthValue, setWidthValue] = useState('');
    const [currentInbox, setCurrentInbox] = useState();

    useEffect(() => {
        const getCurrInbox = async () => {
            if (currChat?.typeChat === 'inbox') {
                var userChatOther = {};
                if (currChat.member[0] !== curUser.id) {
                    userChatOther = await getUserById(currChat.member[0], accessToken, axiosJWT);
                } else userChatOther = await getUserById(currChat.member[1], accessToken, axiosJWT);

                setCurrentInbox(userChatOther);
            }
        };
        if (!!currChat) getCurrInbox();
    }, [currChat]);

    const showMiniProfile = () => {
        if (widthValue === '') return <></>;
        else if (widthValue === 'ease-right-to-left')
            return <MiniProfile profileIn={true} typeChat={currChat?.typeChat} />;
        else return <MiniProfile profileIn={false} typeChat={currChat?.typeChat} />;
    };

    const onClickInfo = () => {
        if (widthValue === 'ease-left-to-right' || widthValue === '') setWidthValue('ease-right-to-left');
        else setWidthValue('ease-left-to-right');
    };
    const renderAvatar = () => {
        if (!!currentInbox || !!currChat) {
            if (currChat.typeChat !== 'group') {
                return <Avartar className={cx('h-12 w-12')} src={currentInbox?.profile?.urlAvartar} />;
            } else
                return (
                    <Avartar
                        className={cx('h-12 w-12')}
                        src={currChat?.avatar}
                        typeAvatar={'group'}
                        idGroup={currChat.id}
                    />
                );
        }
    };

    return (
        <>
            {!!currChat ? (
                <div className={cx(' w-full h-full flex overflow-hidden ')}>
                    <div className={cx('w-full    justify-between  ')}>
                        <div className={cx('h-[10vh] bg-lcn-blue-2  w-full flex justify-between top-0')}>
                            <div className={cx('w-1/2  h-full flex pl-4')}>
                                <Button type="button">{renderAvatar()}</Button>
                                <div>
                                    <div className="w-full flex items-center">
                                        <Button type="button" className="text-lcn-blue-5 font-semibold text-md m-0 ">
                                            {currChat.typeChat === 'group' ? currChat?.name : currentInbox?.fullName}
                                        </Button>
                                        <span
                                            className={cx('h-3 w-3 bg-lcn-green-1 rounded-full inline-block ml-2')}
                                        ></span>
                                    </div>

                                    <div className={cx('text-xs text-slate-500 ml-1')}>Đang hoạt động</div>
                                </div>
                            </div>
                            <div className={cx('  h-full flex pl-4 justify-end')}>
                                <Button
                                    type="button"
                                    className="mr-4"
                                    onClick={() => {
                                        dispatch(callerData({ calling: true, idTo: currentInbox?.id }));
                                    }}
                                >
                                    <FaPhone className="text-lcn-blue-4 text-2xl" />
                                </Button>
                                <Button
                                    href={'.' + config.routeConfig.call + '?video=true&idTo=' + currentInbox?.id}
                                    target="_blank"
                                    className="mr-4"
                                >
                                    <FaVideo className="text-lcn-blue-4 text-2xl" />
                                </Button>
                                <Button className="mr-4" onClick={onClickInfo}>
                                    <FaInfoCircle className="text-lcn-blue-4 text-2xl" />
                                </Button>
                            </div>
                        </div>
                        <div className="h-[80vh] ">
                            <ContentMessage
                                currentInbox={currentInbox}
                                curUser={curUser}
                                accessToken={accessToken}
                                axiosJWT={axiosJWT}
                            />
                        </div>
                        <div className="h-[10vh] w-full  ">
                            <InputSend />
                        </div>
                    </div>
                    <div className={cx('bg-white h-full ', widthValue)}>{showMiniProfile()}</div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default memo(ContentChat);
