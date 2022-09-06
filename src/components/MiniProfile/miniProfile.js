import classNames from 'classnames/bind';

import styles from './MiniProfile.module.scss';
import HeaderProfile from '~/components/HeaderProfile';
import { lcnImage } from '~/image';
import GioiThieu from '~/components/GioiThieu';
import Button from '~/components/Button';

import { BiEdit, BiPaint, BiBell, BiBlock } from 'react-icons/bi';
import { AiOutlineWarning } from 'react-icons/ai';

const cx = classNames.bind(styles);

function MiniProfile({ profileIn }) {
    var animationIn = 'ease-left-to-right ';
    if (profileIn) {
        animationIn = 'ease-right-to-left ';
    }

    return (
        <div className={cx(animationIn, 'border-l border-lcn-blue-3 h-full w-full overflow-y-scroll')}>
            <HeaderProfile avatar={lcnImage.avatarDefault} coverPhoto={lcnImage.coverPhoto} userName="Trọng Phan" />
            <GioiThieu />
            <div className={cx('w-full h-0  border-t border-lcn-blue-3 ', '')}>
                <div className={cx(' bg-lcn-blue-1 flex flex-col items-center p-5 pt-3  text-lcn-blue-4', '')}>
                    <Button className={cx('bg-lcn-blue-4 bg-opacity-20 text-lcn-blue-5 p-2 pr-4 pl-4 w-full mb-3')}>
                        Chi tiết trang cá nhân
                    </Button>
                    <Button className={cx('flex   w-full  p-2 hover:bg-lcn-blue-3')}>
                        <div className={cx('flex items-center')}>
                            <BiEdit className={cx('text-lcn-blue-4 w-7 h-7 ')} />{' '}
                            <span className={cx('  ml-4  w-4/5 ')}>Đổi biệt danh</span>
                        </div>
                    </Button>
                    <Button className={cx('flex   w-full  p-2 hover:bg-lcn-blue-3')}>
                        <div className={cx('flex items-center')}>
                            <BiPaint className={cx('text-lcn-blue-4 w-7 h-7 ')} />{' '}
                            <span className={cx(' ml-4  w-4/5 ')}>Chủ đề</span>
                        </div>
                    </Button>
                    <Button className={cx('flex   w-full  p-2 hover:bg-lcn-blue-3')}>
                        <div className={cx('flex items-center')}>
                            <BiBell className={cx('text-lcn-blue-4 w-7 h-7 ')} />{' '}
                            <span className={cx('  ml-4  w-4/5 ')}>Thông báo</span>
                        </div>
                    </Button>
                    <Button className={cx('flex   w-full p-2 hover:bg-lcn-blue-3')}>
                        <div className={cx('flex items-center')}>
                            <AiOutlineWarning className={cx('text-lcn-blue-4 w-7 h-7 ')} />{' '}
                            <span className={cx('  ml-4  w-4/5 ')}>Báo cáo</span>
                        </div>
                    </Button>
                    <Button className={cx('flex   w-full p-2 hover:bg-red-200')}>
                        <div className={cx('flex items-center')}>
                            <BiBlock className={cx('text-red-500 w-7 h-7 ')} />{' '}
                            <span className={cx('  ml-4  w-4/5 text-red-500 ')}>Chặn</span>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MiniProfile;
