import classNames from 'classnames';
import { AiFillHeart } from 'react-icons/ai';

import HeaderPost from '~/components/HeaderPost';
import { lcnImage } from '~/image';

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
            <div className={cx(' w-full p-2 pr-4 pl-4 flex items-center')}>
                <AiFillHeart className={cx('text-3xl')} />
            </div>
        </div>
    );
}

export default Post;
