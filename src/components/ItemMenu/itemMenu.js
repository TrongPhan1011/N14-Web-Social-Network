import classNames from 'classnames/bind';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import styles from './ItemMenu.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function ItemMenu({ Icon1, Icon2, tip = null, to }) {
    const [iconMenu, setIconMenu] = useState(false);

    return (
        <Tippy content={tip} placement="right" arrow={false} theme="blue" className="-ml-2">
            <div className={cx(' w-full flex')}>
                <Button
                    className="h-14 w-full flex justify-center"
                    to={to}
                    navLink={true}
                    onMouseEnter={() => setIconMenu(true)}
                    onMouseLeave={() => setIconMenu(false)}
                    onClick={() => setIconMenu(true)}
                >
                    <div className={cx('text-4xl leading-none border-l-4 mr-1 -ml-2 ', 'nav-active')}></div>
                    <div
                        className={cx(
                            ' w-full h-full flex justify-center  items-center rounded-xl',
                            'hover:bg-lcn-blue-4 hover:bg-opacity-70 active:bg-opacity-100',
                        )}
                    >
                        {!iconMenu ? (
                            <>
                                <Icon1 className={cx('text-lcn-blue-4 text-2xl')} />
                            </>
                        ) : (
                            <Icon2 className={cx('text-white text-2xl')} />
                        )}
                    </div>
                </Button>
            </div>
        </Tippy>
    );
}

ItemMenu.propTypes = {
    Icon1: PropTypes.node.isRequired,
    Icon2: PropTypes.node.isRequired,
    tip: PropTypes.string,
    to: PropTypes.string,
};

export default ItemMenu;
