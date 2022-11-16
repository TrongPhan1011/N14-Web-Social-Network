import { useEffect, useRef, useState, memo } from 'react';

import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { useSelector, useDispatch } from 'react-redux';

import classNames from 'classnames';
import { updateProfile } from '~/services/userService';
import { FaSchool } from 'react-icons/fa';
import { RiUserFill } from 'react-icons/ri';
import { IoMailSharp } from 'react-icons/io5';
import Button from '~/components/Button';

const cx = classNames;

function ContentThongTinChung() {
    const dispatch = useDispatch();
    const isRadioSelected = (value) => selectedRadioBtn === value;
    const handleRadioClick = (e) => {
        setSelectedRadioBtn(e.currentTarget.value);
        console.log(e.currentTarget.value);
    };

    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    var date = curUser.birthday.split('-');
    var mydate = new Date(date[0], date[1] - 1, date[2]);

    var numberOfDaysToAdd = 1;
    var date1 = mydate.setDate(mydate.getDate() + numberOfDaysToAdd);
    var defaultValue = new Date(date1).toISOString().split('T')[0];
    const [selectedRadioBtn, setSelectedRadioBtn] = useState(curUser.gender);
    const [validUserName, setvalidUserName] = useState('hidden');
    const [validDate, setValidDate] = useState('hidden');
    const [newDate, setNewDate] = useState(null);

    const userRef = useRef();
    const dateRef = useRef();
    const educationRef = useRef();

    const checkValidUserName = () => {
        var valueUserName = userRef.current.value.trim();
        if (
            valueUserName.length === 0 ||
            !valueUserName.match(
                /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/,
            )
        ) {
            setvalidUserName('');
            return '';
        } else {
            setvalidUserName('hidden');
            return valueUserName;
        }
    };
    const checkDate = () => {
        var userdate = dateRef.current.value;

        var birthday = userdate.split('-');
        var mydate = new Date(birthday[0], birthday[1] - 1, birthday[2]);

        if (new Date().getFullYear() - mydate.getFullYear() < 16) {
            setValidDate('');
            return '';
        } else {
            setValidDate('hidden');
            setNewDate(userdate);
            return userdate;
        }
    };
    const handleUpdate = async () => {
        var valueUserName = checkValidUserName();
        var valueDate = checkDate();
        var gender = selectedRadioBtn;
        var valueEducation = educationRef.current.value.trim();
        if (window.confirm('Bạn có muốn thay đổi không')) {
            var user = {
                fullName: valueUserName,
                education: valueEducation,
                birthday: valueDate,
                gender: gender,
            };
            console.log(user);
            console.log(curUser.id);
            // var update = await updateProfile(curUser.id, user, accessToken, axiosJWT, dispatch);
            // if (!!update) {
            //     console.log('update thành công');
            // }
        } else {
            console.log('huỷ lưu');
        }
    };
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
                                <div className={cx('flex flex-col justify-center w-full')}>
                                    <div className={cx('w-full relative flex justify-center ')}>
                                        <div
                                            className={cx(
                                                'flex absolute text-lcn-blue-4 inset-y-0  left-0 items-center pl-3 pointer-events-none ',
                                            )}
                                        >
                                            <RiUserFill />
                                        </div>
                                        <input
                                            ref={userRef}
                                            onChange={checkValidUserName}
                                            type="text"
                                            className={cx(
                                                'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                                            )}
                                            placeholder="Tên người dùng"
                                            defaultValue={curUser.fullName}
                                        />
                                    </div>
                                    <span className={cx('mt-3 text-red-500 text-sm pl-5', validUserName)}>
                                        Tên người dùng không hợp lệ!
                                    </span>
                                </div>

                                <div className={cx('flex justify-center w-full')}>
                                    <div className={cx('w-full relative  ')}>
                                        <div
                                            className={cx(
                                                'flex absolute text-lcn-blue-4 inset-y-0 left-0 items-center pl-3 pointer-events-none ',
                                            )}
                                        >
                                            <FaSchool />
                                        </div>
                                        <input
                                            ref={educationRef}
                                            type="text"
                                            className={cx(
                                                'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                                            )}
                                            placeholder="Tên trường học"
                                            defaultValue={curUser.profile.education}
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
                                            <IoMailSharp />
                                        </div>
                                        <input
                                            readOnly={true}
                                            type="text"
                                            className={cx(
                                                'block p-2 pl-8  text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 bg-slate-300 cursor-not-allowed outline-none placeholder:text-lcn-placeholder',
                                            )}
                                            placeholder="Số email"
                                            defaultValue={curUser.email}
                                        />
                                    </div>
                                </div>

                                <div className={cx('flex flex-col justify-center w-full')}>
                                    <div className={cx('w-full relative ')}>
                                        <div
                                            className={cx(
                                                'flex absolute text-lcn-blue-4 inset-y-0 left-0 items-center pl-3 pointer-events-none',
                                                'cursor-no-drop',
                                            )}
                                        ></div>
                                        <input
                                            ref={dateRef}
                                            defaultValue={defaultValue}
                                            type="date"
                                            className={cx(
                                                'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none',
                                            )}
                                            onChange={(e) => checkDate(e)}
                                        />
                                    </div>
                                    <span className={cx('mt-3 text-red-500 text-sm pl-5', validDate)}>
                                        Người dùng phải lớn hơn 16 tuổi
                                    </span>
                                </div>
                                <div className={cx('w-full  flex flex-row justify-between')}>
                                    <label>
                                        <input
                                            className={cx('mr-2')}
                                            type="radio"
                                            value="Nam"
                                            checked={isRadioSelected('Nam')}
                                            onChange={handleRadioClick}
                                        />
                                        Nam
                                    </label>

                                    <label>
                                        <input
                                            className={cx('mr-2')}
                                            type="radio"
                                            value="Nữ"
                                            checked={isRadioSelected('Nữ')}
                                            onChange={handleRadioClick}
                                        />
                                        Nữ
                                    </label>

                                    <label>
                                        <input
                                            className={cx('mr-2')}
                                            type="radio"
                                            value="Khác"
                                            checked={isRadioSelected('Khác')}
                                            onChange={handleRadioClick}
                                        />
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
                                        onClick={handleUpdate}
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

export default memo(ContentThongTinChung);
