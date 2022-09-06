import classNames from 'classnames/bind';
import styles from './HeaderProfile.module.scss';

const cx = classNames.bind(styles);

function HeaderProfile({ avatar, coverPhoto, userName }) {
    return (
        <div className={cx('h-2/5 w-full mb-16')}>
            <div className={cx(' h-full w-full ')}>
                <div className={cx('h-full w-full ')}>
                    <img src={coverPhoto} alt="coverPhoto" className={cx('w-full h-4/5')} />
                    <div className={cx(' relative  h-2/5 w-full  flex justify-center ')}>
                        <div
                            className={cx(
                                'w-32 h-32 top-[-60%] z-0 relative overflow-hidden flex justify-center items-center rounded-full border-[3px] bg-black bg-opacity-20 border-white',
                            )}
                        >
                            <div className={cx('w-28 h-28 overflow-hidden  rounded-full ')}>
                                <img src={avatar} alt="avatar" className={cx('')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={cx(
                    'bg-white w-full h-14 text-lg flex justify-center items-center font-semibold text-lcn-blue-5',
                )}
            >
                {userName}
            </div>
        </div>
    );
}

export default HeaderProfile;
