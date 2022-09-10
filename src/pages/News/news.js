import classNames from 'classnames/bind';

import styles from './News.module.scss';
import SideBar from '~/components/SideBar';
import ContentNews from './ContentNews';

const cx = classNames.bind(styles);

function News() {
    return (
        <div className={cx('flex overflow-hidden')}>
            <div className={cx('w-[270px] h-screen')}>
                <SideBar type="profile" />
            </div>
            <ContentNews />
        </div>
    );
}

export default News;
