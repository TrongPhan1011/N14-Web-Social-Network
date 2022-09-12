import classNames from 'classnames';
import { lcnImage } from '~/image';
import Button from '~/components/Button';
const cx = classNames;

function ItemChan() {
    return (
        <div className={cx('rounded-xl h-16 w-full flex flex-row items-center hover:bg-lcn-blue-3 m-0 p-2')}>
            <div
                className={cx(
                    'w-10 h-10 bg-lcn-blue-4 rounded-full overflow-hidden flex justify-center items-center p-1 relative',
                )}
            >
                <img src={lcnImage.avatarDefault} alt="avartar" className={cx('w-full h-full border ')} />
            </div>
            <div className={cx('w-[300px] flex flex-row items-center h-full ml-2 overflow-hidden')}>
                <div className={cx('text-left mb-1 text-lcn-blue-5 font-semibold h-6 w-96 ')}>Trọng Phan</div>
            </div>
            <div>
                <Button className={cx('w-[70px] text-sm justify-center bg-red-500 p-1 text-white')}>Bỏ chặn</Button>
            </div>
        </div>
    );
}

export default ItemChan;
