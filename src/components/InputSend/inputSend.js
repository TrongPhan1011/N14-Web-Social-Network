import classNames from 'classnames';

import { AiFillPlusCircle, AiFillFileImage } from 'react-icons/ai';
import { RiSendPlaneFill } from 'react-icons/ri';

import Button from '~/components/Button';

const cx = classNames;

function InputSend({ type }) {
    var positon = 'absolute bottom-0';
    if (type === 'comment') {
        positon = '';
    }
    return (
        <div className={cx('h-16   bg-white p-2 w-full mr-20 flex items-center', positon)}>
            <Button className={cx('m-0 ml-1')}>
                <AiFillPlusCircle className={cx('text-lcn-blue-4 text-3xl')} />
            </Button>
            <Button className={cx('m-0 ml-1')}>
                <AiFillFileImage className={cx('text-lcn-blue-4 text-3xl')} />
            </Button>
            <input
                type="text"
                className={cx(
                    'w-4/5 h-11 p-3 border border-lcn-blue-4  rounded-3xl m-2 break-words outline-none caret-lcn-blue-4',
                )}
                placeholder="Nhập tin nhắn"
            />
            <Button className={cx(' flex justify-center items-center rounded-full m-0 w-1/12  h-12')}>
                <RiSendPlaneFill className={cx('text-lcn-blue-4 text-4xl hover:text-lcn-blue-5')} />
            </Button>
        </div>
    );
}

export default InputSend;
