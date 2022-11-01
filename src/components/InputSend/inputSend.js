import classNames from 'classnames/bind';
import { useState } from 'react';
import { useEffect, useRef, memo } from 'react';

import { AiFillFileImage } from 'react-icons/ai';
import { RiSendPlaneFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';

import Button from '~/components/Button';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import socket from '~/utils/getSocketIO';
import { addMess } from '~/services/messageService';
import { FaTimesCircle } from 'react-icons/fa';
import { uploadFileImg } from '~/services/fileService';
import { FiPaperclip } from 'react-icons/fi';
import styles from './InputSend.module.scss';

const cx = classNames.bind(styles);

function InputSend({ type }) {
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    var curChat = useSelector((state) => state.sidebarChatSlice.currentChat);

    var curSignIn = useSelector((state) => state.persistedReducer.signIn);

    const [currMessage, setCurrMessage] = useState('');
    const [messageSend, setMessageSend] = useState();
    const [heightText, setHeightText] = useState('h-11');
    const [arrSavedFile, setArrSavedFile] = useState([]);
    const [listFileIMG, setListFileIMG] = useState([]);
    const [hiddenSendIMG, setHiddenSendIMG] = useState('hidden');
    const txtSendRef = useRef();

    useEffect(() => {
        if (!!curChat && !!messageSend) {
            socket.emit('sendMessage', {
                receiverId: curChat.id,
                contentMessage: messageSend,
            });
            txtSendRef.current.textContent = '';
            setHeightText('h-11');
        }
    }, [messageSend]);

    useEffect(() => {
        if (listFileIMG.length === 0) {
            setHiddenSendIMG('hidden');
        } else setHiddenSendIMG('flex');
    }, [listFileIMG]);

    const changeHeightText = (heightTextArea) => {
        const HEIGHT_11 = 44; // 44px
        if (txtSendRef.current.textContent.trim() !== '' && heightTextArea > HEIGHT_11)
            setHeightText('h-[' + heightTextArea + 'px] ');
        else setHeightText('h-11');
    };

    const saveMess = async (newMessSave, newMess) => {
        if (!!newMessSave) {
            var messData = await addMess(newMessSave, accessToken, axiosJWT);

            newMess.id = messData.id;

            setMessageSend(newMess);
        }
    };
    var saveIMG = async () => {
        const formDataIMG = new FormData();

        for (var i = 0; i < listFileIMG.length; i++) {
            formDataIMG.append('images', listFileIMG[i]);
        }

        var arrURLImg = await uploadFileImg(formDataIMG);
        var newMessIMG = getNewMess('', 'img/video', arrURLImg);
        saveMess(newMessIMG.newMessSave, newMessIMG.newMess);
    };
    var getNewMess = (title, type, file) => {
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
        };

        return { newMess, newMessSave };
    };

    const handleSendMessage = () => {
        if (!!currMessage && currMessage !== '') {
            var newMessText = getNewMess(currMessage, 'text', null);
            saveMess(newMessText.newMessSave, newMessText.newMess);
        }
        if (!!listFileIMG && listFileIMG.length > 0) {
            saveIMG();

            removeUpIMG();
        }
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
        setListFileIMG((prev) => [...prev, ...listFileImgPreview]);
    };
    var removeOneIMG = (index) => {
        var itemIMG = listFileIMG[index];

        var newListFileIMG = listFileIMG.filter((item) => {
            return item.preview !== itemIMG.preview;
        });
        URL.revokeObjectURL(itemIMG.preview);
        setListFileIMG(newListFileIMG);
    };
    var removeUpIMG = () => {
        for (var itemIMG in listFileIMG) {
            URL.revokeObjectURL(itemIMG.preview);
        }
        setListFileIMG([]);
    };
    var renderVideoOrImg = (file) => {
        var type = file.type.split('/')[0];
        if (type === 'video') {
            return <video src={file.preview} className={cx('w-14 h-14 rounded-md m-1 shadow-md')} controls={false} />;
        }
        return <img src={file.preview} alt={file.name} className={cx('w-14 h-14 rounded-md m-1 shadow-md')} />;
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
                                removeOneIMG(index);
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
        }
        return <></>;
    };

    return (
        <div className={cx('h-full relative bg-white  p-2 w-full mr-20  flex items-center z-20')}>
            <Button
                type="button"
                className={cx('absolute z-10 -top-24 right-2 m-0 p-0 ', hiddenSendIMG)}
                onClick={removeUpIMG}
            >
                <FaTimesCircle
                    className={cx(
                        'text-2xl text-black text-opacity-70 border-white border bg-white rounded-full hover:text-red-400',
                    )}
                />
            </Button>
            <div
                className={cx(
                    'w-full -top-20 bg-opacity-90 pt-4 left-0 h-20 border-t border-t-slate-100 absolute overflow-y-auto flex-wrap  backdrop-blur-md p-4 flex ',
                    hiddenSendIMG,
                )}
            >
                {renderSelectedIMG()}
            </div>

            <input
                id="file-doc"
                className="hidden"
                type="file"
                onChange={handlePreviewIMG}
                multiple={true}
                accept="video/*,image/*"
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
                    'w-full max-h-20 overflow-y-auto  p-2 pr-4 pl-4 border border-lcn-blue-4  rounded-3xl m-2 break-words outline-none caret-lcn-blue-4',
                    'resize-none',
                    heightText,
                    'input-send',
                )}
                contentEditable={true}
                onInput={(e) => {
                    setCurrMessage(e.currentTarget.textContent.trim());
                    changeHeightText(e.currentTarget.scrollHeight);
                }}
                placeholder="Nhập tin nhắn"
                onKeyUp={handleKeyUpSendMess}
                ref={txtSendRef}
                data-text="Nhập tin nhắn của bạn tại đây"
            ></div>
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
