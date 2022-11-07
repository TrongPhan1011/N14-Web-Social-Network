import classNames from 'classnames';
import { lcnImage } from '~/image';
import Avartar from '~/components/Avartar';

const cx = classNames;

function HeaderProfile({ avatar, coverPhoto, userName }) {
    var ava = lcnImage.avatarDefault;
    if (avatar) {
        ava = avatar;
    }
    return (
        <div className={cx('h-2/5 w-full mb-16')}>
            <div className={cx(' h-full w-full ')}>
                <div className={cx('h-full w-full ')}>
                    {!!coverPhoto ? (
                        <img src={coverPhoto} alt="coverPhoto" className={cx('w-full h-4/5')} />
                    ) : (
                        <div className={cx('w-full h-4/5 bg-lcn-blue-3')}></div>
                    )}
                    <div className={cx(' relative  h-2/5 w-full  flex justify-center ')}>
                        <div
                            className={cx(
                                'w-32 h-32 top-[-60%] z-0 relative overflow-hidden flex justify-center items-center rounded-full border-[3px] bg-black bg-opacity-20 border-white',
                            )}
                        >
                            <Avartar className={cx('h-28 w-28')} src={ava} />
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={cx(
                    'bg-white w-full h-14 text-2xl flex justify-center items-center font-semibold text-lcn-blue-5',
                )}
            >
                {userName}
            </div>
        </div>
    );
}

export default HeaderProfile;
