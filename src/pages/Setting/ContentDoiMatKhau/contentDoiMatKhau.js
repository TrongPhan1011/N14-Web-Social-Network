import classNames from 'classnames';

import Button from '~/components/Button';

const cx = classNames;

function ContentDoiMatKhau() {
    return (
        <div className={cx('w-[1094px]  bg-lcn-blue-1 h-screen flex justify-center items-center')}>
            <div
                className={cx(
                    'h-[300px] w-[500px] rounded-2xl drop-shadow-lcn-login bg-white flex flex-col justify-center ',
                )}
            >
                <div className={cx('w-full h-10 flex justify-center mt-5')}>
                    <span className={cx('text-2xl font-semibold text-lcn-blue-5')}>Mật khẩu</span>
                </div>
                <div className={cx('w-full h-full flex justify-center')}>
                    <div className={cx('w-2/3 flex justify-center')}>
                        <form className={cx(' w-full p-3 h-full flex flex-col justify-around')}>
                            <div className={cx('flex justify-center w-full')}>
                                <div className={cx('w-full relative  ')}>
                                    <input
                                        type="password"
                                        className={cx(
                                            'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                                        )}
                                        placeholder="Nhập mật khẩu"
                                    />
                                </div>
                            </div>
                            <div className={cx('flex justify-center w-full')}>
                                <div className={cx('w-full relative  ')}>
                                    <input
                                        type="password"
                                        className={cx(
                                            'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                                        )}
                                        placeholder="Nhập mật khẩu mới"
                                    />
                                </div>
                            </div>
                            <div className={cx('flex justify-center w-full')}>
                                <div className={cx('w-full relative  ')}>
                                    <input
                                        type="password"
                                        className={cx(
                                            'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                                        )}
                                        placeholder="Nhập lại mật khẩu mới"
                                    />
                                </div>
                            </div>
                            <div className={cx('w-full h-10 flex justify-center')}>
                                <Button
                                    className={cx(
                                        'w-2/4 h-full p-0',
                                        'border border-opacity-50 border-lcn-blue-4 outline-none text-lcn-blue-4',
                                        'bg-lcn-blue-3 justify-center',
                                    )}
                                >
                                    Lưu
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentDoiMatKhau;
