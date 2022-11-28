import classNames from 'classnames';

import Button from '~/components/Button';

import { useState, memo, useEffect } from 'react';

import Modal from '~/components/Modal';
import Avartar from '~/components/Avartar';

import { addAdminToChat, getAllFileOfChat } from '~/services/chatService';
import { inCludesString } from '~/lib/regexString';
import { currentChat } from '~/redux/Slice/sidebarChatSlice';
import { useDispatch } from 'react-redux';
import { getMemberOfChat } from '~/services/chatService';

import { addMess } from '~/services/messageService';
import socket from '~/utils/getSocketIO';
import { getUserById } from '~/services/userService';
import { HiOutlinePaperClip } from 'react-icons/hi';
import PreviewImg from '~/components/PreviewImg';
import { FiPaperclip } from 'react-icons/fi';
import FileSaver from 'file-saver';

const cx = classNames;
function AllFileChat({ accessToken, axiosJWT, curChat, curUser }) {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [showPreviewImg, setShowPreviewImg] = useState(false);
    const [optionValue, setOptionValue] = useState('img');
    const [arrMessFile, setArrMessFile] = useState([]);
    const [listFile, setListFile] = useState({});

    useEffect(() => {
        if (!!arrMessFile) {
            var listImg = [],
                listDoc = [],
                listVideo = [];
            for (let mess of arrMessFile) {
                console.log(mess);
                for (let file of mess.file) {
                    if (file.fileType === 'image') {
                        listImg = [...listImg, file.path]; // them file img vao list
                    } else if (file.fileType === 'video') {
                        listVideo = [...listVideo, file.path];
                    } else listDoc = [...listDoc, file];
                }
            }
            setListFile({
                listImg: listImg,
                listDoc: listDoc,
                listVideo: listVideo,
            });
        }
    }, [arrMessFile]);

    const handleShowModal = async () => {
        let arrMessFileFetch = await getAllFileOfChat(curChat.id, accessToken, axiosJWT);
        setArrMessFile(arrMessFileFetch);

        setShowModal(true);
    };
    const handleHideModal = () => {
        setOptionValue('img');
        setShowModal(false);
    };

    const renderItemFile = () => {
        if (optionValue === 'img') {
            if (!!listFile.listImg && listFile.listImg.length > 0) {
                // check xem list file tồn tại chưa, vì nó render ko kịp sẽ gây lỗi file
                return listFile.listImg.map((src, index) => {
                    return (
                        <div className={cx('w-20 h-20 overflow-hidden ')}>
                            <PreviewImg key={index + ' '} srcImg={src}>
                                <div className={cx('w-20 h-20 overflow-hidden pr-1 pb-1')}>
                                    <img src={src} alt="src" className={cx(' h-full rounded-md object-cover')} />
                                </div>
                            </PreviewImg>
                        </div>
                    );
                });
            }
        } else if (optionValue === 'video') {
            if (!!listFile.listVideo && listFile.listVideo.length > 0) {
                return listFile.listVideo.map((src, index) => {
                    return (
                        <div className={cx('w-20 h-20 overflow-hidden ')}>
                            <PreviewImg key={index + ' '} srcImg={src} type="video">
                                <div className={cx('w-20 h-20  overflow-hidden pr-1 pb-1')}>
                                    <video src={src} alt="src" className={cx(' h-full rounded-md object-cover')} />
                                </div>
                            </PreviewImg>
                        </div>
                    );
                });
            }
        } else if (optionValue === 'file') {
            if (!!listFile.listDoc && listFile.listDoc.length > 0) {
                return listFile.listDoc.map((file, index) => {
                    return (
                        <div key={index + ' '} className={cx('w-full  ')}>
                            <Button
                                className={cx(
                                    'rounded-2xl text-sm m-0 text-slate-500 overflow-hidden h-16 w-full  bg-slate-200 backdrop-blur-md flex items-center p-3',
                                    'font-semibold',
                                )}
                                onClick={() => {
                                    FileSaver.saveAs(file.path, file.title);
                                }}
                            >
                                <FiPaperclip
                                    className={cx(
                                        'text-3xl border-lcn-blue-3 border text-lcn-blue-4 p-1 h-9 w-9 bg-lcn-blue-2 rounded-full mr-2 ',
                                    )}
                                />
                                {file.title}
                            </Button>
                        </div>
                    );
                });
            }
        }
    };

    const renderModalShowMember = () => {
        if (!!listFile) {
            return (
                <Modal
                    isShow={showModal}
                    className={cx('w-96 text-black p-2 overflow-hidden')}
                    isHidden={handleHideModal}
                >
                    <h4 className="text-center font-semibold border-b border-lcn-blue-3">Ảnh, video, file đã gửi</h4>
                    <div className={cx('justify-center  w-full h-11 flex items-center p-1 pr-4 pl-4 mt-2')}>
                        <Button
                            type="button"
                            className={
                                optionValue === 'img'
                                    ? cx('w-24 h-9 justify-center bg-lcn-blue-4 text-white ')
                                    : cx('w-24 justify-center bg-slate-300 text-white')
                            }
                            onClick={() => setOptionValue('img')}
                        >
                            Ảnh
                        </Button>
                        <Button
                            type="button"
                            className={
                                optionValue === 'video'
                                    ? cx('w-24 h-9 justify-center bg-lcn-blue-4 text-white ')
                                    : cx('w-24 justify-center bg-slate-300 text-white')
                            }
                            onClick={() => setOptionValue('video')}
                        >
                            Video
                        </Button>
                        <Button
                            type="button"
                            className={
                                optionValue === 'file'
                                    ? cx('w-24 h-9 justify-center bg-lcn-blue-4 text-white ')
                                    : cx('w-24 justify-center bg-slate-300 text-white')
                            }
                            onClick={() => setOptionValue('file')}
                        >
                            File
                        </Button>
                    </div>
                    <div className={cx('h-5/6 w-full  overflow-scroll p-2 flex flex-wrap')}>{renderItemFile()}</div>
                </Modal>
            );
        }
        return <></>;
    };
    return (
        <>
            <Button className={cx('flex   w-full  p-2 mb-2 hover:bg-lcn-blue-3')} onClick={handleShowModal}>
                <div className={cx('flex items-center')}>
                    <HiOutlinePaperClip className={cx('text-lcn-blue-4 w-7 h-7 ')} />{' '}
                    <span className={cx('  ml-4  w-4/5 ')}>Tài liệu, hình ảnh, video</span>
                </div>
            </Button>
            {renderModalShowMember()}
        </>
    );
}

export default memo(AllFileChat);
