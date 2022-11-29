import { useState, memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/Button';
import ItemDropdown from '~/components/Dropdown/ItemDropdown';
import classNames from 'classnames';
import Avartar from '~/components/Avartar';
import { uploadFileImg } from '~/services/fileService';
import { updateAvatar, updateBanner } from '~/services/userService';

import { BsFillCloudUploadFill } from 'react-icons/bs';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { BiZoomIn, BiZoomOut } from 'react-icons/bi';
import { AiFillCamera } from 'react-icons/ai';
import { FaRegTimesCircle } from 'react-icons/fa';

const cx = classNames;

function HeaderProfile({ avatar, coverPhoto, userName, active, typeAvatar, idGroup }) {
    const dispatch = useDispatch();
    const [hiddenMenu, setHiddenMenu] = useState('hidden');
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [hiddenSave, setHiddenSave] = useState('hidden');
    const [banner, setBanner] = useState(false);
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);
    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;
    var ava = '';

    if (avatar) {
        ava = avatar;
    }
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState(ava);

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(ava);
            setBanner(false);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile, userName]);

    var handlePreviewIMG = async (e) => {
        const SIZE_FILE = 62914560; // = 60MB
        setSelectedFile(e.target.files[0]);
        // if (selectedFile.length > 1) {
        //     alert('Chỉ được chọn một ảnh');
        //     return;
        // }

        // if (selectedFile.size > SIZE_FILE) {
        //     alert('Dung lượng mỗi ảnh hoặc video tối đa là 60MB');
        //     return;
        // }

        setHiddenSave('');
        handleShowModal();
        renderModal(preview);
        e.target.value = null;
    };
    var handlePreviewBanner = (e) => {
        const SIZE_FILE = 62914560; // = 60MB
        setSelectedFile(e.target.files[0]);
        // if (selectedFile.length > 1) {
        //     alert('Chỉ được chọn một ảnh');
        //     return;
        // }

        // if (selectedFile.size > SIZE_FILE) {
        //     alert('Dung lượng mỗi ảnh hoặc video tối đa là 60MB');
        //     return;
        // }
        setHiddenSave('');

        renderModalBanner(preview);
        e.target.value = null;
    };
    const saveImg = async () => {
        var listFileImgPreview = [];

        listFileImgPreview.push(selectedFile);
        const formDataFile = new FormData();

        formDataFile.append('images', listFileImgPreview[0]);

        var urlIMG = await uploadFileImg(formDataFile);
        if (banner === true) {
            const updateImg = await updateBanner(curUser.id, urlIMG[0].path, accessToken, axiosJWT, dispatch);
            if (!!updateImg) {
                alert('Đổi ảnh thành công');
                window.location.reload(false);
            }
        } else {
            const updateImg = await updateAvatar(curUser.id, urlIMG[0].path, accessToken, axiosJWT, dispatch);
            if (!!updateImg) {
                alert('Đổi ảnh thành công');
                window.location.reload(false);
            }
        }
    };
    const handleShowModal = () => {
        setShowModal(true);
        setHiddenMenu('hidden');
    };
    const handleHideModal = () => {
        setShowModal(false);

        setHiddenSave('hidden');
        setSelectedFile();
        setPreview(ava);
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
    const renderModalBanner = (newBanner) => {
        setBanner(true);
        setPreview(newBanner);
        handleShowModal();

        renderModal(newBanner);
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
                    'w-52 relative left-32 top-[-25px] bg-white border border-lcn-blue-2 rounded-lg shadow-lg p-2',
                    hiddenMenu,
                )}
                // tabIndex="0"
                {...attrs}
            >
                {renderData()}
            </div>
        );
    };
    const renderModal = (preview) => {
        if (showModal) {
            return (
                <div
                    className={cx(
                        'w-screen h-screen  absolute z-20 top-0 left-0 flex justify-center items-center bg-slate-500 bg-opacity-40  ',
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
                        <TransformWrapper defaultScale={1} defaultPositionX={1} defaultPositionY={1}>
                            {({ zoomIn, zoomOut, ...rest }) => (
                                <>
                                    <div className={cx('w-full h-full flex justify-center items-center  ')}>
                                        <TransformComponent>
                                            <div
                                                className={cx(
                                                    'h-[680px] flex w-full items-center justify-center rounded  ',
                                                )}
                                            >
                                                <img
                                                    src={preview}
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
                                            className={cx(
                                                ' text-lcn-blue-4  bg-white border pr-2 pl-2 border-lcn-blue-4 font-semibold absolute bg-opacity-80 top-2 right-56  ',
                                                hiddenSave,
                                            )}
                                            onClick={saveImg}
                                        >
                                            <BsFillCloudUploadFill className="text-3xl mr-2 " /> Lưu
                                        </Button>
                                    </div>
                                </>
                            )}
                        </TransformWrapper>
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
        <div className={cx('h-2/5 w-full mb-14 ')}>
            {renderModal(preview)}
            <div className={cx(' h-full w-full ')}>
                <div className={cx('w-full h-[220px] relative p-0 m-0')}>
                    {!!coverPhoto ? (
                        <div
                            className={cx('w-full h-full p-0 m-0 cursor-pointer')}
                            onClick={() => {
                                handleShowModal();
                                renderModalBanner(coverPhoto);
                            }}
                        >
                            <img
                                src={coverPhoto}
                                alt="coverPhoto"
                                className={cx('w-full p-0 m-0 h-full object-cover')}
                            />
                        </div>
                    ) : (
                        <div className={cx('w-full h-full bg-lcn-blue-3')}></div>
                    )}
                    {active === 'hidden' ? (
                        <Button
                            className={cx(
                                'absolute right-8 h-10 text-sm top-2 w-36 flex justify-center border border-lcn-blue-4 bg-white rounded-lg text-lcn-blue-4 hover:bg-lcn-blue-4 hover:text-white',
                            )}
                        >
                            <input
                                id="file-banner"
                                className="hidden"
                                type="file"
                                onChange={handlePreviewBanner}
                                accept="image/*"
                            />
                            <label htmlFor="file-banner" className={cx('flex items-center')}>
                                <AiFillCamera />
                                Thay đổi ảnh nền
                            </label>
                        </Button>
                    ) : (
                        <></>
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
                    'bg-white text-center h-16 text-xl flex justify-center items-center font-semibold text-lcn-blue-5',
                )}
            >
                {userName}
            </div>
        </div>
    );
}

export default memo(HeaderProfile);
