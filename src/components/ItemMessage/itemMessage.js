import classNames from 'classnames';

import { lcnImage } from '~/image';
import Avartar from '~/components/Avartar';

const cx = classNames;

function ItemMessage({ children, from, messageData }) {
    var bgMessage = 'bg-slate-100 ',
        flexRowReverse = '',
        seen = '',
        hiddenAvartar = '';
    if (!!from) {
        bgMessage = 'bg-lcn-blue-4 text-white';
        flexRowReverse = 'flex-row-reverse';
        seen = 'Đã xem';
        hiddenAvartar = 'hidden';
    }
    return (
        <>
            {/* <span>{messageData?.authorID.fullName}</span> */}
            <div className={cx('flex w-full items-center ', flexRowReverse)}>
                <Avartar className={cx('h-8 w-8', hiddenAvartar)} src={messageData?.authorID.profile.urlAvartar} />

                <div className={cx('max-w-[40%] ml-1    rounded-xl p-1 ')}>
                    <div className={cx('  break-words rounded-2xl p-3 text-sm ', bgMessage)}>{children}</div>
                    {/* <div className={cx('text-right text-[12px] text-slate-400 pr-2')}>{seen}</div> */}
                </div>
            </div>
        </>
    );
}

export default ItemMessage;
