import classNames from 'classnames';

import SideBar from '~/components/SideBar';
const cx = classNames;

function Setting() {
    return (
        <div className={cx('flex overflow-hidden')}>
            <div className="w-[270px] h-screen  ">
                <SideBar type="setting" />
            </div>
        </div>
    );
}

export default Setting;
