import PropTypes from 'prop-types';
import classNames from 'classnames';

import { lcnImage } from '~/image';

const cx = classNames;
function LoginLayout({ children }) {
    return (
        <div className={cx('bg-lcn-blue-2 w-full h-screen')}>
            <div className={cx('h-1/6 w-full flex justify-center items-center')}>
                <img src={lcnImage.fullLogo} alt="logo" className="bg-none h-28 w-full " />
            </div>
            <div className={cx('h-5/6 flex justify-center')}>{children}</div>
        </div>
    );
}
LoginLayout.propTypes = {
    children: PropTypes.node,
};

export default LoginLayout;
