import classNames from 'classnames/bind';
import styles from './CardFriend.module.scss';
import { lcnImage } from '~/image';
const cx = classNames.bind(styles);

function CardFriend() {
    return (
        <div className={cx('w-full h-full p-5 flex flex-wrap justify-between')}>
            <div className={cx('w-1/2 h-1/2 flex flex-col p-2 ')}>
                <div className={cx('h-4/5 w-full block overflow-hidden')}>
                    <img src={lcnImage.coverPhoto} alt="avartar" className={cx('w-full h-full rounded')} />
                </div>
                <div className={cx('h-1/5 w-full flex justify-center text-sm font-semibold')}>Trọng non</div>
            </div>{' '}
            <div className={cx('w-1/2 h-1/2 flex flex-col p-2')}>
                <div className={cx('h-4/5 w-full block overflow-hidden')}>
                    <img src={lcnImage.coverPhoto} alt="avartar" className={cx('w-full h-full rounded')} />
                </div>
                <div className={cx('h-1/5 w-full flex justify-center text-sm font-semibold')}>Trọng non</div>
            </div>{' '}
            <div className={cx('w-1/2 h-1/2 flex flex-col p-2 ')}>
                <div className={cx('h-4/5 w-full block overflow-hidden')}>
                    <img src={lcnImage.coverPhoto} alt="avartar" className={cx('w-full h-full rounded')} />
                </div>
                <div className={cx('h-1/5 w-full flex justify-center text-sm font-semibold')}>Trọng non</div>
            </div>{' '}
            <div className={cx('w-1/2 h-1/2 flex flex-col p-2 ')}>
                <div className={cx('h-4/5 w-full block overflow-hidden')}>
                    <img src={lcnImage.coverPhoto} alt="avartar" className={cx('w-full h-full rounded')} />
                </div>
                <div className={cx('h-1/5 w-full flex justify-center text-sm font-semibold')}>Trọng non</div>
            </div>
        </div>
    );
}

export default CardFriend;
