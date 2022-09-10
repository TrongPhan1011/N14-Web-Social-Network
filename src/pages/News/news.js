import classNames from 'classnames';

import SideBar from '~/components/SideBar';
import ContentNews from './ContentNews';

const cx = classNames;

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
