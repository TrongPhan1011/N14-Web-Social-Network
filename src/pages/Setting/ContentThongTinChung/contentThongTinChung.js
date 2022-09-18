import classNames from 'classnames';

import { FaPhoneAlt } from 'react-icons/fa';
import { RiUserFill } from 'react-icons/ri';
import Button from '~/components/Button';

const cx = classNames;

function ContentThongTinChung() {
    return (
        <div className={cx('w-full overflow-hidden')}>
            <div className={cx('  h-screen bg-lcn-blue-1 flex justify-center items-center')}>
                <div className={cx('h-[500px] w-[500px] bg-white flex flex-col justify-center ')}>
                    <div className={cx('w-full h-10 flex justify-center mt-5')}>
                        <span className={cx('text-2xl font-semibold text-lcn-blue-5')}>Thông tin chung</span>
                    </div>
                    <div className={cx('w-full h-full flex justify-center')}>
                        <div className={cx('w-2/3 flex justify-center')}>
                            <form className={cx(' w-full p-3 h-full flex flex-col justify-around')}>
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
                                            defaultValue={'Phan Hữu Non'}
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
                                            defaultValue={'0123456789'}
                                        />
                                    </div>
                                </div>

                                <div className={cx('flex justify-center w-full')}>
                                    <div className={cx('w-full relative ')}>
                                        <div
                                            className={cx(
                                                'flex absolute text-lcn-blue-4 inset-y-0 left-0 items-center pl-3 pointer-events-none',
                                                'cursor-no-drop',
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
                                        <input className={cx('mr-2')} type="radio" value="Name" />
                                        Nam
                                    </label>

                                    <label>
                                        <input className={cx('mr-2')} type="radio" value="Nu" />
                                        Nữ
                                    </label>

                                    <label>
                                        <input className={cx('mr-2')} type="radio" value="Khac" />
                                        Khác
                                    </label>
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
                    <div className={cx('h-10 w-full')}></div>
                </div>
            </div>
        </div>
    );
}

export default ContentThongTinChung;
