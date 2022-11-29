import classNames from 'classnames';
import { useState, memo } from 'react';
import Button from '~/components/Button';
import { lcnImage } from '~/image';
import { declineFriend } from '~/services/userService';

import { useSelector, useDispatch } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { currentChat } from '~/redux/Slice/sidebarChatSlice';
import { userLogin } from '~/redux/Slice/signInSlice';
import routeConfig from '~/configRoutes';
const cx = classNames;

function ItemChan({ blockId, blockName, blockAva }) {
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);
    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;
    const handleBoChan = async () => {
        await declineFriend(curUser.id, blockId, accessToken, axiosJWT, dispatch);
    };
    return (
        <div className={cx('rounded-xl h-16 w-full flex flex-row items-center hover:bg-lcn-blue-3 m-0 p-2')}>
            <div
                className={cx(
                    'w-10 h-10 bg-lcn-blue-4 rounded-full overflow-hidden flex justify-center items-center p-1 relative',
                )}
            >
                <img src={lcnImage.avatarDefault} alt="avartar" className={cx('w-full h-full border ')} />
            </div>
            <div className={cx('w-[300px] flex flex-row items-center h-full ml-2 overflow-hidden')}>
                <div className={cx('text-left mb-1 text-lcn-blue-5 font-semibold h-6 w-96 ')}>{blockName}</div>
            </div>
            <div>
                <Button
                    className={cx('w-[70px] text-sm justify-center bg-red-500 p-1 text-white')}
                    onClick={handleBoChan}
                >
                    Bỏ chặn
                </Button>
            </div>
        </div>
    );
}

export default ItemChan;
