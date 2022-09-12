import classNames from 'classnames';
import ListItem from '~/components/ListItem';
import { BiSearch } from 'react-icons/bi';
const cx = classNames;
function ContentChan() {
    return (
        <div className={cx('w-[1094px] bg-lcn-blue-1 h-screen flex justify-center items-center')}>
            <div className={cx('h-[500px] w-[500px] bg-white flex flex-col justify-center  overflow-y-scroll')}>
                <div className={cx('w-full h-10 flex justify-center mt-5')}>
                    <span className={cx('text-2xl font-semibold text-lcn-blue-5')}>Chặn người dùng</span>
                </div>
                <div className={cx('h-[78px] flex p-5 justify-center w-full')}>
                    <div className={cx('w-full relative  ')}>
                        <div
                            className={cx(
                                'flex absolute text-lcn-blue-4 inset-y-0 left-0 items-center pl-3 pointer-events-none ',
                            )}
                        >
                            <BiSearch />
                        </div>
                        <input
                            type="text"
                            className={cx(
                                'block p-2 pl-8 caret-lcn-blue-4 text-sm w-full rounded-lcn-login-input bg-transparent border border-lcn-blue-4 outline-none placeholder:text-lcn-placeholder',
                            )}
                            placeholder="Tên người dùng"
                        />
                    </div>
                </div>
                <div className={cx('w-full h-[382px] flex justify-center pb-5 pl-5 pr-5')}>
                    <ListItem type="chan" />
                </div>
            </div>
        </div>
    );
}

export default ContentChan;
