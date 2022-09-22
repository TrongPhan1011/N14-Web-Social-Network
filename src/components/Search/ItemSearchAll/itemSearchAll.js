import classNames from 'classnames';
import { useSelector } from 'react-redux';

import Button from '~/components/Button';
import Avartar from '~/components/Avartar';

const cx = classNames;

function ItemSearchAll({ data }) {
    const userLoginData = useSelector((state) => state.persistedReducer.signIn.userLogin);
    console.log(userLoginData);

    return (
        <div className={cx('flex items-center m-2 mb-5')}>
            <div className={cx('flex items-center w-2/3')}>
                <Avartar src={data.profile.urlAvartar} className={cx('w-12 h-12')} />
                <div className={cx('text-lcn-blue-5 font-medium pr-3 pl-3 text-lg')}>{data.fullName}</div>
            </div>
            <div className={cx('flex items-center w-1/3 justify-end')}>
                <Button className={cx('bg-lcn-blue-4 bg-opacity-100 text-white p-2 pr-3 pl-3')}>Kết bạn</Button>
            </div>
        </div>
    );
}

export default ItemSearchAll;
