import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import SideBar from '~/components/SideBar';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('flex')}>
            <div className="w-[270px] h-screen  ">
                <SideBar />
            </div>
            <div>Home</div>
        </div>
    );
}

export default Home;
