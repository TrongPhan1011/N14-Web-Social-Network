import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);
function SideBar() {
    return <div className={cx('bg-slate-400')}>SideBar</div>;
}

SideBar.propTypes = {};

export default SideBar;
