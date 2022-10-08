import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { lcnImage } from '~/image';
import style from './loginLayout.module.scss';

const cx = classNames.bind(style);
function LoginLayout({ children }) {
    return (
        <div className={cx('bg-gradient-layout', 'w-full h-screen ')}>
            <div className={cx('h-1/6 w-full flex justify-center items-center')}>
                <img src={lcnImage.fullLogo} alt="logo" className="bg-none h-28 w-full " />
            </div>
            <div className={cx('h-5/6 flex justify-center items-center')}>{children}</div>
        </div>
    );
}
LoginLayout.propTypes = {
    children: PropTypes.node,
};

export default LoginLayout;
