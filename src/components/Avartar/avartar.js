import classNames from 'classnames';

import { lcnImage } from '~/image';

const cx = classNames;

function Avartar({ className, src }) {
    var _src = lcnImage.avatarDefault;
    if (!!src) {
        _src = src;
    }
    return (
        <div className={cx(' rounded-[50%]   flex justify-center items-center p-0 ', 'overflow-hidden', className)}>
            <img src={_src} alt="avartar" className={cx('w-full h-full')} />
        </div>
    );
}

export default Avartar;
