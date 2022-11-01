import classNames from 'classnames';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { MdMail } from 'react-icons/md';
import Button from '~/components/Button';
import { register, verifyOtp } from '~/services/authService';
import config from '~/configRoutes';
import { loginUser } from '~/services/authService';

const cx = classNames;

function Otp() {
    const [validOTP, setValidOTP] = useState('opacity-0');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    var currentSignUpAccount = useSelector((state) => state.persistedReducer.signUp.userSignUp);
    console.log(currentSignUpAccount);

    const otpRef = useRef();

    const checkValidOTP = () => {
        var valueOTP = otpRef.current.value.trim();

        if (valueOTP.length === 0 || !valueOTP.match(/^[0-9]{6}$/)) {
            setValidOTP('opacity-1');
            return '';
        } else {
            setValidOTP('opacity-0');
            return valueOTP;
        }
    };

    const handleRegister = async () => {
        var otpValue = checkValidOTP();
        var dangKy = {
            userName: currentSignUpAccount.name,
            email: currentSignUpAccount.userName,
            password: currentSignUpAccount.password,
            birthday: currentSignUpAccount.birthday,
            gender: currentSignUpAccount.gender,
            otp: otpValue,
        };

        //dang ky thanh cong
        var registerHandle = await register(dangKy, navigate, dispatch);
        console.log(registerHandle);
        if (!!registerHandle) {
            await loginUser(registerHandle, dispatch, navigate);
        } else {
            navigate(config.routeConfig.signUp);
        }
    };
    const handleVerify = async () => {
        var otpValue = checkValidOTP();
        var user = {
            userName: currentSignUpAccount.userName,
            otp: otpValue,
        };
        // console.log(user);
        var thongBao = await verifyOtp(user, navigate);
        console.log(thongBao);
    };
    const handleConfirmOtp = () => {
        if (!!currentSignUpAccount.gender) {
            console.log(2);
            handleRegister();
        } else {
            console.log(1);
            handleVerify();
        }
    };
    return (
        <div className={cx('bg-white h-4/6 w-2/6 rounded-2xl drop-shadow-lcn-login')}>
            <div className={cx('h-1/4 p-5 border-b border-lcn-blue-4 border-opacity-20')}>
                <div className={cx('flex w-full', 'text-lcn-blue-5 text-3xl font-semibold')}>Xác minh Email</div>
                <div className={cx('flex w-full', 'text-sm text-opacity-60 text-black')}>
                    Để bảo mật tài khoản của bạn, LCN muốn xác minh danh tính của bạn. LCN sẽ gửi một Email kèm mã xác
                    minh gồm 6 chữ số.
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
                            placeholder="Nhập mã OTP"
                            ref={otpRef}
                            onChange={checkValidOTP}
                        />
                        <span className={cx('text-red-500 text-sm pl-3', validOTP)}>OTP chỉ có thể là số!</span>
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
                            href="/dangky"
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
                            onClick={handleConfirmOtp}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Otp;
