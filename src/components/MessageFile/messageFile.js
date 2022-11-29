import classNames from 'classnames/bind';
import { FiPaperclip } from 'react-icons/fi';
import FileSaver from 'file-saver';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import { getMessageFileByIdChat } from '~/services/messageService';
import Button from '~/components/Button';
import { FaRegTimesCircle } from 'react-icons/fa';

import styles from './MessageFile.module.scss';
const cx = classNames.bind(styles);

function MessageFile({ messageData }) {
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    const [showZoomIMG, setShowZoomIMG] = useState(false);
    const [arrImg, setArrImg] = useState([]);
    useEffect(() => {
        const getDataMessFile = async () => {
            const LIMIT_MESS = 20;
            const SKIP_MESS = 0;

            if (showZoomIMG) {
                var arrMessFile = await getMessageFileByIdChat(
                    messageData.idChat,
                    LIMIT_MESS,
                    SKIP_MESS,
                    accessToken,
                    axiosJWT,
                );

                var arrLinkImgTemp = [];
                // vòng lặp 1: lọc qua từng mess để lấy ra mảng file trong đó
                for (let itemMess of arrMessFile) {
                    let fileOfMess = itemMess.file;
                    // vòng lặp 2: lấy ra mảng file và đưa link của file vô arrLinkImg
                    for (let fileItem of fileOfMess) {
                        if (fileItem.fileType === 'image' || fileItem.fileType === 'video') {
                            arrLinkImgTemp.push(fileItem.path);
                        }
                    }
                }

                setArrImg(arrLinkImgTemp);
            }
        };
        getDataMessFile();
    }, [showZoomIMG]);

    var renderOneFile = (firstFile) => {
        if (firstFile.fileType === 'image') {
            return (
                <div
                    onClick={() => setShowZoomIMG(true)}
                    className={cx('rounded-2xl overflow-hidden max-h-80 min-w-[100px] hover:cursor-pointer ')}
                >
                    <img src={firstFile?.path} alt="file img" className={cx('w-full')} />
                </div>
            );
        } else if (firstFile.fileType === 'video') {
            return (
                <div className={cx('rounded-2xl overflow-hidden max-h-80 min-w-[100px] hover:cursor-pointer ')}>
                    <video src={firstFile?.path} alt="file img" className={cx('w-full')} controls={true} poster={''} />
                </div>
            );
        } else if (firstFile.fileType === 'doc') {
            var fileName = firstFile.title;
            if (firstFile.title.length > 30) {
                fileName =
                    fileName.slice(0, 20) +
                    ' ... ' +
                    fileName.slice(firstFile.title.length - 10, firstFile.title.length);
            }
            return (
                <Button
                    className={cx(
                        'rounded-2xl text-sm m-0 text-slate-500 overflow-hidden h-16 min-w-[100px]  bg-slate-200 backdrop-blur-md flex items-center p-3',
                        'font-semibold',
                    )}
                    onClick={() => {
                        FileSaver.saveAs(firstFile.path, firstFile.title);
                    }}
                >
                    <FiPaperclip
                        className={cx(
                            'text-3xl border-lcn-blue-3 border text-lcn-blue-4 p-1 h-9 w-9 bg-lcn-blue-2 rounded-full mr-2 ',
                        )}
                    />
                    {fileName}
                </Button>
            );
        }
    };

    var renderManyFile = (files) => {
        const compManyIMG = files.map((file, index) => {
            if (file.fileType === 'image') {
                return (
                    <div
                        key={file.title + index}
                        onClick={() => setShowZoomIMG(true)}
                        className={cx(' w-32 h-32 hover:cursor-pointer p-[0.5px]')}
                    >
                        <img src={file?.path} alt={file.title} className={cx('w-full h-full')} />
                    </div>
                );
            } else if (file.fileType === 'video') {
                return (
                    <div
                        onClick={() => setShowZoomIMG(true)}
                        key={file.title + index}
                        className={cx(' w-32 h-32 hover:cursor-pointer p-[0.5px]')}
                    >
                        <video src={file?.path} alt="file img" className={cx('w-full h-full')} />
                    </div>
                );
            }
        });

        return <div className={cx('rounded-2xl   flex flex-wrap overflow-hidden')}>{compManyIMG}</div>;
    };

    var handleRenderFile = () => {
        const files = messageData.file;
        const ONE_FILE = 1; // 1 file img, video
        if (files.length === ONE_FILE) {
            var firstFile = files[0];
            return <>{renderOneFile(firstFile)}</>;
        } else return <>{renderManyFile(files)}</>;
    };
    const settings = {
        customPaging: function (index) {
            return (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a className="w-full ">
                    <img src={arrImg[index]} alt="img" className={cx(' w-32 h-20')} />
                </a>
            );
        },

        dots: true,
        dotsClass: 'slick-dots slick-thumb',
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const renderIMGBottomSlider = () => {
        if (arrImg.length > 0) {
            return arrImg.map((item, index) => {
                return (
                    <div key={item} className="w-24 h-[10vh]  overflow-hidden">
                        <div className={cx(' w-full h-full flex justify-center items-center')}>
                            <img src={item} alt="zoom anh" className={cx('object-fit  h-full')} />
                        </div>
                    </div>
                );
            });
        }
        return <></>;
    };

    const renderIMGSlider = () => {
        if (arrImg.length > 0) {
            return arrImg.map((item, index) => {
                return (
                    <div key={item} className="w-[full] h-[80vh]  overflow-hidden">
                        <div className={cx(' w-full h-full flex justify-center items-center')}>
                            <img src={item} alt="zoom anh" className={cx('object-fit max-w-[70vw] h-full')} />
                        </div>
                    </div>
                );
            });
        }
        return <></>;
    };

    return (
        <>
            <div>{handleRenderFile()}</div>
            {showZoomIMG && (
                <div
                    className={cx(
                        'w-full h-full  top-0 left-0 absolute z-20 bg-slate-500 bg-opacity-40 backdrop-blur-md',
                        'p-3 overflow-hidden',
                    )}
                >
                    <div className={cx('w-full ')}>
                        <FaRegTimesCircle
                            onClick={() => setShowZoomIMG(false)}
                            className={cx('text-3xl text-white hover:text-lcn-blue-4')}
                        />
                    </div>
                    <div className={cx('w-full h-full  ', 'lcn-slider')}>
                        <Slider {...settings}>{renderIMGSlider()}</Slider>
                    </div>
                </div>
            )}
        </>
    );
}

export default MessageFile;
