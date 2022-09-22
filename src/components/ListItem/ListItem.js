import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { getUserById } from '~/services/userService';
import { findSuccess } from '~/redux/Slice/friendSlice';
import { useSelector } from 'react-redux';

import ItemBanBe from '~/components/ItemBanBe';
import ItemChoXacNhan from '~/components/ItemChoXacNhan';

import ItemChan from '~/components/ItemChan';
const cx = classNames;

function ListItem({ type }) {
    const userLoginData = useSelector((state) => state.persistedReducer.signIn.userLogin);
    var list = userLoginData.friend;

    const [listFriend, setListFriend] = useState([]);
    useEffect(() => {
        var listDataUser = [];
        const printData = async (idFriend) => {
            var dataFriend = await getUserById(idFriend);
            listDataUser.push(dataFriend);
        };
        for (var friend of list) {
            printData(friend.id);
        }
        setListFriend(listDataUser);
    }, []);
    var Comp = ItemBanBe;
    if (type === 'choXacNhan') {
        Comp = ItemChoXacNhan;
    } else if (type === 'chan') {
        Comp = ItemChan;
    }
    const renderBanBe = () => {
        console.log(listFriend);
        listFriend.map((item) => console.log(item));
        // <Comp key={item.id} data={item} />);
    };
    return <div className={cx('w-full h-full overflow-y-scroll')}>{renderBanBe()}</div>;
}

export default ListItem;
