import classNames from 'classnames/bind';

import styles from './ListItem.module.scss';
import ItemBanBe from '~/components/ItemBanBe';
import ItemChoXacNhan from '~/components/ItemChoXacNhan';

const cx = classNames.bind(styles);

function ListItem({ type }) {
    var Comp = ItemBanBe;
    if (type === 'choXacNhan') {
        Comp = ItemChoXacNhan;
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
