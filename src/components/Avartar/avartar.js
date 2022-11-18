import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { lcnImage } from '~/image';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { getMemberOfChat } from '~/services/chatService';
import { useState, useEffect, memo } from 'react';

const cx = classNames;

function Avartar({ className, src, idGroup, typeAvatar }) {
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    const [memberFetch, setMemberFetch] = useState();
    const [srcImg, setSrcImg] = useState(lcnImage.avatarDefault);

    useEffect(() => {
        const getMemberGroup = async () => {
            var arrMemberFetch = await getMemberOfChat(idGroup, accessToken, axiosJWT);
            setMemberFetch(arrMemberFetch);
        };

        if (!!src) {
            setSrcImg(src);
        } else if (typeAvatar === 'group' && !!idGroup) {
            getMemberGroup();
        }
    }, [idGroup, src, typeAvatar]);

    const renderAvatarGroup = () => {
        if (!!memberFetch && memberFetch.length > 0) {
            var numberMemberOther = memberFetch.length - 3;

            var arrAvartar = memberFetch.map((member, index) => {
                if (memberFetch.length > 4 && index > 2) {
                    return (
                        <div
                            key={index + ' '}
                            className={cx(
                                ' rounded-[50%]   flex justify-center items-center p-0 ',
                                'overflow-hidden h-1/2 w-1/2 text-lcn-blue-4 font-semibold text-xs border border-lcn-blue-3 ',
                            )}
                        >
                            +{numberMemberOther}
                        </div>
                    );
                }
                return (
                    <div
                        key={index + ''}
                        className={cx(
                            ' rounded-[50%]   flex justify-center items-center p-0 ',
                            'overflow-hidden h-1/2 w-1/2',
                        )}
                    >
                        <img src={member.profile.urlAvartar} alt="avartar" className={cx('w-full h-full')} />
                    </div>
                );
            });

            return arrAvartar.slice(0, 4);
        }
    };
    return (
        <>
            {!!src ? (
                <div
                    className={cx(
                        ' rounded-[50%]   flex justify-center items-center p-0 ',
                        'overflow-hidden',
                        className,
                    )}
                >
                    <img src={srcImg} alt="avartar" className={cx('w-full h-full')} />
                </div>
            ) : (
                <div
                    className={cx(
                        '    flex justify-center flex-wrap items-center p-0 ',

                        className,
                    )}
                >
                    {renderAvatarGroup()}
                </div>
            )}
        </>
    );
}

export default Avartar;
