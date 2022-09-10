import classNames from 'classnames/bind';

import styles from './SideBarNews.module.scss';
import ListItem from '~/components/ListItem';

const cx = classNames.bind(styles);
function SideBarNews() {
    return (
        <div className={cx('p-2 h-screen ')}>
            <ListItem type="banBe" />;
        </div>
    );
}

export default SideBarNews;
