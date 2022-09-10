import classNames from 'classnames';

import Button from '~/components/Button';
import { lcnImage } from '~/image';

const cx = classNames;

function ItemChat() {
    return (
        <Button className={cx('rounded-xl h-16 w-full hover:bg-lcn-blue-3 m-0 p-2 mb-1 mt-1')}>
            <div className={cx('relative w-full h-full flex items-center')}>
                <div
                    className={cx(
                        'w-10 h-10 bg-lcn-blue-4 rounded-full overflow-hidden flex justify-center items-center p-1 relative',
                    )}
                >
                    <img src={lcnImage.avatarDefault} alt="avartar" className={cx('w-full h-full border ')} />
                </div>
                <div className={cx('bg-lcn-green-1 w-3 h-3 absolute z-10 rounded-full bottom-[2px] left-7')}></div>
                <div className={cx('w-40  h-full ml-2 overflow-hidden')}>
                    <div className={cx('text-left text-lcn-blue-5 font-semibold h-8 w-96 ')}>Trọng Phan</div>
                    <div className={cx('text-gray-500 text-xs text-left h-8')}>
                        <span>Bạn: </span> Xin chào
                    </div>
                </div>
                <div className={cx('h-full w-8 relative')}>
                    <div className={cx('h-3 w-3 bg-lcn-blue-4 rounded-full z-10 absolute top-4 right-0')}></div>
                    <div className={cx('text-gray-500 text-xs text-left h-full flex items-end')}>10:00</div>
                </div>
            </div>
        </Button>
    );
}

export default ItemChat;
