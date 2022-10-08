import classNames from 'classnames';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FaLock } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

import Button from '~/components/Button';
import { loginUser } from '~/services/authService';

const cx = classNames;

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [validEmail, setValidEmail] = useState('opacity-0');
    const [validPassword, setValidPassword] = useState('opacity-0');
    const [failLogin, setFailLogin] = useState('hidden');

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleLogin = () => {
        var valueEmail = checkValidEmail();
        var valuePassword = checkValidPassword();

        if (!!valueEmail && !!validPassword) {
            var user = { userName: valueEmail, password: valuePassword };
            // đăng nhập thành công -->
            var login = loginUser(user, dispatch, navigate);
            if (!!login) {
                setFailLogin('');
            }
        } else return false;
    };

    const checkValidEmail = () => {
        var valueEmail = emailRef.current.value.trim();
        if (valueEmail.length === 0 || !valueEmail.match(/^[a-zA-Z._0-9]+@[a-z]+\.[a-z]+$/)) {
            setValidEmail('opacity-1');
            return '';
        } else {
            setValidEmail('opacity-0');
            return valueEmail;
        }
    };
    const checkValidPassword = () => {
        var valuePassword = passwordRef.current.value.trim();
        if (valuePassword.length === 0 || !valuePassword.match(/^[a-zA-Z0-9\.@ ]{6,}$/)) {
            setValidPassword('opacity-1');
            return '';
        } else {
            setValidPassword('opacity-0');
            return valuePassword;
        }
    };

    return (
        <div className={cx('h-full w-96 flex flex-col ')}>
            <div className={cx('bg-white h-4/6 w-full rounded-2xl drop-shadow-lcn-login')}>
                <div className={cx('h-1/6 text-lcn-blue-5 border-b border-lcn-blue-4 border-opacity-20')}>
                    <div className={cx('flex h-full w-full items-center justify-center', 'text-2xl font-semibold')}>
                        Đăng nhập
                    </div>
                </div>
                <div className={cx('absolute z-10 text-red-500 text-sm text-center w-full pt-2', failLogin)}>
                    Tên đăng nhập hoặc mật khẩu không đúng
                </div>
                <div className={cx('h-5/6 flex flex-row justify-center pt-5 pb-5')}>
                    <div className={cx(' w-4/5 p-3 h-full flex flex-col justify-around')}>
                        <div className={cx('flex justify-center w-full')}>
                            <div className={cx('w-full relative  ')}>
                                <div
                                    className={cx(
                                        'flex absolute text-lcn-blue-4 top-3 left-0 items-center pl-3 pointer-events-none ',
                                    )}
                                >
                                    <FiMail />
                                </div>
                                <input
                                    type="text"
                                    className={cx(
                                        'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                                    )}
                                    placeholder="Tên đăng nhập"
                                    onChange={checkValidEmail}
                                    ref={emailRef}
                                />
                                <span className={cx('text-red-500 text-sm pl-3', validEmail)}>Email không hợp lệ!</span>
                            </div>
                        </div>

                        <div className={cx('flex justify-center w-full')}>
                            <div className={cx('w-full relative  ')}>
                                <div
                                    className={cx(
                                        'flex absolute text-lcn-blue-4 top-3 left-0 items-center pl-3 pointer-events-none ',
                                    )}
                                >
                                    <FaLock />
                                </div>
                                <input
                                    type="password"
                                    className={cx(
                                        'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                                    )}
                                    placeholder="Mật khẩu"
                                    onChange={checkValidPassword}
                                    ref={passwordRef}
                                />
                                <span className={cx('text-red-500 text-sm pl-3', validPassword)}>
                                    Mật khẩu không hợp lệ!
                                </span>
                            </div>
                        </div>
                        <div className={cx('w-full h-10 mt-5 flex justify-end')}>
                            <Button
                                className={cx(
                                    'w-full h-full p-0 m-0',
                                    'border border-opacity-50 border-lcn-blue-4 outline-none text-lcn-blue-4',
                                    'bg-lcn-blue-3 justify-center',
                                )}
                                onClick={handleLogin}
                            >
                                Đăng nhập
                            </Button>
                        </div>
                        <div className={cx('flex justify-center w-full text-[#004078]')}>
                            Bạn chưa có tài khoản?
                            <a href="##" className={cx('ml-1 text-[#0289FF] font-semibold')}>
                                Đăng ký ngay
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('h-1/6')}></div>
        </div>
    );
}

export default SignIn;
