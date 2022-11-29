import classNames from 'classnames/bind';

import { useEffect, useRef, memo, useState } from 'react';

import { AiFillFileImage } from 'react-icons/ai';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import socket from '~/utils/getSocketIO';
import { addMess } from '~/services/messageService';
import { FaRegSmile, FaTimesCircle } from 'react-icons/fa';
import { uploadFileImg } from '~/services/fileService';
import { FiPaperclip } from 'react-icons/fi';
import styles from './InputSend.module.scss';
import { getTypeOfDocument } from '~/lib/formatString';

import PickerEmoji from './PickerEmoji/PickerEmoji';

import { replyMes } from '~/redux/Slice/messageSlice';
import { MdReply } from 'react-icons/md';

const cx = classNames.bind(styles);

function InputSend({ type }) {
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    var curChat = useSelector((state) => state.sidebarChatSlice.currentChat);

    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var replyMess = useSelector((state) => state.messageSlice.replyMess);

    const [currMessage, setCurrMessage] = useState('');
    const [messageSend, setMessageSend] = useState();
    const [heightText, setHeightText] = useState('h-11');
    const [listFileDoc, setListFileDoc] = useState([]);
    const [listFileIMG, setListFileIMG] = useState([]);
    const [hiddenSendIMG, setHiddenSendIMG] = useState('hidden');
    const [replyMessData, setReplyMessData] = useState();

    const [showEmoji, setShowEmoji] = useState(false);

    const txtSendRef = useRef();

    useEffect(() => {}, [messageSend]);
    useEffect(() => {
        if (!!replyMess) {
            setReplyMessData(replyMess);
        }
    }, [replyMess]);

    useEffect(() => {
        if (listFileIMG.length !== 0 || listFileDoc.length !== 0 || !!replyMessData) {
            setHiddenSendIMG('flex');
        } else setHiddenSendIMG('hidden');
    }, [listFileIMG, listFileDoc, replyMessData]);

    const changeHeightText = (heightTextArea) => {
        const HEIGHT_11 = 44; // 44px
        if (txtSendRef.current.textContent !== '' && heightTextArea > HEIGHT_11)
            setHeightText('h-[' + heightTextArea + 'px] ');
        else setHeightText('h-11');
    };

    const saveMess = async (newMessSave, newMess) => {
        if (!!newMessSave) {
            var messData = await addMess(newMessSave, accessToken, axiosJWT);

            newMess.id = messData.id;

            if (!!curChat && !!newMess) {
                socket.emit('sendMessage', {
                    receiverId: curChat.id,
                    contentMessage: newMess,
                });
                txtSendRef.current.textContent = '';
                txtSendRef.current.focus();
                showEmoji && setShowEmoji(false);
                setCurrMessage('');
                removeUpFile();
                setHeightText('h-11');
            }

            // setMessageSend(newMess);
        }
    };

    /**
     * Nếu type=  img thì chạy vòng for tải toàn bộ ảnh lên s3 sau đó lưu toàn bộ link ảnh vào chung 1 arr file trong 1 mess
     * Nếu type = file thì chạy vòng for tải file lên s3 sau đó chạy tiếp 1 for để lưu 1 file thành 1 tin nhắn trong mess
     * @param {*} type
     */
    var saveFile = async (type) => {
        const formDataFile = new FormData();

        if (type === 'img') {
            for (let i = 0; i < listFileIMG.length; i++) {
                formDataFile.append('images', listFileIMG[i]);
            }
            var arrURLFileIMG = await uploadFileImg(formDataFile);
            var newMessIMG = getNewMess('', 'img/video', arrURLFileIMG);
            saveMess(newMessIMG.newMessSave, newMessIMG.newMess);
        } else if (type === 'file') {
            for (let i = 0; i < listFileDoc.length; i++) {
                formDataFile.append('images', listFileDoc[i]);
            }
            var arrURLFile = await uploadFileImg(formDataFile);

            for (var doc of arrURLFile) {
                var newMessDoc = getNewMess('', 'doc', [doc]);

                saveMess(newMessDoc.newMessSave, newMessDoc.newMess);
            }
        }
    };

    var getNewMess = (title, type, file) => {
        let newReplyDataSocket = null;

        if (!!replyMessData) {
            newReplyDataSocket = {
                id: replyMessData.id,
                title: replyMessData.title,
                file: replyMessData.file[0],
            };
        }
        var newMess = {
            title: title,
            authorID: {
                id: curSignIn.userLogin.id,
                fullName: curSignIn.userLogin.fullName,
                profile: {
                    urlAvartar: curSignIn.userLogin.profile.urlAvartar,
                },
            },
            type: type,
            idChat: curChat.id,
            seen: [
                {
                    idSeen: curSignIn.userLogin.id,
                    seenAt: Date.now(),
                },
            ],
            file: [],
            replyMessage: newReplyDataSocket,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        if (!!file) {
            newMess.file = file;
        }
        var newMessSave = {
            title: newMess.title,
            authorID: newMess.authorID.id,
            seen: newMess.seen,
            type_mess: newMess.type,
            idChat: newMess.idChat,
            status: 1,
            file: newMess.file,
            replyMessage: newMess.replyMessage,
        };

        return { newMess, newMessSave };
    };

    const handleSendMessage = () => {
        if (!!currMessage && currMessage !== '') {
            var newMessText = getNewMess(currMessage, 'text', null);
            saveMess(newMessText.newMessSave, newMessText.newMess);
        }
        if (!!listFileIMG && listFileIMG.length > 0) {
            saveFile('img');
            removeUpFile();
        }
        if (!!listFileDoc && listFileDoc.length > 0) {
            saveFile('file');
            removeUpFile();
        }
        if (!!replyMessData) {
            removeUpFile();
        }
        setCurrMessage('');
    };
    const handleKeyUpSendMess = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    var handlePreviewIMG = (e) => {
        const selectedFiles = e.target.files;

        var listFileImgPreview = [];
        const SIZE_FILE = 62914560; // = 60MB
        const TOTAL_IMG = 50;

        if (selectedFiles.length > TOTAL_IMG) {
            alert('Tối đa mỗi lần gửi là 50 ảnh hoặc video');
            return;
        }

        for (var i = 0; i < selectedFiles.length; i++) {
            var img = selectedFiles[i];
            if (img.size > SIZE_FILE) {
                alert('Dung lượng mỗi ảnh hoặc video tối đa là 60MB');
                return;
            }

            img.preview = URL.createObjectURL(img);
            listFileImgPreview.push(img);
        }
        e.target.value = null;
        if (listFileDoc.length > 0) setListFileDoc([]);
        setListFileIMG((prev) => [...prev, ...listFileImgPreview]);
    };
    var handlePreviewFileDoc = (e) => {
        const selectedFiles = e.target.files;

        var listFileDocPreview = [];
        const SIZE_FILE = 62914560; // = 60MB
        const TOTAL_FILE = 5;

        if (selectedFiles.length > TOTAL_FILE) {
            alert('Tối đa mỗi lần gửi là 5 tài liệu');
            return;
        }

        for (var i = 0; i < selectedFiles.length; i++) {
            var doc = selectedFiles[i];
            if (doc.size > SIZE_FILE) {
                alert('Dung lượng mỗi tài liệu tối đa là 60MB');
                return;
            }

            listFileDocPreview.push(doc);
        }
        e.target.value = null;
        if (listFileIMG.length > 0) setListFileIMG([]);
        setListFileDoc((prev) => [...prev, ...listFileDocPreview]);
    };
    var removeOneFile = (index, type) => {
        if (type === 'img') {
            var itemFileIMG = listFileIMG[index];

            var newListFile = listFileIMG.filter((item) => {
                return item.preview !== itemFileIMG.preview;
            });
            URL.revokeObjectURL(itemFileIMG.preview);
            setListFileIMG(newListFile);
        } else {
            var itemFileDoc = listFileDoc[index];

            var newListFileDoc = listFileDoc.filter((item) => {
                return item.preview !== itemFileDoc.preview;
            });
            URL.revokeObjectURL(itemFileDoc.preview);
            setListFileDoc(newListFileDoc);
        }
    };
    var removeUpFile = () => {
        if (listFileIMG.length > 0) {
            for (var itemIMG in listFileIMG) {
                URL.revokeObjectURL(itemIMG.preview);
            }
            setListFileIMG([]);
        }
        if (listFileDoc.length > 0) {
            setListFileDoc([]);
        }
        if (!!replyMessData) {
            setReplyMessData(null);
            dispatch(replyMes(null));
        }
    };
    var renderVideoOrImg = (file) => {
        var type = file.type.split('/')[0];
        if (type === 'video') {
            return <video src={file.preview} className={cx('w-14 h-14 rounded-md m-1 shadow-md')} controls={false} />;
        }
        return <img src={file.preview} alt={file.name} className={cx('w-14 h-14 rounded-md m-1 shadow-md')} />;
    };
    var renderFileDoc = (file) => {
        var fileName = file.name;
        if (file.name.length > 15) fileName = fileName.slice(0, 15) + '...';

        return (
            <div
                className={cx(
                    'w-36 h-12 p-1  bg-white bg-opacity-80 text-sm  rounded-md m-1 shadow-md flex items-center justify-center font-semibold text-slate-500',
                )}
            >
                <FiPaperclip className={cx('text-xl text-lcn-blue-4 p-1 h-7 w-7 bg-lcn-blue-2 rounded-full mr-2 ')} />
                {fileName}
            </div>
        );
    };

    var renderSelectedIMG = () => {
        if (listFileIMG.length > 0) {
            return listFileIMG.map((file, index) => {
                return (
                    <div key={file.preview} className="relative ">
                        <Button
                            type="button"
                            className={cx('absolute -top-1 -right-1 m-0 p-0 ')}
                            onClick={() => {
                                removeOneFile(index, 'img');
                            }}
                        >
                            <FaTimesCircle
                                className={cx(
                                    'text-md text-black text-opacity-70 border-white border bg-white rounded-full hover:text-red-400',
                                )}
                            />
                        </Button>
                        {renderVideoOrImg(file)}
                    </div>
                );
            });
        } else if (listFileDoc.length > 0) {
            return listFileDoc.map((file, index) => {
                return (
                    <div key={file.name + index} className="relative ">
                        <Button
                            type="button"
                            className={cx('absolute -top-1 -right-1 m-0 p-0 ')}
                            onClick={() => {
                                removeOneFile(index, 'doc');
                            }}
                        >
                            <FaTimesCircle
                                className={cx(
                                    'text-md text-black text-opacity-70 border-white border bg-white rounded-full hover:text-red-400',
                                )}
                            />
                        </Button>
                        {renderFileDoc(file)}
                    </div>
                );
            });
        } else if (!!replyMessData) {
            if (replyMessData.file.length > 0) {
                if (replyMessData.file[0].fileType === 'image')
                    return (
                        <div className={cx(' w-full rounded-lg p-1 h-full')}>
                            <div className={cx('text-sm flex items-center text-gray-600')}>
                                Đang trả lời ảnh
                                <MdReply className="ml-2" />
                            </div>
                            <img
                                src={replyMessData.file[0].path}
                                alt={replyMessData.file[0].title}
                                className={cx('w-9 h-9 rounded-lg')}
                            />
                        </div>
                    );
                else if (replyMessData.file[0].fileType === 'video')
                    return (
                        <div className={cx(' w-full rounded-lg p-1 h-full')}>
                            <div className={cx('text-sm flex items-center text-gray-600')}>
                                Đang trả lời video
                                <MdReply className="ml-2" />
                            </div>
                            <video
                                src={replyMessData.file[0].path}
                                alt={replyMessData.file[0].title}
                                className={cx('w-9 h-9 rounded-lg')}
                            />
                        </div>
                    );
                else
                    return (
                        <div className={cx(' w-full rounded-lg p-1 h-full')}>
                            <div className={cx('text-sm flex items-center text-gray-600')}>
                                Đang trả lời file
                                <MdReply className="ml-2" />
                            </div>
                            <div className={cx(' flex text-xs')}>
                                <div
                                    className={cx(
                                        'w-36 h-8 p-1  bg-white bg-opacity-80 t rounded-md m-1 shadow-md flex items-center justify-center font-semibold text-slate-500',
                                    )}
                                >
                                    <FiPaperclip
                                        className={cx(
                                            'text-xl text-lcn-blue-4 p-1 h-6 w-6 bg-lcn-blue-2 rounded-full mr-2 ',
                                        )}
                                    />
                                    Tệp đính kèm
                                </div>
                            </div>
                        </div>
                    );
            } else
                return (
                    <div className={cx(' w-full rounded-lg bg-lcn-blue-1 p-1 h-full')}>
                        <div className={cx('text-sm flex items-center text-gray-600')}>
                            Đang trả lời tin nhắn
                            <MdReply className="ml-2" />
                        </div>
                        <div className={cx('text-xs italic text-gray-400')}>{replyMessData.title}</div>
                    </div>
                );
        }
        return <></>;
    };
    function unicodeToChar(text) {
        return String.fromCodePoint(parseInt(text, 16));
    }

    function onChosseEmoji(emojiData) {
        txtSendRef.current.textContent += unicodeToChar(emojiData.unified);
        setCurrMessage(txtSendRef.current.textContent);
        var p = txtSendRef.current;
        if (p.hasChildNodes()) {
            // if the element is not empty
            let s = window.getSelection();
            let r = document.createRange();
            let e = p.childElementCount > 0 ? p.lastChild : p;
            r.setStart(e, 1);
            r.setEnd(e, 1);
            s.removeAllRanges();
            s.addRange(r);
        }
    }

    return (
        <div className={cx('h-full relative bg-white  p-2 w-full mr-20  flex items-center ')}>
            <Button
                type="button"
                className={cx('absolute z-10 -top-24 right-2 m-0 p-0 ', hiddenSendIMG)}
                onClick={removeUpFile}
            >
                <FaTimesCircle
                    className={cx(
                        'text-2xl text-black text-opacity-70 border-white border bg-white rounded-full hover:text-red-400',
                    )}
                />
            </Button>
            <div
                className={cx(
                    'w-full -top-20 bg-opacity-90 pt-4 left-0 h-20 border-t border-t-slate-100 absolute overflow-y-auto flex-wrap  backdrop-blur-md p-4  ',
                    hiddenSendIMG,
                )}
            >
                {renderSelectedIMG()}
            </div>
            <input
                id="file-doc"
                className="hidden"
                type="file"
                onChange={handlePreviewFileDoc}
                multiple={true}
                accept={getTypeOfDocument()}
            />
            <label htmlFor="file-doc" className={cx('m-0 ml-1 p-2 hover:bg-lcn-blue-2 rounded-full cursor-pointer')}>
                <FiPaperclip className={cx(' text-lcn-blue-4 text-2xl')} />
            </label>
            <input
                id="file-img"
                className="hidden"
                type="file"
                onChange={handlePreviewIMG}
                multiple={true}
                accept="video/*,image/*"
            />
            <label htmlFor="file-img" className={cx('m-0 ml-1 p-2 hover:bg-lcn-blue-2 rounded-full cursor-pointer')}>
                <AiFillFileImage className={cx(' text-lcn-blue-4 text-2xl')} />
            </label>
            <div
                className={cx(
                    'w-full max-h-20 overflow-y-auto  p-2 pr-10 pl-4 border border-lcn-blue-4  rounded-3xl m-2 break-words outline-none caret-lcn-blue-4',
                    'resize-none',
                    heightText,
                    'input-send',
                )}
                contentEditable={true}
                onInput={(e) => {
                    setShowEmoji(false);
                    setCurrMessage(e.currentTarget.textContent);
                    changeHeightText(e.currentTarget.scrollHeight);
                }}
                placeholder="Nhập tin nhắn"
                onKeyUp={handleKeyUpSendMess}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                    }
                }}
                ref={txtSendRef}
                data-text="Nhập tin nhắn của bạn tại đây"
            ></div>
            <div
                className={cx(' h-full flex items-center relative ')}
                onClick={() => (!showEmoji ? setShowEmoji(true) : setShowEmoji(false))}
            >
                <FaRegSmile
                    className={cx(
                        'text-lcn-blue-4 text-2xl absolute -left-11 rounded-full cursor-pointer  hover:text-yellow-400 hover:p-0',
                    )}
                />
            </div>

            {showEmoji && (
                <div className={cx(' absolute -top-[21.5rem]  right-2', 'bg-emoji')}>
                    <PickerEmoji onChosseEmoji={onChosseEmoji} />
                </div>
            )}

            <Button
                type="button"
                className={cx(' flex justify-center items-center rounded-full m-0 w-14  h-12')}
                onClick={handleSendMessage}
            >
                <RiSendPlaneFill className={cx('text-lcn-blue-4 text-4xl hover:text-lcn-blue-5')} />
            </Button>
        </div>
    );
}

export default memo(InputSend);
