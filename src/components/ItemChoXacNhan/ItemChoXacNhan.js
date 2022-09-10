import classNames from 'classnames';

import Button from '~/components/Button';
import { lcnImage } from '~/image';
const cx = classNames;

function ItemChoXacNhan() {
    return (
        <div className={cx('rounded-xl h-16 w-full hover:bg-lcn-blue-3 m-0 p-2 mb-1 mt-1')}>
            <div className={cx('relative w-full h-full flex items-center')}>
                <div
                    className={cx(
                        'w-10 h-10 bg-lcn-blue-4 rounded-full overflow-hidden flex justify-center items-center p-1 relative',
                    )}
                >
                    <img src={lcnImage.avatarDefault} alt="avartar" className={cx('w-full h-full border ')} />
                </div>
                <div className={cx('w-48  h-full ml-2 overflow-hidden')}>
                    <div className={cx('text-left mb-1 text-lcn-blue-5 font-semibold h-6 w-96 ')}>Trọng Phan</div>
                    <div className={cx('text-white text-xs flex flex-row justify-between text-left h-10')}>
                        <Button
                            className={cx(
                                'w-20  m-0 rounded-2xl border border-lcn-blue-4 h-5 bg-lcn-blue-4 flex items-center  justify-center bg-opacity-100 hover:bg-opacity-100',
                            )}
                        >
                            Đồng ý
                        </Button>
                        <Button
                            className={cx(
                                'w-20 m-0 rounded-2xl h-5 border border-red-500  bg-red-400  flex items-center justify-center bg-opacity-100 hover:bg-opacity-100',
                            )}
                        >
                            Xoá
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemChoXacNhan;
