import classNames from 'classnames';
import SideBar from '~/components/SideBar';

import routeConfig from '~/configRoutes';
import ContentThongTinChung from './ContentThongTinChung';
import ContentDoiMatKhau from './ContentDoiMatKhau';

const cx = classNames;

function Setting() {
    var urlRoute = window.location.pathname;

    const showContent = () => {
        if (urlRoute === routeConfig.routeConfig.setting) return <ContentThongTinChung />;
        else if (urlRoute === routeConfig.routeConfig.doiMatKhau) return <ContentDoiMatKhau />;
        else return <ContentThongTinChung />;
    };
    return (
        <div className={cx('flex overflow-hidden')}>
            <div className={cx('w-[270px] h-screen')}>
                <SideBar type="setting" />
            </div>
            {showContent()}
        </div>
    );
}

export default Setting;
