import classNames from 'classnames/bind';

import styles from './ItemMessage.module.scss';
import { lcnImage } from '~/image';

const cx = classNames.bind(styles);

function ItemMessage({ children, from }) {
    var bgMessage = 'bg-slate-100 ',
        flexRowReverse = '',
        seen = '';
    if (!!from) {
        bgMessage = 'bg-lcn-blue-4 text-white';
        flexRowReverse = 'flex-row-reverse';
        seen = 'Đã xem';
    }
    return (
        <>
            <div className={cx('flex w-full items-end mb-2', flexRowReverse)}>
                <div
                    className={cx(
                        'w-8 h-8 bg-lcn-blue-4 rounded-full overflow-hidden flex justify-center items-center p-1  mb-8',
                    )}
                >
                    <img src={lcnImage.avatarDefault} alt="avartar" className={cx('w-full h-full border ')} />
                </div>

                <div className={cx('w-2/5 ml-2 mr-2   rounded-3xl p-3 ')}>
                    <div className={cx('  break-words rounded-3xl p-3  ', bgMessage)}>{children}</div>
                    <div className={cx('text-right text-[12px] text-slate-400 pr-2')}>{seen}</div>
                </div>
            </div>
        </>
    );
}

export default ItemMessage;
