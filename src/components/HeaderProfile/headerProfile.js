import { useState, memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/Button';
import ItemDropdown from '~/components/Dropdown/ItemDropdown';
import classNames from 'classnames';
import { lcnImage } from '~/image';
import Avartar from '~/components/Avartar';
import { uploadFileImg } from '~/services/fileService';
import Modal from '~/components/Modal';
import { FaTimes } from 'react-icons/fa';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { BiZoomIn, BiZoomOut } from 'react-icons/bi';
const cx = classNames;

function HeaderProfile({ avatar, coverPhoto, userName, active, typeAvatar, idGroup }) {
    const dispatch = useDispatch();
    const [hiddenMenu, setHiddenMenu] = useState('hidden');
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);

    var ava = '';
    if (!!avatar) {
        ava = avatar;
    }

    var handlePreviewIMG = async (e) => {
        const selectedFiles = e.target.files;
        var listFileImgPreview = [];
        const SIZE_FILE = 62914560; // = 60MB

        if (selectedFiles.length > 1) {
            alert('Chỉ được chọn một ảnh');
            return;
        }
        var img = selectedFiles[0];

        if (img.size > SIZE_FILE) {
            alert('Dung lượng mỗi ảnh hoặc video tối đa là 60MB');
            return;
        }
        img.preview = URL.createObjectURL(img);

        listFileImgPreview.push(img);
        // saveFile();

        const formDataFile = new FormData();

        formDataFile.append('images', listFileImgPreview[0]);

        var urlIMG = await uploadFileImg(formDataFile);

        ava = urlIMG[0].path;
        console.log(ava);
        e.target.value = null;
    };

    const handleShowModal = () => {
        setShowModal(true);
        setHiddenMenu('hidden');
    };
    const handleHideModal = () => {
        setShowModal(false);
    };

    const handleHiddenMenu = useCallback(() => {
        setHiddenMenu('hidden');
        setShowMenu(false);
    }, []);
    const handleShowMenu = () => {
        if (showMenu === false) {
            setHiddenMenu('');
            setShowMenu(true);
        } else {
            setHiddenMenu('hidden');
            setShowMenu(false);
        }
    };

    const renderData = () => {
        if (active === 'hidden') {
            return (
                <>
                    <ItemDropdown
                        className={cx(
                            'rounded-md text-lcn-blue-5 font-medium',
                            'hover:bg-blue-100',
                            'active:bg-blue-200',
                        )}
                        onClick={handleShowModal}
                    >
                        Xem ảnh
                    </ItemDropdown>

                    <ItemDropdown
                        className={cx(
                            'rounded-md text-lcn-blue-5 font-medium',
                            'hover:bg-blue-100',
                            'active:bg-blue-200',
                        )}
                        // onClick={han}
                    >
                        <input
                            id="file-img"
                            className="hidden"
                            type="file"
                            onChange={handlePreviewIMG}
                            accept="image/*"
                        />
                        <label htmlFor="file-img">Đổi ảnh đại diện</label>
                    </ItemDropdown>
                </>
            );
        } else {
            return (
                <ItemDropdown
                    className={cx('rounded-md text-lcn-blue-5 font-medium', 'hover:bg-blue-100', 'active:bg-blue-200')}
                    onClick={handleShowModal}
                >
                    Xem ảnh
                </ItemDropdown>
            );
        }
    };
    const handleLoadMenu = (attrs) => {
        return (
            <div
                className={cx(
                    'w-52 relative left-20 top-[-70px] bg-white border border-lcn-blue-2 rounded-lg shadow-lg p-2',
                    hiddenMenu,
                )}
                // tabIndex="0"
                {...attrs}
            >
                {renderData()}
            </div>
        );
    };
    return (
        <div className={cx('h-2/5 w-full mb-16')}>
            <Modal isShow={showModal} isHidden={handleHideModal}>
                <div className={cx('flex p-4 border-b border-lcn-blue-2')}>
                    <div className="w-1/3"></div>
                    <p className={cx('w-1/3 text-xl text-lcn-blue-4 font-semibold text-center')}>Ảnh của bạn</p>
                    <div className={cx('w-1/3 flex justify-end')}>
                        <Button
                            className={cx(' text-red-500 hover:text-white hover:bg-red-500')}
                            onClick={handleHideModal}
                        >
                            <FaTimes />
                        </Button>
                    </div>
                </div>
                <div className={cx(' mt-3 flex w-full h-[435px]  justify-center items-center ')}>
                    <TransformWrapper defaultScale={1} defaultPositionX={1} defaultPositionY={1}>
                        {({ zoomIn, zoomOut, ...rest }) => (
                            <>
                                <div className={cx('w-full h-full flex justify-center items-center relative ')}>
                                    <TransformComponent>
                                        <div
                                            className={cx(
                                                'h-[435px] flex w-[490px]  items-center justify-center rounded  ',
                                            )}
                                        >
                                            <img
                                                src={ava}
                                                alt="qrcode"
                                                className={cx('h-[435px] w-[490px] rounded-xl')}
                                            />
                                        </div>
                                    </TransformComponent>
                                    <Button
                                        className={cx(
                                            'absolute text-white text-lg bg-black opacity-40 top-1 right-32 hover:opacity-40 active:opacity-60',
                                        )}
                                        onClick={() => zoomIn()}
                                    >
                                        <BiZoomIn icon="plus" />
                                    </Button>
                                    <Button
                                        className={cx(
                                            'absolute text-white text-lg bg-black opacity-40 top-1 right-40 hover:opacity-40 active:opacity-60  ',
                                        )}
                                        onClick={() => zoomOut()}
                                    >
                                        <BiZoomOut icon="minus" />
                                    </Button>
                                </div>
                            </>
                        )}
                    </TransformWrapper>
                </div>
            </Modal>
            <div className={cx(' h-full w-full ')}>
                <div className={cx('h-full w-full ')}>
                    {!!coverPhoto ? (
                        <img src={coverPhoto} alt="coverPhoto" className={cx('w-full h-4/5')} />
                    ) : (
                        <div className={cx('w-full h-4/5 bg-lcn-blue-3')}></div>
                    )}
                    <div className={cx(' relative  h-2/5 w-full  flex justify-center ')}>
                        <Dropdown render={handleLoadMenu} visible={showMenu} hidden={handleHiddenMenu}>
                            <div>
                                <Button
                                    className={cx(
                                        'w-32 h-32 top-[-60%] z-0 relative overflow-hidden flex justify-center items-center rounded-full border-[3px] bg-black bg-opacity-20 border-white',
                                    )}
                                    onClick={handleShowMenu}
                                >
                                    <Avartar
                                        className={cx('h-28 w-28')}
                                        src={ava}
                                        idGroup={idGroup}
                                        typeAvatar={typeAvatar}
                                    />
                                </Button>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div
                className={cx(
                    'bg-white w-full h-14 text-xl text-center flex justify-center items-center font-semibold text-lcn-blue-5',
                )}
            >
                {userName}
            </div>
        </div>
    );
}

export default memo(HeaderProfile);
