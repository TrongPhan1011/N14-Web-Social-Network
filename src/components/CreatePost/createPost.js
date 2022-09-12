import classNames from 'classnames/bind';
import { useState, memo } from 'react';

import { AiFillFileImage } from 'react-icons/ai';

import styles from './CreatePost.module.scss';
import { lcnImage } from '~/image';
import Button from '~/components/Button';
import HeaderPost from '~/components/HeaderPost';
import { BiWinkSmile } from 'react-icons/bi';
import { RiSendPlaneFill } from 'react-icons/ri';

const cx = classNames.bind(styles);
function CreatePost() {
    const [collapse, setCollapse] = useState();

    var showFooter = '';
    if (collapse === 'txt-post-out') {
        showFooter = 'block';
    } else showFooter = 'hidden';

    const onClickHuy = () => {
        setCollapse('txt-post-in');
    };

    return (
        <div className={cx('w-4/6   m-2 p-2 rounded-lg', 'bg-create-post')}>
            <HeaderPost type="create" />
            <div className={cx('p-2 ')}>
                <textarea
                    className={cx(
                        'w-full h-10 p-2 pr-4 pl-4 text-black rounded-3xl caret-lcn-blue-4 resize-none outline-none',
                        collapse,
                    )}
                    placeholder="Đăng bài viết"
                    onFocus={() => {
                        setCollapse('txt-post-out');
                    }}
                />
            </div>

            <div className={cx(' w-full pl-2 pr-2 flex justify-between', showFooter)}>
                <div className=" flex">
                    <Button
                        className={cx(
                            'm-0  p-2 h-11 w-11 justify-center bg-white border border-lcn-blue-3 bg-opacity-90',
                        )}
                    >
                        <AiFillFileImage className={cx('text-lcn-blue-4 text-2xl')} />
                    </Button>

                    <Button
                        className={cx(
                            'm-0 ml-2 p-2 h-11 w-11 justify-center bg-white border border-lcn-blue-3 bg-opacity-90',
                        )}
                    >
                        <BiWinkSmile className={cx('text-lcn-blue-4 text-2xl')} />
                    </Button>
                </div>

                <div className={cx('flex items-center')}>
                    <Button
                        className={cx(
                            ' h-9 w-16 p-2 bg-gray-300  bg-opacity-100 ',
                            'flex justify-center items-center rounded-full m-0 text-white',
                            'font-semibold',
                        )}
                        onClick={onClickHuy}
                    >
                        Huỷ
                    </Button>

                    <Button
                        className={cx(
                            ' h-10 w-36 p-2 ml-2 bg-white border border-lcn-blue-4 bg-opacity-100 ',
                            'flex justify-center items-center rounded-full m-0 text-lcn-blue-5',
                            'font-semibold',
                        )}
                    >
                        Đăng bài
                        <RiSendPlaneFill className={cx('text-lcn-blue-4 ml-2 text-3xl ')} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default memo(CreatePost);
