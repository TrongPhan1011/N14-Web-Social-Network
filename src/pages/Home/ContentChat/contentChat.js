import classNames from 'classnames';
import { useState, memo } from 'react';

import { FaPhone, FaVideo, FaInfoCircle } from 'react-icons/fa';

import Button from '~/components/Button';

import ContentMessage from '~/components/ContentMessage';
import InputSend from '~/components/InputSend';
import MiniProfile from '~/components/MiniProfile';
import { useSelector } from 'react-redux';

import Avartar from '~/components/Avartar';

const cx = classNames;

function ContentChat() {
    var currChat = useSelector((state) => state.sidebarChatSlice.currentChat);

    var [widthValue, setWidthValue] = useState('');

    const showMiniProfile = () => {
        if (widthValue === '') return <></>;
        else if (widthValue === 'ease-right-to-left')
            return <MiniProfile profileIn={true} typeChat={currChat?.typeChat} />;
        else return <MiniProfile profileIn={false} typeChat={currChat?.typeChat} />;
    };

    const onClickInfo = () => {
        if (widthValue === 'ease-left-to-right' || widthValue === '') setWidthValue('ease-right-to-left');
        else setWidthValue('ease-left-to-right');
    };

    return (
        <div className={cx(' w-full h-full flex overflow-hidden ')}>
            <div className={cx('w-full    justify-between  ')}>
                <div className={cx('h-[10vh] bg-lcn-blue-2  w-full flex  top-0')}>
                    <div className={cx('w-1/2  h-full flex pl-4')}>
                        <Button type="button">
                            <Avartar className={cx('h-12 w-12')} src={currChat?.avatar} />
                        </Button>
                        <div>
                            <div className="w-full flex items-center">
                                <Button type="button" className="text-lcn-blue-5 font-semibold text-lg m-0 ">
                                    {currChat?.name}
                                </Button>
                                <span className={cx('h-3 w-3 bg-lcn-green-1 rounded-full inline-block ml-2')}></span>
                            </div>

                            <div className={cx('text-xs text-slate-500 ml-1')}>Đang hoạt động</div>
                        </div>
                    </div>
                    <div className={cx('w-1/2  h-full flex pl-4 justify-end')}>
                        <Button className="mr-4">
                            <FaPhone className="text-lcn-blue-4 text-2xl" />
                        </Button>
                        <Button className="mr-4">
                            <FaVideo className="text-lcn-blue-4 text-2xl" />
                        </Button>
                        <Button className="mr-4" onClick={onClickInfo}>
                            <FaInfoCircle className="text-lcn-blue-4 text-2xl" />
                        </Button>
                    </div>
                </div>
                <div className="h-[80vh] ">
                    <ContentMessage />
                </div>
                <div className="h-[10vh] w-full  ">
                    <InputSend />
                </div>
            </div>
            <div className={cx('bg-white h-full ', widthValue)}>{showMiniProfile()}</div>
        </div>
    );
}

export default memo(ContentChat);
