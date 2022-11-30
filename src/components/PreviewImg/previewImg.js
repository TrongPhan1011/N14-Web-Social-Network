import { useState, memo } from 'react';

import classNames from 'classnames';
import { BsFillCloudUploadFill } from 'react-icons/bs';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { BiZoomIn, BiZoomOut } from 'react-icons/bi';
import { FaRegTimesCircle } from 'react-icons/fa';
import Button from '~/components/Button';
import { FiDownload } from 'react-icons/fi';

const cx = classNames;

function HeaderProfile({ children, srcImg, type }) {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleHideModal = () => {
        setShowModal(false);
    };

    const renderModal = () => {
        if (showModal) {
            return (
                <div
                    className={cx(
                        'w-screen h-screen  absolute z-30 top-0 left-0 flex justify-center items-center bg-slate-500 bg-opacity-40  ',
                        'block',
                    )}
                >
                    <div
                        className={cx(
                            'w-screen h-screen  absolute z-50 top-0 left-0 flex justify-center items-center bg-slate-500 bg-opacity-40  ',
                            'block',
                        )}
                    >
                        <Button
                            className={cx('absolute top-2 left-3 text-3xl text-white hover:text-lcn-blue-4')}
                            onClick={handleHideModal}
                        >
                            <FaRegTimesCircle />
                        </Button>

                        {type !== 'video' ? (
                            <TransformWrapper defaultScale={1} defaultPositionX={1} defaultPositionY={1}>
                                {({ zoomIn, zoomOut, ...rest }) => (
                                    <>
                                        <div className={cx('w-full h-full flex justify-center items-center  ')}>
                                            <TransformComponent>
                                                <div
                                                    className={cx(
                                                        'h-[80vh] flex  items-center justify-center rounded  ',
                                                    )}
                                                >
                                                    <img
                                                        src={srcImg}
                                                        alt="qrcode"
                                                        className={cx('h-full w-full rounded-xl')}
                                                    />
                                                </div>
                                            </TransformComponent>
                                            <Button
                                                className={cx(
                                                    ' text-white absolute text-3xl bg-black opacity-40 top-2 right-32 hover:opacity-40 active:opacity-60',
                                                )}
                                                onClick={() => zoomIn()}
                                            >
                                                <BiZoomIn icon="plus" />
                                            </Button>
                                            <Button
                                                className={cx(
                                                    ' text-white text-3xl bg-black absolute opacity-40 top-2 right-44 hover:opacity-40 active:opacity-60  ',
                                                )}
                                                onClick={() => zoomOut()}
                                            >
                                                <BiZoomOut icon="minus" />
                                            </Button>
                                            <Button
                                                href={srcImg}
                                                className={cx(
                                                    ' text-white text-3xl bg-black absolute opacity-40 top-2 right-56 hover:opacity-40 active:opacity-60  ',
                                                )}
                                                download="img"
                                                target="_blank"
                                            >
                                                <FiDownload />
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </TransformWrapper>
                        ) : (
                            <div className={cx('h-[80vh] flex  items-center justify-center rounded  ')}>
                                <video
                                    src={srcImg}
                                    alt="video"
                                    controls={true}
                                    className={cx('h-full w-full rounded-xl')}
                                />
                            </div>
                        )}
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    className={cx(
                        'w-screen h-screen absolute top-0 left-0 flex justify-center items-center bg-slate-500 bg-opacity-40 backdrop-blur-md',
                        'hidden',
                    )}
                ></div>
            );
        }
    };
    return (
        <>
            <div className="p-0 m-0 cursor-pointer " onClick={handleShowModal}>
                {children}
            </div>
            {renderModal()}
        </>
    );
}

export default memo(HeaderProfile);
