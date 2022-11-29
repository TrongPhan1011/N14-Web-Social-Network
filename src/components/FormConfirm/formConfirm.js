import classNames from 'classnames';

import Button from '~/components/Button';

import { useState, memo, useRef } from 'react';

import Modal from '~/components/Modal';

const cx = classNames;
function FormConfirm({ children, title, text, onAccept }) {
    const [showModal, setShowModal] = useState(false);

    const [inputValue, setInputValue] = useState('');

    const inputRef = useRef();

    const handleShowModal = async () => {
        setShowModal(true);
        inputRef.current.click();
    };
    const handleHideModal = () => {
        inputRef.current.value = '';
        setShowModal(false);
    };

    const renderModalShowMember = () => {
        return (
            <Modal isShow={showModal} className={cx(' w-1/3 max-h-44 text-black p-2 overflow-hidden')}>
                <h4 className="text-center font-semibold border-b mt-2 mb-2 border-lcn-blue-3">{title}</h4>
                <div>{text}</div>
                <div
                    className={cx(
                        'border border-lcn-blue-4 rounded-3xl w-full h-11 mb-2 flex items-center p-1 pr-4 pl-4 mt-2',
                    )}
                >
                    <input
                        type="text"
                        ref={inputRef}
                        placeholder={title}
                        className={cx('outline-none w-full h-full caret-lcn-blue-4 focus')}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                    />
                </div>

                <div className={cx('flex justify-end self-center border-t border-lcn-blue-2')}>
                    <Button
                        type="button"
                        className={cx('bg-lcn-1 p-1 pr-3 pl-3 h-10 text-white bg-gray-300 bg-opacity-100')}
                        onClick={handleHideModal}
                    >
                        Huỷ
                    </Button>
                    <Button
                        type="button"
                        className={cx('bg-lcn-1 p-1 pr-3 pl-3 h-10 text-white bg-lcn-blue-4 bg-opacity-100')}
                        onClick={() => {
                            if (onAccept(inputValue)) {
                                handleHideModal();
                            }
                        }}
                    >
                        Xác nhận
                    </Button>
                </div>
            </Modal>
        );
    };
    return (
        <>
            <div onClick={handleShowModal} className="w-full">
                {children}
            </div>
            {renderModalShowMember()}
        </>
    );
}

export default memo(FormConfirm);
