import classNames from 'classnames';
import { useSelector } from 'react-redux';

import SideBar from '~/components/SideBar';
import ContentNews from './ContentNews';

const cx = classNames;

function News() {
    const userLoginData = useSelector((state) => state.persistedReducer.signIn.userLogin);

    return (
        <div className={cx('flex overflow-hidden')}>
            <div className={cx('w-[270px] h-screen')}>
                <SideBar type="profile" userLoginData={userLoginData} />
            </div>
            <ContentNews />
        </div>
    );
}

export default News;
