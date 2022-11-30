import classNames from 'classnames';
import { useState, useRef, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FaLock } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import { RiUserFill } from 'react-icons/ri';

import { sendOTP, getAuthByMail } from '~/services/authService';
import config from '~/configRoutes';
import Button from '~/components/Button';
import { userSignUp } from '~/redux/Slice/signUpSlice';

const cx = classNames;

function SignUp() {
    const [selectedRadioBtn, setSelectedRadioBtn] = useState('');
    const [validUserName, setvalidUserName] = useState('opacity-0');
    const [validEmail, setValidEmail] = useState('opacity-0');
    const [validPassword, setValidPassword] = useState('opacity-0');
    const [validConfirmPassword, setvalidConfirmPassword] = useState('opacity-0');
    const [validDate, setValidDate] = useState('opacity-0');
    const [date, setDate] = useState(null);

    const [failLogin, setFailLogin] = useState('hidden');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isRadioSelected = (value) => selectedRadioBtn === value;
    const handleRadioClick = (e) => {
        setSelectedRadioBtn(e.currentTarget.value);
    };

    const emailRef = useRef();
    const passwordRef = useRef();
    const userRef = useRef();
    const confirmPaswordRef = useRef();
    const dateRef = useRef();

    var currentAccount = useSelector((state) => state.persistedReducer.auth);

    useEffect(() => {
        if (currentAccount.currentUser !== null && !!currentAccount.currentUser.accessToken) {
            navigate(config.routeConfig.home);
        }
    }, []);

    //check valid

    const checkValidUserName = () => {
        var valueUserName = userRef.current.value.trim();
        if (
            valueUserName.length === 0 ||
            !valueUserName.match(
                /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/,
            )
        ) {
            setvalidUserName('opacity-1');
            return '';
        } else {
            setvalidUserName('opacity-0');
            return valueUserName;
        }
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
    const checkExistEmail = async () => {
        var valueEmail = emailRef.current.value.trim();

        var userGeted = await getAuthByMail(valueEmail);
        if (!!userGeted) {
            setFailLogin('');
        } else setFailLogin('hidden');
    };
    const checkValidPassword = () => {
        var valuePassword = passwordRef.current.value.trim();
        if (valuePassword.length === 0 || !valuePassword.match(/^[A-Z]{1}[a-zA-Z0-9\.@ ]{5,}$/)) {
            setValidPassword('opacity-1');
            return '';
        } else {
            setValidPassword('opacity-0');
            return valuePassword;
        }
    };
    const checkConfirmPassword = () => {
        var valueConfirmPassword = confirmPaswordRef.current.value.trim();
        if (valueConfirmPassword.length === 0 || valueConfirmPassword !== passwordRef.current.value.trim()) {
            setvalidConfirmPassword('opacity-1');
            return '';
        } else {
            setvalidConfirmPassword('opacity-0');
            return valueConfirmPassword;
        }
    };

    const checkDate = () => {
        var userdate = dateRef.current.value;
        var birthday = userdate.split('-');
        var mydate = new Date(birthday[0], birthday[1] - 1, birthday[2]);

        if (new Date().getFullYear() - mydate.getFullYear() < 16) {
            setValidDate('opacity-1');
            return '';
        } else {
            setValidDate('opacity-0');
            setDate(userdate);
            return userdate;
        }
    };

    const handleRegister = async () => {
        var valueEmail = checkValidEmail();
        var valuePassword = checkValidPassword();
        var valueUserName = checkValidUserName();
        var valueDate = checkDate();
        var gender = selectedRadioBtn;

        if (!!valueEmail && !!valuePassword && !!valueUserName & !!valueDate && !!gender) {
            var user = {
                name: valueUserName,
                userName: valueEmail,
                password: valuePassword,
                birthday: valueDate,
                gender: gender,
            };
            // đăng ký thành công -->
            var register = await sendOTP(user, dispatch, navigate);

            if (!register) {
                setFailLogin('');
            }
        } else return alert('Vui lòng điền đầy đủ thông tin');
    };

    return (
        <div className={cx('bg-white h-5/6 w-2/6 rounded-2xl drop-shadow-lcn-login')}>
            <div className={cx('h-1/6 p-5 border-b border-lcn-blue-4 border-opacity-20')}>
                <div className={cx('flex w-full', 'text-lcn-blue-5 text-3xl font-semibold')}>Đăng ký</div>
                <div className={cx('flex w-full', 'text-sm text-opacity-60 text-black')}>Nhanh chóng và thuận tiện</div>
            </div>
            <div className={cx('h-5/6 flex flex-row justify-center')}>
                <div className={cx(' w-2/3 p-3 h-full flex flex-col justify-around')}>
                    <div className={cx(' text-red-500 text-sm text-center w-full pt-2', failLogin)}>
                        Email đã được sử dụng
                    </div>
                    <div className={cx('flex justify-center w-full')}>
                        <div className={cx('w-full relative  ')}>
                            <div
                                className={cx(
                                    'flex absolute text-lcn-blue-4 top-3 left-0 items-center pl-3 pointer-events-none ',
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
                                onChange={checkValidUserName}
                                ref={userRef}
                            />
                            <span className={cx('text-red-500 text-sm pl-3', validUserName)}>
                                Tên người dùng không hợp lệ!
                            </span>
                        </div>
                    </div>
                    <div className={cx('flex justify-center w-full')}>
                        <div className={cx('w-full relative  ')}>
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
                                placeholder="Nhập email"
                                onChange={checkValidEmail}
                                onBlur={checkExistEmail}
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
                                placeholder="Nhập Mật khẩu"
                                onChange={checkValidPassword}
                                ref={passwordRef}
                            />
                            <span className={cx('text-red-500 text-center text-sm ', validPassword)}>
                                Mật khẩu phải chữ cái đầu viết hoa và tối thiểu 6 kí tự và không kí tự đặc biệt
                            </span>
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
                                placeholder="Nhập lại Mật khẩu"
                                onChange={checkConfirmPassword}
                                ref={confirmPaswordRef}
                            />
                            <span className={cx('text-red-500 text-sm pl-3', validConfirmPassword)}>
                                Mật khẩu không trùng khớp!
                            </span>
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
                                ref={dateRef}
                                onChange={(e) => checkDate(e)}
                            />
                            <span className={cx('text-red-500 text-sm pl-3', validDate)}>
                                Tuổi của bạn phải trên 16
                            </span>
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
                            onClick={handleRegister}
                        >
                            Đăng ký
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(SignUp);
