import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import SideBar from '~/components/SideBar';
import ContentChat from './ContentChat';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('flex overflow-hidden')}>
            <div className="w-[270px] h-screen  ">
                <SideBar />
            </div>
            <ContentChat />
        </div>
    );
}

export default Home;
