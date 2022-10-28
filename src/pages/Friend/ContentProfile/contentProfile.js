import { useEffect, useState, memo } from 'react';

import classNames from 'classnames/bind';
import styles from './ContentProfile.module.scss';
import HeaderProfile from '~/components/HeaderProfile';
import Button from '~/components/Button';
import SubProfile from '~/components/SubProfile';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { RiChat3Line } from 'react-icons/ri';
import { lcnImage } from '~/image';
import Post from '~/components/Post';
import { getUserById } from '~/services/userService';
import { useSelector, useDispatch } from 'react-redux';

import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
const cx = classNames.bind(styles);

function ContentProfile({ userId }) {
    const dispatch = useDispatch();
    const [userProfile, setUserProfile] = useState({});
    const [profile, setProfile] = useState({});
    const [birthday, setBirthday] = useState();
    const [active, setActive] = useState('');
    const [inRelationship, setInRelationship] = useState('');
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    useEffect(() => {
        const getProfile = async () => {
            const getUserProfile = await getUserById(userId, accessToken, axiosJWT);
            setUserProfile(getUserProfile);
            setProfile(getUserProfile.profile);
            // setBirthday(getUserProfile.birthday.split('-'));
            var date = getUserProfile.birthday.split('-');
            var myDate = `${date[2]}-${date[1]}-${date[0]}`;
            setBirthday(myDate);

            if (curUser.id === userId) {
                setActive('hidden');
            } else {
                setActive('');
            }
            // var obj = curUser.friend.find((o) => o.id === userId);
            // console.log(obj.id);
            // if (obj.id === userId) {
            //     console.log('dang la ban be');
            // }
        };

        getProfile();
    }, [userId]);

    return (
        <div className={cx(' w-full h-full relative flex overflow-hidden justify-center items-center')}>
            <div className={cx(' w-full h-screen bg-white flex flex-col items-center   overflow-y-scroll')}>
                <HeaderProfile
                    avatar={profile.urlAvartar}
                    coverPhoto={lcnImage.coverPhoto}
                    userName={userProfile.fullName}
                />
                <div className={cx('mb-3 w-full h-14 flex justify-center')}>
                    <div className={cx('w-1/4 h-full flex flex-row justify-between ')}>
                        <Button
                            className={cx(
                                'bg-lcn-blue-3 justify-center items-center w-28 font-[400] h-10 text-lcn-blue-4 border border-lcn-blue-3',
                                active,
                            )}
                        >
                            <AiOutlineUsergroupAdd className={cx('mr-1')} />
                            Kết bạn
                        </Button>
                        <Button
                            className={cx(
                                'bg-lcn-green-1 bg-opacity-20 border font-[400] border-lcn-green-1 border-opacity-25 justify-center items-center w-28 h-10 text-lcn-green-1 hover:bg-opacity-30',
                                'active:bg-opacity-40',
                                active,
                            )}
                        >
                            <RiChat3Line className={cx('mr-1')} /> Nhắn tin
                        </Button>
                    </div>
                </div>
                <div className={cx('w-full h-full bg-lcn-blue-1')}>
                    <div className={cx('w-full  p-3 flex flex-row justify-around')}>
                        <SubProfile data={userProfile} profile={profile} birthday={birthday} />
                        <SubProfile type="banbe" soLuongBan="20" />
                        <SubProfile type="img" soLuongAnh="11" />
                    </div>
                </div>
                <div className={cx('w-full bg-lcn-blue-1 m-2 flex flex-col items-center')}>
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>
        </div>
    );
}

export default memo(ContentProfile);
