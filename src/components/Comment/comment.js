import classNames from 'classnames';
import { memo } from 'react';

import { AiOutlineComment, AiOutlineHeart } from 'react-icons/ai';
import { RiMore2Fill } from 'react-icons/ri';

import Button from '~/components/Button';
import { lcnImage } from '~/image';

const cx = classNames;
function Comment({ children }) {
    return (
        <div className={cx('w-full')}>
            <div className={cx('p-2 flex items-center')}>
                <Button className={cx('m-0 w-1/12 p-0')}>
                    <div
                        className={cx(
                            'w-8 h-8 bg-lcn-blue-4 rounded-full overflow-hidden flex justify-center items-center p-1  ',
                        )}
                    >
                        <img src={lcnImage.avatarDefault} alt="avartar" className={cx('w-full h-full border ')} />
                    </div>
                </Button>
                <div className={cx(' w-10/12 ml-2 mr-2 ')}>
                    <div className={cx('bg-slate-100 rounded-3xl pr-2 pl-2 pb-2')}>
                        <Button className={cx(' font-semibold text-sm text-lcn-blue-5 mb-0')}>Trọng Phan</Button>

                        <div className={cx('ml-2 break-words')}>
                            adsflkjadsflkjadsflkjadsflkjadsflkjadsflkjadsflkjadsflkjadsflkj adsflkj adsflkj adsflkj
                            adsflkj adsflkj
                        </div>
                    </div>
                </div>
                <div className={cx('w-1/12 ')}>
                    <Button className={cx('bg-lcn-blue-2 mr-0 w-6 h-6 justify-center')}>
                        <RiMore2Fill className="text-sm" />
                    </Button>
                </div>
            </div>
            <div className={cx('flex')}>
                <div className={cx('w-1/12')}></div>
                <div className={cx('w-11/12 pr-3 pl-3')}>
                    <div className={cx(' pr-1 pl-1 flex items-center  ')}>
                        <Button className={cx('text-sm font-semibold text-slate-500 mt-0')}>
                            <AiOutlineHeart className={cx('text-lg text-red-500 mr-1')} />
                            <span>3k</span>
                        </Button>

                        <Button className={cx('text-sm font-semibold text-slate-500 ml-5 mt-0')}>
                            <AiOutlineComment className={cx('text-lg text-lcn-blue-4 mr-1')} />
                            <span>Bình luận</span>
                        </Button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default memo(Comment);
