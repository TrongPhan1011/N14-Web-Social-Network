import classNames from 'classnames';

import { RiMore2Fill } from 'react-icons/ri';

import { lcnImage } from '~/image';
import Button from '~/components/Button';

const cx = classNames;
function HeaderPost({ type }) {
    const showOptionPost = () => {
        if (type === 'create') {
            return (
                <select className={cx('w-24 h-6 text-sm outline-none rounded-3xl text-center bg-lcn-blue-1')}>
                    <option className={cx()}>Công khai</option>
                    <option>Chỉ mình tôi</option>
                </select>
            );
        } else
            return (
                <Button className={cx('m-0 justify-end  bg-lcn-blue-2')}>
                    <RiMore2Fill className={cx('text-xl pr-0 text-slate-500')} />
                </Button>
            );
    };

    return (
        <div className={cx('h-11 w-full  flex items-center justify-between pr-3 pl-3')}>
            <div className={cx('flex')}>
                <div
                    className={cx(
                        'w-10 h-10 bg-lcn-blue-4 rounded-full overflow-hidden flex justify-center items-center p-1 relative',
                    )}
                >
                    <img src={lcnImage.avatarDefault} alt="avartar" className={cx('w-full h-full border ')} />
                </div>

                <div className={cx('w-40  h-full  overflow-hidden flex items-center')}>
                    <Button className={cx('text-left text-lcn-blue-5 font-semibold h-8 w-96 text-lg')}>
                        Trọng Phan
                    </Button>
                </div>
            </div>

            {showOptionPost()}
        </div>
    );
}

export default HeaderPost;
