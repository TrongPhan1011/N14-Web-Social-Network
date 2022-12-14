import classNames from 'classnames';

import { lcnImage } from '~/image';

const cx = classNames;

function CardImg() {
    return (
        <div className={cx('w-full h-full p-5 flex flex-wrap justify-between')}>
            <div className={cx('w-1/2 h-1/2 flex flex-col p-2 ')}>
                <div className={cx('h-fulee w-full block overflow-hidden')}>
                    <img src={lcnImage.coverPhoto} alt="avartar" className={cx('w-full h-full rounded')} />
                </div>
            </div>{' '}
            <div className={cx('w-1/2 h-1/2 flex flex-col p-2 ')}>
                <div className={cx('h-fulee w-full block overflow-hidden')}>
                    <img src={lcnImage.coverPhoto} alt="avartar" className={cx('w-full h-full rounded')} />
                </div>
            </div>{' '}
            <div className={cx('w-1/2 h-1/2 flex flex-col p-2 ')}>
                <div className={cx('h-fulee w-full block overflow-hidden')}>
                    <img src={lcnImage.coverPhoto} alt="avartar" className={cx('w-full h-full rounded')} />
                </div>
            </div>{' '}
            <div className={cx('w-1/2 h-1/2 flex flex-col p-2 ')}>
                <div className={cx('h-fulee w-full block overflow-hidden')}>
                    <img src={lcnImage.coverPhoto} alt="avartar" className={cx('w-full h-full rounded')} />
                </div>
            </div>
        </div>
    );
}

export default CardImg;
