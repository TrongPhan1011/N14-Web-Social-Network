import classNames from 'classnames';

import { lcnImage } from '~/image';
const cx = classNames;

function Page404() {
    return (
        <div className={cx('w-screen h-screen')}>
            <img src={lcnImage.page404} alt="404 khong tim thay" className={cx('w-full h-screen object-fit')} />
        </div>
    );
}

export default Page404;
