import classNames from 'classnames/bind';

import { BiSmile } from 'react-icons/bi';
import Button from '~/components/Button';

import Avartar from '~/components/Avartar';
import { formatTimeAuto, getLastName } from '~/lib/formatString';
import style from './ItemMessage.module.scss';
import { MdReply } from 'react-icons/md';
import { FiMoreVertical } from 'react-icons/fi';
import { useEffect } from 'react';

const cx = classNames.bind(style);

function ItemMessage({ children, from, messageData, isLastMess }) {
    const MEMBER_SEEN = {
        MIN: 2,
    };
    useEffect(() => {}, []);

    var bgMessage = 'bg-slate-100 ',
        flexRowReverse = '',
        seen = '',
        hidden = '';

    if (!!from) {
        bgMessage = 'bg-lcn-blue-4 text-white';
        flexRowReverse = 'flex-row-reverse';

        hidden = 'hidden';
        if (isLastMess === true) {
            if (!!messageData.seen) {
                seen = 'Đã gửi';
            } else if (!!messageData.seen && messageData?.seen.length === MEMBER_SEEN.MIN) {
                seen = 'Đã xem';
            }
        }
    }

    return (
        <>
            <div className={cx('message-hover', 'flex w-full items-end mt-2 ', flexRowReverse)}>
                <Avartar className={cx('h-8 w-8 mb-1', hidden)} src={messageData?.authorID.profile.urlAvartar} />

                <div
                    className={cx('max-w-[40%] ml-1 pr-1 pl-1   rounded-xl  ')}
                    title={formatTimeAuto(messageData.createdAt)}
                >
                    <span className={cx('text-xs text-slate-300 pl-2 pr-2  ', hidden)}>
                        {getLastName(messageData?.authorID.fullName)}
                    </span>
                    <div className={cx('break-words rounded-3xl p-2 pr-3 pl-3 text-sm text-center', bgMessage)}>
                        {children}
                    </div>
                    <div className={cx('text-right text-[12px] text-slate-400 pr-2')}>{seen}</div>
                </div>
                <div className={cx('more-hover', '  h-full hidden  ', flexRowReverse)}>
                    <Button
                        type="button"
                        className={cx('p-0 m-0 text-2xl text-slate-400 hover:text-lcn-blue-4 hover:bg-slate-100')}
                    >
                        <BiSmile />
                    </Button>
                    <Button
                        type="button"
                        className={cx('p-0 m-0 text-2xl text-slate-400 hover:text-lcn-blue-4 hover:bg-slate-100')}
                    >
                        <MdReply />
                    </Button>
                    <Button
                        type="button"
                        className={cx('p-0 m-0 text-xl text-slate-400 hover:text-lcn-blue-4 hover:bg-slate-100')}
                    >
                        <FiMoreVertical />
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ItemMessage;
