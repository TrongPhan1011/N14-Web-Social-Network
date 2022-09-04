import classNames from 'classnames/bind';

import styles from './Search.module.scss';
import { BiEdit, BiSearch } from 'react-icons/bi';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('p-2 w-full h-full flex justify-between items-center')}>
            <div className={cx('w-52 h-10 flex rounded-3xl  border border-lcn-blue-4 ')}>
                <input
                    type="text"
                    className={cx('w-full h-full  outline-none rounded-3xl pl-3 pr-2 caret-lcn-blue-4')}
                    placeholder="Tìm kiếm "
                />

                <Button className="bg-lcn-blue-3 flex justify-center items-center">
                    <BiSearch className={cx('text-2xl text-lcn-blue-4')} />
                </Button>
            </div>
            <Button
                className={cx(
                    'w-10 rounded-full m-0 flex justify-center items-center h-10 bg-lcn-blue-3 ',
                    'hover:text-white ',
                )}
            >
                <BiEdit className={cx('text-2xl text-lcn-blue-4')} />
            </Button>
        </div>
    );
}

export default Search;
