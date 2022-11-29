import classNames from 'classnames';
import { memo } from 'react';

import { AiOutlineComment, AiOutlineHeart } from 'react-icons/ai';

import HeaderPost from '~/components/HeaderPost';
import { lcnImage } from '~/image';
import Button from '~/components/Button';
import Comment from '~/components/Comment';
import InputSend from '~/components/InputSend';

const cx = classNames;

function Post() {
    return (
        <div className={cx('w-4/6 bg-white  m-2 p-2 rounded-lg ')}>
            <HeaderPost />
            <div className={cx('w-full break-words p-2 pr-3 pl-3')}>
                <div>
                    Trọng Phan Trọng PhanTrọng Phan Trọng Phan Trọng Phan Trọng Phan Trọng Phan Trọng Phan Trọng Phan{' '}
                    Trọng Phan Trọng Phan Trọng Phan Trọng Phan Trọng Phan Trọng Phan Trọng Phan Trọng Phan Trọng Phan{' '}
                    Trọng Phan
                </div>
                <div className={cx('w-full rounded-lg overflow-hidden mt-2 r')}>
                    <img src={lcnImage.coverPhoto} alt="content" />
                </div>
            </div>
            <div className={cx(' w-full pr-1 pl-1 flex items-center border-t border-b border-lcn-blue-1 mt-2')}>
                <Button className={cx('text-sm font-semibold text-slate-500 ')}>
                    <AiOutlineHeart className={cx('text-3xl text-red-500 mr-1')} />
                    <span>3k</span>
                </Button>

                <Button className={cx('text-sm font-semibold text-slate-500 ml-5')}>
                    <AiOutlineComment className={cx('text-3xl text-lcn-blue-4 mr-1')} />
                    <span>Bình luận</span>
                </Button>
            </div>
            <div className={cx('pr-2 pl-2')}>
                <Comment>
                    <Comment />
                </Comment>
                <InputSend type="comment" />
            </div>
        </div>
    );
}

export default memo(Post);
