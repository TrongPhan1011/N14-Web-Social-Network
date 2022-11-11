import classNames from 'classnames';

import { FaSchool, FaTransgender, FaMobileAlt, FaBirthdayCake } from 'react-icons/fa';

const cx = classNames;

function GioiThieu({ data, birthday, education, gender, phoneNumber = '' }) {
    return (
        <div className={'  w-full p-5'}>
            <div className={cx('flex  w-full mb-4')}>
                <FaSchool className={cx('text-lcn-blue-4 w-7 h-7 ')} />{' '}
                <span className={cx('text-sm  ml-4  w-4/5')}>{education}</span>
            </div>
            <div className={cx('flex  w-full mb-4')}>
                <FaTransgender className={cx('text-red-500 w-7 h-7')} />{' '}
                <span className={cx('text-sm  ml-4 w-4/5')}>{gender}</span>
            </div>
            <div className={cx('flex w-full mb-4')}>
                <FaMobileAlt className={cx('text-yellow-500  w-7 h-7')} />{' '}
                <span className={cx('text-sm  ml-4 w-4/5')}>{phoneNumber}</span>
            </div>
            <div className={cx('flex  w-full mb-4')}>
                <FaBirthdayCake className={cx('text-pink-500  w-7 h-7')} />{' '}
                <span className={cx('text-sm  ml-4 w-4/5')}>{birthday}</span>
            </div>
        </div>
    );
}

export default GioiThieu;
