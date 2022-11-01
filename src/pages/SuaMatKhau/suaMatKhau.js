import classNames from 'classnames';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '~/components/Button';

import { FaLock } from 'react-icons/fa';
import { updatePassword } from '~/services/authService';

const cx = classNames;
function SuaMatKhau() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [password, setPassword] = useState('opacity-0');
    const [confirmPassword, setConfirmPassword] = useState('opacity-0');
    const [failUpdate, setFailUpdate] = useState('hidden');
    const passRef = useRef();
    const confirmPassReff = useRef();
    var currentSignUpAccount = useSelector((state) => state.persistedReducer.signUp.userSignUp);

    const checkValidPassword = () => {
        var valuePassword = passRef.current.value.trim();
        if (valuePassword.length === 0 || !valuePassword.match(/^[a-zA-Z0-9.@ ]{6,}$/)) {
            setPassword('opacity-1');
            return '';
        } else {
            setPassword('opacity-0');
            return valuePassword;
        }
    };
    const checkConfirmPassword = () => {
        var valueConfirmPassword = confirmPassReff.current.value.trim();
        if (valueConfirmPassword.length === 0 || valueConfirmPassword !== passRef.current.value.trim()) {
            setConfirmPassword('opacity-1');
            return '';
        } else {
            setConfirmPassword('opacity-0');
            return valueConfirmPassword;
        }
    };
    const handleSuaMatKhau = async () => {
        var valuePassword = checkConfirmPassword();
        if (!!valuePassword) {
            var user = { userName: currentSignUpAccount.userName, password: valuePassword };
            var update = await updatePassword(user, dispatch, navigate);
            if (update === false) {
                setFailUpdate('');
            }
        } else return false;
    };
    return (
        <div className={cx('bg-white h-4/6 w-2/6 rounded-2xl drop-shadow-lcn-login')}>
            <div className={cx('h-1/4 p-5 border-b border-lcn-blue-4 border-opacity-20')}>
                <div className={cx('flex w-full', 'text-lcn-blue-5 text-3xl font-semibold')}>Sửa đổi mật khẩu</div>
                <div className={cx(' text-red-500 text-sm text-center w-full pt-2', failUpdate)}>
                    Trùng với mật khẩu cũ
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
                            <FaLock />
                        </div>
                        <input
                            type="password"
                            className={cx(
                                'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                            )}
                            placeholder="Nhập mật khẩu mới"
                            ref={passRef}
                            onChange={checkValidPassword}
                        />
                        <span className={cx('text-red-500 text-sm pl-3', password)}>Mật khẩu phải 6 kí tự trở lên</span>
                    </div>
                </div>
                <div className={cx('flex justify-center w-full')}>
                    <div className={cx('w-2/3  relative  ')}>
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
                            placeholder="Nhập lại mật khẩu"
                            ref={confirmPassReff}
                            onChange={checkConfirmPassword}
                        />
                        <span className={cx('text-red-500 text-sm pl-3', confirmPassword)}>
                            Mật khẩu không trùng khớp
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
                            href="/quenMatKhau"
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
                            onClick={handleSuaMatKhau}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuaMatKhau;
