import classNames from 'classnames';
import { useState } from 'react';

import { FaPhoneAlt, FaLock } from 'react-icons/fa';
import { RiUserFill } from 'react-icons/ri';
import Button from '~/components/Button';

const cx = classNames;

function SignUp() {
    const [selectedRadioBtn, setSelectedRadioBtn] = useState('');
    const isRadioSelected = (value) => selectedRadioBtn === value;
    const handleRadioClick = (e) => {
        setSelectedRadioBtn(e.currentTarget.value);
        console.log(e.currentTarget.value);
    };

    return (
        <div className={cx('bg-white h-5/6 w-2/6 rounded-2xl drop-shadow-lcn-login')}>
            <div className={cx('h-1/6 p-5 border-b border-lcn-blue-4 border-opacity-20')}>
                <div className={cx('flex w-full', 'text-lcn-blue-5 text-3xl font-semibold')}>Đăng ký</div>
                <div className={cx('flex w-full', 'text-sm text-opacity-60 text-black')}>Nhanh chóng và thuận tiện</div>
            </div>
            <div className={cx('h-5/6 flex flex-row justify-center')}>
                <form className={cx(' w-2/3 p-3 h-full flex flex-col justify-around')}>
                    <div className={cx('flex justify-center w-full')}>
                        <div className={cx('w-full relative  ')}>
                            <div
                                className={cx(
                                    'flex absolute text-lcn-blue-4 inset-y-0 left-0 items-center pl-3 pointer-events-none ',
                                )}
                            >
                                <RiUserFill />
                            </div>
                            <input
                                type="text"
                                className={cx(
                                    'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                                )}
                                placeholder="Tên người dùng"
                            />
                        </div>
                    </div>
                    <div className={cx('flex justify-center w-full')}>
                        <div className={cx('w-full relative  ')}>
                            <div
                                className={cx(
                                    'flex absolute text-lcn-blue-4 inset-y-0 left-0 items-center pl-3 pointer-events-none ',
                                )}
                            >
                                <FaPhoneAlt />
                            </div>
                            <input
                                type="text"
                                className={cx(
                                    'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                                )}
                                placeholder="Số điện thoại"
                            />
                        </div>
                    </div>
                    <div className={cx('flex justify-center w-full')}>
                        <div className={cx('w-full relative  ')}>
                            <div
                                className={cx(
                                    'flex absolute text-lcn-blue-4 inset-y-0 left-0 items-center pl-3 pointer-events-none ',
                                )}
                            >
                                <FaLock />
                            </div>
                            <input
                                type="text"
                                className={cx(
                                    'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                                )}
                                placeholder="Nhập mật khẩu"
                            />
                        </div>
                    </div>

                    <div className={cx('flex justify-center w-full')}>
                        <div className={cx('w-full relative ')}>
                            <div
                                className={cx(
                                    'flex absolute text-lcn-blue-4 inset-y-0 left-0 items-center pl-3 pointer-events-none ',
                                )}
                            >
                                <FaLock />
                            </div>
                            <input
                                type="text"
                                className={cx(
                                    'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                                )}
                                placeholder="Nhập lại mật khẩu"
                            />
                        </div>
                    </div>

                    <div className={cx('flex justify-center w-full')}>
                        <div className={cx('w-full relative ')}>
                            <div
                                className={cx(
                                    'flex absolute text-lcn-blue-4 inset-y-0 left-0 items-center pl-3 pointer-events-none',
                                )}
                            ></div>
                            <input
                                type="date"
                                className={cx(
                                    'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none',
                                )}
                            />
                        </div>
                    </div>
                    <div className={cx('w-full  flex flex-row justify-between')}>
                        <label>
                            <input
                                className={cx('mr-2')}
                                type="radio"
                                value="nam"
                                checked={isRadioSelected('nam')}
                                onChange={handleRadioClick}
                            />
                            Nam
                        </label>

                        <label>
                            <input
                                className={cx('mr-2')}
                                type="radio"
                                value="nu"
                                checked={isRadioSelected('nu')}
                                onChange={handleRadioClick}
                            />
                            Nữ
                        </label>

                        <label>
                            <input
                                className={cx('mr-2')}
                                type="radio"
                                value="khac"
                                checked={isRadioSelected('khac')}
                                onChange={handleRadioClick}
                            />
                            Khác
                        </label>
                    </div>

                    <div className={cx('w-full h-10 flex justify-end')}>
                        <Button
                            className={cx(
                                'w-2/4 h-full p-0',
                                'border border-opacity-50 border-lcn-blue-4 outline-none text-lcn-blue-4',
                                'bg-lcn-blue-3 justify-center',
                            )}
                        >
                            Đăng ký
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
