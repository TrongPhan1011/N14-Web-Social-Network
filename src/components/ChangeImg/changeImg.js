import { useState, memo, useEffect } from 'react';

import Button from '~/components/Button';

import classNames from 'classnames';

import { uploadFileImg } from '~/services/fileService';

import { BsFillCloudUploadFill } from 'react-icons/bs';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { BiZoomIn, BiZoomOut } from 'react-icons/bi';

import { FaRegTimesCircle } from 'react-icons/fa';
import { RiImageEditFill } from 'react-icons/ri';
import { changeAvatarGroup } from '~/services/chatService';
import { addMess } from '~/services/messageService';
import socket from '~/utils/getSocketIO';

const cx = classNames;

function ChangeFile({ accessToken, axiosJWT, curChat, curUser }) {
    const [showModal, setShowModal] = useState(false);
    const [hiddenSave, setHiddenSave] = useState('hidden');

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState('');

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!!selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);

            // free memory when ever this component is unmounted
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [selectedFile]);

    const handleShowModal = () => {
        setShowModal(true);
    };
    const handleHideModal = () => {
        setShowModal(false);

        setHiddenSave('hidden');
        setSelectedFile();
    };
    var handlePreviewIMG = async (e) => {
        const SIZE_FILE = 62914560; // = 60MB

        setSelectedFile(e.target.files[0]);

        if (e.target.files[0].size > SIZE_FILE) {
            alert('Dung lượng mỗi ảnh hoặc video tối đa là 60MB');
            return;
        }

        setHiddenSave('');
        handleShowModal();
        renderModal(preview);
        e.target.value = null;
    };
    const saveMessSystem = async (id, text) => {
        var newMessSave = {
            title: text,
            authorID: curUser.id,
            seen: [{ id: curUser.id, seenAt: Date.now() }],
            type_mess: 'system',
            idChat: id,
            status: 1,
            file: [],
        };
        if (!!newMessSave) {
            var messData = await addMess(newMessSave, accessToken, axiosJWT);
            messData = {
                ...messData,
                authorID: {
                    id: curUser.id,
                    fullName: curUser.fullName,
                    profile: {
                        urlAvartar: curUser.profile.urlAvartar,
                    },
                },
            };
            socket.emit('sendMessage', {
                receiverId: id,
                contentMessage: messData,
            });
        }
    };

    const saveImg = async () => {
        var listFileImgPreview = [];

        listFileImgPreview.push(selectedFile);
        const formDataFile = new FormData();

        formDataFile.append('images', listFileImgPreview[0]);

        var urlIMG = await uploadFileImg(formDataFile);

        if (!!urlIMG) {
            const newChat = await changeAvatarGroup(curChat.id, urlIMG[0].path, accessToken, axiosJWT);
            if (!!newChat) {
                saveMessSystem(curChat.id, curUser.fullName + ' đã đổi ảnh đại diện nhóm ');
                handleHideModal();
                // window.location.reload(false);
            } else alert('Đã có lỗi khi thay đổi ảnh đại diện nhóm');
        }
    };

    var renderModal = (preview) => {
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
        <>
            <input id="imgGroup" className="hidden" type="file" onChange={handlePreviewIMG} accept="image/*" />
            <label
                htmlFor="imgGroup"
                className={cx(
                    'flex cursor-pointer  w-full  p-1  mb-2 rounded-full hover:bg-lcn-blue-3 hover:bg-opacity-90',
                )}
            >
                <div className={cx('flex items-center')}>
                    <RiImageEditFill className={cx('text-lcn-blue-4 w-6 h-6 ')} />
                    <span className={cx('  ml-4  w-4/5 ')}>Đổi hình đại diện nhóm</span>
                </div>
            </label>
            {!!preview && renderModal(preview)}
        </>
    );
}

export default memo(ChangeFile);
