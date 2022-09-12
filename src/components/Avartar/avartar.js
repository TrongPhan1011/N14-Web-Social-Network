import classNames from 'classnames';

import { lcnImage } from '~/image';

const cx = classNames;

function Avartar({ className }) {
    return (
        <div
            className={cx(
                ' bg-lcn-blue-4 rounded-full overflow-hidden flex justify-center items-center p-1 ',
                className,
            )}
        >
            <img src={lcnImage.avatarDefault} alt="avartar" className={cx('w-full h-full border ')} />
        </div>
    );
}

export default Avartar;
