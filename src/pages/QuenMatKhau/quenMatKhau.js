import { useRef, useState } from 'react';
import classNames from 'classnames';
import { MdMail } from 'react-icons/md';
import Button from '~/components/Button';
import { useDispatch } from 'react-redux';
import { getAuthByMail } from '~/services/authService';
import { useNavigate } from 'react-router-dom';
import { sendOTP } from '~/services/authService';
const cx = classNames;

function QuenMatKhau() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [checkMail, setCheckMail] = useState('opacity-0');
    const emailRef = useRef();

    const handleCheckMail = async () => {
        const email = emailRef.current.value.trim();

        var userGeted = await getAuthByMail(email);

        if (!userGeted) {
            setCheckMail('opacity-1');
        } else {
            setCheckMail('opacity-0');
            sendOTP(userGeted, dispatch, navigate);
        }
    };
    return (
        <div className={cx('bg-white h-4/6 w-2/6 rounded-2xl drop-shadow-lcn-login')}>
            <div className={cx('h-1/4 p-5 border-b border-lcn-blue-4 border-opacity-20')}>
                <div className={cx('flex w-full', 'text-lcn-blue-5 text-3xl font-semibold')}>
                    Tìm lại tài khoản của bạn
                </div>
                <div className={cx('flex w-full mt-1', 'text-sm text-opacity-60 text-black')}>
                    Xin hãy nhập email của bạn để chúng tôi có thể tìm kiếm tài khoản của bạn
                </div>
            </div>
            <div className={cx('h-2/4 flex flex-col justify-center items-center')}>
                <div className={cx('flex justify-center w-full')}>
                    <div className={cx('w-2/3  relative  ')}>
                        <div
                            className={cx(
                                'flex absolute text-lcn-blue-4 top-3 left-0 items-center pl-3 pointer-events-none ',
                            )}
                        >
                            <MdMail />
                        </div>
                        <input
                            type="text"
                            className={cx(
                                'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                            )}
                            placeholder="Nhập email của bạn"
                            ref={emailRef}
                            // onChange={checkValidOTP}
                        />
                        <span className={cx('text-red-500 text-sm pl-3', checkMail)}>
                            Không tìm thấy email cần tìm. Vui lòng thử lại!
                        </span>
                    </div>
                </div>
                <div className={cx('w-2/3 h-10 mt-5 flex flex-row justify-between ')}>
                    <div className={cx('w-1/3 flex')}>
                        <Button
                            className={cx(
                                'w-full h-full p-0 m-0',
                                'border border-opacity-50 border-lcn-blue-4 outline-none text-lcn-blue-4',
                                'bg-lcn-blue-3 justify-center',
                            )}
                            href="/dangnhap"
                        >
                            Trở lại
                        </Button>
                    </div>
                    <div className={cx('w-1/3 flex')}>
                        <Button
                            className={cx(
                                'w-full h-full p-0 m-0',
                                'border border-opacity-50 border-lcn-blue-4 outline-none text-lcn-blue-4',
                                'bg-lcn-blue-3 justify-center',
                            )}
                            onClick={handleCheckMail}
                        >
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuenMatKhau;
