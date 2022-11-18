import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import { checkOldPassword, updatePassword } from '~/services/authService';
const cx = classNames;

function ContentDoiMatKhau() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('opacity-0');
    const [confirmPassword, setConfirmPassword] = useState('opacity-0');
    const [failUpdate, setFailUpdate] = useState('hidden');
    const [failLogin, setFailLogin] = useState('hidden');
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;

    const oldPassRef = useRef();
    const passRef = useRef();
    const confirmPassReff = useRef();

    const presentPass = async () => {
        var oldPass = oldPassRef.current.value.trim();
        var user = { userName: currAccount.userName, password: oldPass };
        var check = await checkOldPassword(user);

        if (check === true) {
            console.log('Không trùng mật khẩu');
            setFailLogin('');
        } else {
            console.log('Trùng mật khẩu');
            setFailLogin('hidden');
        }
    };
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
            var user = { userName: currAccount.userName, password: valuePassword };
            var update = await updatePassword(user, dispatch, navigate);
            if (update === false) {
                setFailUpdate('');
            }
        } else return false;
    };
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
                            <div className={cx(' text-red-500 text-sm text-center w-full pt-2', failLogin)}>
                                Không khớp với mật khẩu hiện tại
                            </div>
                            <div className={cx('flex justify-center w-full')}>
                                <div className={cx('w-full relative  ')}>
                                    <input
                                        ref={oldPassRef}
                                        type="password"
                                        className={cx(
                                            'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                                        )}
                                        placeholder="Nhập mật khẩu"
                                        onBlur={presentPass}
                                    />
                                </div>
                            </div>
                            <div className={cx('flex justify-center w-full')}>
                                <div className={cx('w-full relative  ')}>
                                    <input
                                        ref={passRef}
                                        type="password"
                                        className={cx(
                                            'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                                        )}
                                        placeholder="Nhập mật khẩu mới"
                                        onChange={checkValidPassword}
                                    />
                                </div>
                            </div>
                            <div className={cx('flex justify-center w-full')}>
                                <div className={cx('w-full relative  ')}>
                                    <input
                                        ref={confirmPassReff}
                                        type="password"
                                        className={cx(
                                            'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                                        )}
                                        placeholder="Nhập lại mật khẩu mới"
                                        onChange={checkConfirmPassword}
                                    />
                                </div>
                            </div>
                            <div className={cx(' text-red-500 text-sm text-center w-full pt-2', failUpdate)}>
                                Trùng với mật khẩu cũ
                            </div>
                            <div className={cx('w-full h-10 flex justify-center')}>
                                <Button
                                    className={cx(
                                        'w-2/4 h-full p-0',
                                        'border border-opacity-50 border-lcn-blue-4 outline-none text-lcn-blue-4',
                                        'bg-lcn-blue-3 justify-center',
                                    )}
                                    onClick={handleSuaMatKhau}
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
