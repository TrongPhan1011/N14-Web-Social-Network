import classNames from 'classnames';
import { useState, useEffect } from 'react';

import { AiOutlineUsergroupAdd } from 'react-icons/ai';

import ListItem from '~/components/ListItem';
import Button from '~/components/Button';

const cx = classNames;

function SideBarFriend({ count }) {
    const [tabChange, setTabChange] = useState(true);

    return (
        <div className={cx('p-2 h-screen flex flex-col')}>
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
                <h1>Bạn bè ({count})</h1>
            </div>
            <div className={cx('h-10 w-full flex justify-around')}>
                <Button
                    className={cx(
                        'rounded-lcn-login-input ml-2 border w-20 h-8 flex items-center  justify-center',
                        'text-lcn-blue-4 border border-lcn-blue-4',
                        'hover:bg-lcn-blue-4 hover:text-white',
                    )}
                    onClick={() => setTabChange(true)}
                >
                    {!tabChange ? (
                        <div className={cx('h-full w-full p-0')}>Tất cả</div>
                    ) : (
                        <div className={cx('rounded-lcn-login-input p-0 h-full w-full bg-lcn-blue-4 text-white')}>
                            Tất cả
                        </div>
                    )}
                </Button>
                <Button
                    className={cx(
                        'p-0 rounded-lcn-login-input border w-36 h-8 flex items-center  justify-center',
                        'text-lcn-blue-4 border-lcn-blue-4',
                        'hover:bg-lcn-blue-4 hover:text-white ',
                    )}
                    onClick={() => setTabChange(false)}
                >
                    {!tabChange ? (
                        <div className={cx('rounded-lcn-login-input p-0 h-full w-full bg-lcn-blue-4 text-white')}>
                            Chờ xác nhận
                        </div>
                    ) : (
                        <div className={cx('h-full w-full p-0')}>Chờ xác nhận</div>
                    )}
                </Button>
            </div>
            {tabChange ? <ListItem type="banBe" /> : <ListItem type="choXacNhan" />}
        </div>
    );
}

export default SideBarFriend;
