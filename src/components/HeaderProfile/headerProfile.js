import classNames from 'classnames/bind';
import styles from './HeaderProfile.module.scss';

const cx = classNames.bind(styles);

function HeaderProfile({ avatar, coverPhoto, userName }) {
    return (
        <div className={cx(' h-1/3 w-full bg-yellow-200')}>
            <div className={cx('w-full h-1/2 bg-cover')}>
                <img alt="coverPhoto" className={cx('w-full h-52')} />
            </div>
        </div>
    );
}

export default HeaderProfile;
