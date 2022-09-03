import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);
function Button({ children, className, type, to, href, onClick, navLink, ...passProps }) {
    let Comp = 'button';
    const _props = {
        onClick,
        type,
        ...passProps,
    };

    if (to) {
        _props.to = to;

        Comp = Link;
    } else if (href) {
        _props.href = href;
        Comp = 'a';
    }

    var _className = cx('p-1 rounded-3xl m-1 bg-opacity-60 hover:bg-opacity-80 active:bg-opacity-100', className);
    if (navLink) {
        Comp = NavLink;
        _className = (nav) =>
            cx('p-1 rounded-3xl m-1 bg-opacity-60 hover:bg-opacity-80 active:bg-opacity-100', className, {
                active: nav.isActive,
            });
    }

    return (
        // <div className=" w-full   border-b-4 border-lcn-blue-4 border-none">
        <Comp className={_className} {..._props}>
            {children}
        </Comp>
        // </div>
    );
}

Button.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    type: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
    navLink: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;
