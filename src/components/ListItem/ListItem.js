import classNames from 'classnames';
import { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ItemBanBe from '~/components/ItemBanBe';
import ItemChoXacNhan from '~/components/ItemChoXacNhan';
import ItemChan from '~/components/ItemChan';

import { getAllFriend, getWaitingFriend } from '~/services/userService';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { findSuccess } from '~/redux/Slice/friendSlice';
const cx = classNames;

function ListItem({ type }) {
    const dispatch = useDispatch();
    const [listFriend, setListFriend] = useState([]);
    const [listAddFriend, setListAddFriend] = useState([]);
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);
    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;

    useEffect(() => {
        const getListFriend = async () => {
            const friendByStatus = await getAllFriend(curUser.id, accessToken, axiosJWT, dispatch);

            setListFriend(friendByStatus[0].friend);
        };

        getListFriend();
    }, [curUser]);
    useEffect(() => {
        const getListWaiting = async () => {
            const friendIsWaiting = await getWaitingFriend(curUser.id, accessToken, axiosJWT, dispatch);
            setListAddFriend(friendIsWaiting[0].friend);
        };

        getListWaiting();
    }, [curUser]);

    var Comp = ItemBanBe;
    if (type === 'choXacNhan') {
        Comp = ItemChoXacNhan;
    } else if (type === 'chan') {
        Comp = ItemChan;
    }

    const handleRenderItem = () => {
        var listAdd = listAddFriend;
        if (listFriend.length > 0 && Comp === ItemBanBe) {
            // dispatch(findSuccess(listFriend[0]));
            return listFriend.map((item) => {
                return <Comp key={item._id} userId={item._id} name={item.fullName} avt={item?.profile?.urlAvartar} />;
            });
        }
        if (listAdd.length > 0 && type === 'choXacNhan') {
            // dispatch(findSuccess(listAdd[0]));
            return listAdd.map((item) => {
                return (
                    <Comp
                        key={item._id}
                        friendName={item.fullName}
                        friendId={item._id}
                        accessToken={accessToken}
                        axiosJWT={axiosJWT}
                    />
                );
            });
        }
    };

    return <div className={cx('w-full h-full overflow-y-scroll')}>{handleRenderItem()}</div>;
}

export default memo(ListItem);
