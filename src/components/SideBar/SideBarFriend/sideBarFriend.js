import classNames from 'classnames/bind';
import { useState } from 'react';

import ItemBanBe from '~/components/ItemBanBe';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import styles from './SideBarFriend.module.scss';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function SideBarFriend() {
    const [tabChange, setTabChange] = useState(true);
    return (
        <div className={cx('p-2 flex flex-col')}>
            <div
                className={cx(
                    'w-full m-0 p-2 mb-1 mt-1 h-16 flex items-center cursor-pointer',
                    'rounded-xl hover:bg-lcn-blue-3',
                )}
            >
                <div
                    className={cx(
                        'h-10 w-10 text-3xl text-lcn-blue-4 flex justify-center items-center ',
                        'rounded-full border border-lcn-blue-4 border-opacity-50',
                    )}
                >
                    <AiOutlineUsergroupAdd />
                </div>
                <div className={cx('h-full ml-2 w-48 flex items-center text-lg ')}>Danh sách nhóm</div>
            </div>
            <div className={cx('h-10 w-full text-2xl text-lcn-blue-5')}>
                <h1>Bạn bè (96)</h1>
            </div>
            <div className={cx('h-10 w-full flex justify-around')}>
                <Button
                    className={cx(
                        'rounded-lcn-login-input ml-2 border w-20 h-7 flex items-center p-0 justify-center',
                        'text-lcn-blue-4 border border-lcn-blue-4',
                        'hover:bg-lcn-blue-4 hover:text-white',
                    )}
                    onClick={() => setTabChange(true)}
                >
                    {!tabChange ? (
                        <div className={cx('h-full w-full ')}>Tất cả</div>
                    ) : (
                        <div className={cx('rounded-lcn-login-input  h-full w-full bg-lcn-blue-4 text-white')}>
                            Tất cả
                        </div>
                    )}
                </Button>
                <Button
                    className={cx(
                        'rounded-lcn-login-input border w-36 h-7 flex items-center p-0 justify-center',
                        'text-lcn-blue-4 border-lcn-blue-4',
                        'hover:bg-lcn-blue-4 hover:text-white ',
                    )}
                    onClick={() => setTabChange(false)}
                >
                    {!tabChange ? (
                        <div className={cx('rounded-lcn-login-input  h-full w-full bg-lcn-blue-4 text-white')}>
                            Chờ xác nhận
                        </div>
                    ) : (
                        <div className={cx('h-full w-full ')}>Chờ xác nhận</div>
                    )}
                </Button>
            </div>
            <div className={cx('w-full overflow-y-scroll')}>
                <ItemBanBe />
                <ItemBanBe />
                <ItemBanBe />
                <ItemBanBe />
            </div>
        </div>
    );
}

export default SideBarFriend;
