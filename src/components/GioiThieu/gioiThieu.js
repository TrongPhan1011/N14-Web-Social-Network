import classNames from 'classnames/bind';

import styles from './GioiThieu.module.scss';
import { FaSchool, FaTransgender, FaMobileAlt, FaBirthdayCake } from 'react-icons/fa';

const cx = classNames.bind(styles);

function GioiThieu() {
    return (
        <div className={'  w-full p-5 pt-0'}>
            <div className={cx('flex  w-full mb-4')}>
                <FaSchool className={cx('text-lcn-blue-4 w-7 h-7 ')} />{' '}
                <span className={cx('text-sm  ml-4  w-4/5')}>Học tại trường Đại học Công Nghiệp TP. HCM</span>
            </div>
            <div className={cx('flex  w-full mb-4')}>
                <FaTransgender className={cx('text-red-500 w-7 h-7')} />{' '}
                <span className={cx('text-sm  ml-4 w-4/5')}>Nam</span>
            </div>
            <div className={cx('flex w-full mb-4')}>
                <FaMobileAlt className={cx('text-yellow-500  w-7 h-7')} />{' '}
                <span className={cx('text-sm  ml-4 w-4/5')}>0123456789</span>
            </div>
            <div className={cx('flex  w-full mb-4')}>
                <FaBirthdayCake className={cx('text-pink-500  w-7 h-7')} />{' '}
                <span className={cx('text-sm  ml-4 w-4/5')}>10/11/2001</span>
            </div>
        </div>
    );
}

export default GioiThieu;
