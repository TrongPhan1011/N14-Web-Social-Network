import { useEffect, useState, memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from '~/components/Dropdown';
import Button from '~/components/Button';
import ItemDropdown from '~/components/Dropdown/ItemDropdown';
import classNames from 'classnames';
import { lcnImage } from '~/image';
import Avartar from '~/components/Avartar';
import { uploadFileImg } from '~/services/fileService';

const cx = classNames;

function HeaderProfile({ avatar, coverPhoto, userName, active }) {
    const dispatch = useDispatch();
    const [hiddenMenu, setHiddenMenu] = useState('hidden');
    const [showMenu, setShowMenu] = useState(false);

    var ava = lcnImage.avatarDefault;
    if (avatar) {
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
        console.log(img);
        listFileImgPreview.push(img);
        // saveFile();
        console.log(listFileImgPreview);
        const formDataFile = new FormData();
        console.log(listFileImgPreview[0]);
        formDataFile.append('images', listFileImgPreview[0]);
        console.log(formDataFile);
        // var urlIMG = await uploadFileImg(formDataFile);
        // ava = urlIMG;
        // console.log(ava);
        e.target.value = null;
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
                        // onClick={handleHuyKetBan}
                    >
                        Xem ảnh
                    </ItemDropdown>
                    <ItemDropdown
                        className={cx(
                            'rounded-md text-lcn-blue-5 font-medium',
                            'hover:bg-blue-100',
                            'active:bg-blue-200',
                        )}
                        // onClick={handleHuyKetBan}
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
                    // onClick={handleHuyKetBan}
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
                                    <Avartar className={cx('h-28 w-28')} src={ava} />
                                </Button>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </div>
            <div
                className={cx(
                    'bg-white w-full h-14 text-2xl flex justify-center items-center font-semibold text-lcn-blue-5',
                )}
            >
                {userName}
            </div>
        </div>
    );
}

export default HeaderProfile;
