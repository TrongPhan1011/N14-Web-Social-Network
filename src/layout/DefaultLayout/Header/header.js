import { Fragment } from 'react';

import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import config from '~/configRoutes';

const cx = classNames.bind(styles);
function Header() {
    return (
        <div>
            <h2>Header</h2>
        </div>
    );
}

export default Header;
