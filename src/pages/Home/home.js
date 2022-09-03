import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import SideBar from '~/components/SideBar';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('flex')}>
            <div className="min-w-[250px] h-screen bg-slate-300 ">
                <SideBar />
            </div>
            <div>Home</div>
        </div>
    );
}

export default Home;
