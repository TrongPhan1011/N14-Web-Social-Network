import classNames from 'classnames';
import Button from '~/components/Button';
import { BiBell, BiBlock } from 'react-icons/bi';
import { FiLock } from 'react-icons/fi';
import { HiOutlineInformationCircle } from 'react-icons/hi';

import routeConfig from '~/configRoutes';
const cx = classNames;
function SideBarSetting() {
    const _route = routeConfig.routeConfig;

    return (
        <div className={cx('p-2 h-screen w-[268px] flex flex-col')}>
            <div className={cx('w-full')}>
                <Button to={_route.setting} className={cx('flex   w-full  p-2 m-0 hover:bg-lcn-blue-3')}>
                    <div className={cx('flex  items-center w-full')}>
                        <HiOutlineInformationCircle className={cx('text-lcn-blue-4 w-7 h-7 ')} />{' '}
                        <span className={cx('  ml-4  w-4/5  text-lcn-blue-4')}>Thông tin chung</span>
                    </div>
                </Button>
                <Button to={_route.doiMatKhau} className={cx('flex   w-full p-2 m-0 hover:bg-lcn-blue-3')}>
                    <div className={cx('flex items-center')}>
                        <FiLock className={cx('text-lcn-blue-4 w-7 h-7 ')} />{' '}
                        <span className={cx('ml-4  w-4/5 text-lcn-blue-4 ')}>Mật khẩu</span>
                    </div>
                </Button>
            </div>
        </div>
    );
}

export default SideBarSetting;
