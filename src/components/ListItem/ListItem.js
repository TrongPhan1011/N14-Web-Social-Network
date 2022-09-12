import classNames from 'classnames';

import ItemBanBe from '~/components/ItemBanBe';
import ItemChoXacNhan from '~/components/ItemChoXacNhan';
import ItemChan from '~/components/ItemChan';
const cx = classNames;

function ListItem({ type }) {
    var Comp = ItemBanBe;
    if (type === 'choXacNhan') {
        Comp = ItemChoXacNhan;
    } else if (type === 'chan') {
        Comp = ItemChan;
    }
    return (
        <div className={cx('w-full h-full overflow-y-scroll')}>
            <Comp />
            <Comp />
            <Comp />
            <Comp />
            <Comp />
            <Comp />
            <Comp />
            <Comp />
            <Comp />
            <Comp />
            <Comp />
            <Comp />
            <Comp />
            <Comp />
            <Comp />
        </div>
    );
}

export default ListItem;
