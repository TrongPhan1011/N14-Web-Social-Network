import classNames from 'classnames';

import { BiSearch } from 'react-icons/bi';
import { FaBell } from 'react-icons/fa';
import Button from '~/components/Button';

const cx = classNames;
function HeaderNews() {
    return (
        <div className={cx(' w-full h-16  bg-lcn-blue-2 flex p-2')}>
            <div className={cx('text-xl text-lcn-blue-5 font-semibold flex justify-center items-center w-1/6')}>
                Bài viết{' '}
            </div>
            <div className={cx('h-full w-4/6 ')}>
                <div className={cx('p-2 w-full h-full flex justify-between items-center ')}>
                    <div className={cx('w-full h-11 flex rounded-3xl  border border-lcn-blue-4 bg-white')}>
                        <input
                            type="text"
                            className={cx('w-full h-full  outline-none rounded-3xl pl-3 pr-2 caret-lcn-blue-4')}
                            placeholder="Tìm kiếm "
                        />

                        <Button className="bg-lcn-blue-3 flex justify-center items-center w-16">
                            <BiSearch className={cx('text-2xl text-lcn-blue-4')} />
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('w-1/6 flex justify-center ')}>
                <Button className={cx('bg-lcn-blue-1 border border-lcn-blue-4 w-10 h-10 justify-center')}>
                    <FaBell className={cx('w-5 h-5 text-lcn-blue-4')} />
                </Button>
            </div>
        </div>
    );
}

export default HeaderNews;
