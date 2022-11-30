import classNames from 'classnames';
import { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ItemBanBe from '~/components/ItemBanBe';
import ItemChoXacNhan from '~/components/ItemChoXacNhan';
import ItemChan from '~/components/ItemChan';

import { getAllFriend, getWaitingFriend, getBlockFriend } from '~/services/userService';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';

const cx = classNames;

function ListItem({ type }) {
    const dispatch = useDispatch();
    const [listFriend, setListFriend] = useState([]);
    const [listAddFriend, setListAddFriend] = useState([]);
    const [listBlockedFriend, setListBlockedFriend] = useState([]);
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
    }, [type, curUser.friend]);
    useEffect(() => {
        const getListWaiting = async () => {
            const friendIsWaiting = await getWaitingFriend(curUser.id, accessToken, axiosJWT, dispatch);
            setListAddFriend(friendIsWaiting[0].friend);
        };

        getListWaiting();
    }, [type, curUser.friend]);
    useEffect(() => {
        const getListBlockFriend = async () => {
            const friendBlocked = await getBlockFriend(curUser.id, accessToken, axiosJWT, dispatch);
            setListBlockedFriend(friendBlocked[0].friend);
            // setListAddFriend(friendIsWaiting[0].friend);
        };

        getListBlockFriend();
    }, [type, curUser.friend]);

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
            return listAdd.map((item) => {
                return (
                    <Comp
                        key={item._id}
                        friendName={item.fullName}
                        friendId={item._id}
                        friendAva={item?.profile?.urlAvartar}
                    />
                );
            });
        }
        if (listBlockedFriend.length > 0 && type === 'chan') {
            return listBlockedFriend.map((item) => {
                return (
                    <Comp
                        key={item._id}
                        blockId={item._id}
                        blockName={item.fullName}
                        blockAva={item?.profile?.urlAvartar}
                    />
                );
            });
        }
    };

    return <div className={cx('w-full h-full overflow-y-scroll')}>{handleRenderItem()}</div>;
}

export default memo(ListItem);
