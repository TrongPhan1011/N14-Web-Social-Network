import classNames from 'classnames';
import { FaTimes } from 'react-icons/fa';

import Modal from '~/components/Modal';
import Button from '~/components/Button';

const cx = classNames;

function ModalCreateChat({ showCreateChat, handleHideCreateChat }) {
    return (
        <Modal isShow={showCreateChat}>
            <div className={cx('flex items-center p-1 border-b  border-lcn-blue-1')}>
                <div className="w-1/3"></div>
                <p className={cx('w-1/3 text-lg text-lcn-blue-4 font-medium text-center')}>Tạo tin nhắn mới</p>
                <div className={cx('w-1/3 flex justify-end')}>
                    <Button
                        className={cx(' text-red-500 hover:text-white hover:bg-red-500')}
                        onClick={handleHideCreateChat}
                    >
                        <FaTimes />
                    </Button>
                </div>
            </div>
            <div className={cx('w-full  items-center flex justify-center p-3')}>
                <div className={cx('w-full h-10 flex rounded-3xl  border border-lcn-blue-4 ')}>
                    <input
                        type="text"
                        className={cx('w-full h-full  outline-none rounded-3xl pl-3 pr-2 caret-lcn-blue-4')}
                        placeholder="Tìm kiếm người dùng"
                        // onChange={(e) => setSearchValueMore(e.target.value)}
                    />
                </div>
            </div>
            <div className={cx('w-full h-2/4  overflow-y-auto p-3')}>123</div>
            <div className={cx('w-full h-1/4   p-3')}>123</div>
        </Modal>
    );
}

export default ModalCreateChat;
