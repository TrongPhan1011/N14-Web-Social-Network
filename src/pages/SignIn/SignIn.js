import classNames from 'classnames/bind';

import styles from './SignIn.module.scss';
import { FaPhoneAlt, FaLock } from 'react-icons/fa';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function SignIn() {
    return (
        <div className={cx('h-5/6 w-2/6 flex flex-col ')}>
            <div className={cx('bg-white h-4/6 w-full rounded-2xl drop-shadow-lcn-login')}>
                <div className={cx('h-1/6 text-lcn-blue-5 border-b border-lcn-blue-4 border-opacity-20')}>
                    <div className={cx('flex h-full w-full items-center justify-center', 'text-3xl font-semibold')}>
                        Đăng nhập
                    </div>
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
                                    placeholder="Mật khẩu"
                                />
                            </div>
                        </div>
                        <div className={cx('w-full h-10 flex justify-end')}>
                            <Button
                                className={cx(
                                    'w-full h-full p-0',
                                    'border border-opacity-50 border-lcn-blue-4 outline-none text-lcn-blue-4',
                                    'bg-lcn-blue-3',
                                )}
                            >
                                Đăng nhập
                            </Button>
                        </div>
                        <div className={cx('flex justify-center w-full text-[#004078]')}>
                            Bạn chưa có tài khoản?
                            <a href="##" className={cx('ml-1 text-[#0289FF]')}>
                                Đăng ký ngay
                            </a>
                        </div>
                    </form>
                </div>
            </div>
            <div className={cx('h-1/6')}></div>
        </div>
    );
}

export default SignIn;
