import classNames from 'classnames';

import ItemBanBe from '~/components/ItemBanBe';
import ItemChoXacNhan from '~/components/ItemChoXacNhan';

import ItemChan from '~/components/ItemChan';
import { useSelector } from 'react-redux';
const cx = classNames;

function ListItem({ type }) {
    const userLoginData = useSelector((state) => state.persistedReducer.signIn.userLogin);

    var list = userLoginData.friend;

    var Comp = ItemBanBe;
    if (type === 'choXacNhan') {
        Comp = ItemChoXacNhan;
    } else if (type === 'chan') {
        Comp = ItemChan;
    }

    const renderBanBe = () => {
        return list.map((item) => <Comp key={item.id} userId={item.id} />);
    };
    return <div className={cx('w-full h-full overflow-y-scroll')}>{renderBanBe()}</div>;
}

export default ListItem;
