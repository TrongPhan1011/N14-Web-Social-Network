import classNames from 'classnames';

const cx = classNames;

function Modal({ children, isShow, isHidden }) {
    var classShow = 'hidden';
    const showModal = () => {
        if (isShow === true) {
            classShow = 'block';
        }
    };
    showModal();

    return (
        <div
            className={cx(
                'w-screen h-screen top-0 left-0 flex justify-center items-center bg-black absolute z-20 bg-opacity-20',
                classShow,
            )}
            onClick={isHidden}
        >
            <div
                className={'w-1/2 h-2/3 bg-white rounded-lg z-30 border border-lcn-blue-4'}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {children}
            </div>
        </div>
    );
}

export default Modal;
