import classNames from 'classnames';
import { useSelector } from 'react-redux';

import SideBar from '~/components/SideBar';
import ContentChat from './ContentChat';

const cx = classNames;
function Home() {
    const userLoginData = useSelector((state) => state.persistedReducer.signIn.userLogin);

    return (
        <div className={cx('flex overflow-hidden')}>
            <div className="w-[270px] h-screen  ">
                <SideBar userLoginData={userLoginData} />
            </div>
            <ContentChat userLoginData={userLoginData} />
        </div>
    );
}

export default Home;
