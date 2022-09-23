import classNames from 'classnames';

import SideBar from '~/components/SideBar';
import ContentChat from './ContentChat';

const cx = classNames;
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
