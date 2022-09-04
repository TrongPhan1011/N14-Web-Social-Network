import classNames from 'classnames/bind';
import { useState } from 'react';

import { AiOutlineMessage, AiFillMessage, AiFillSetting, AiOutlineSetting } from 'react-icons/ai';
import { FaBell, FaRegBell } from 'react-icons/fa';
import { RiUserLine, RiUserFill } from 'react-icons/ri';
import { HiNewspaper, HiOutlineNewspaper } from 'react-icons/hi';

import styles from './Header.module.scss';
import config from '~/configRoutes';
import { lcnImage } from '~/image';
import Button from '~/components/Button';
import ItemMenu from '~/components/ItemMenu';

const cx = classNames.bind(styles);
function Header() {
    return (
        <div className="  bg-lcn-blue-2 w-full  ">
            <div className={cx('h-1/6 w-full flex  ')}>
                <Button className="h-10 w-full ">
                    <img src={lcnImage.logo1} alt="logo" className="bg-none h-16 w-full " />
                </Button>
            </div>
            <div className={cx('h-3/6 w-full ')}>
                <ItemMenu to={config.routeConfig.home} Icon1={AiOutlineMessage} Icon2={AiFillMessage} tip="Tin nhắn" />
                <ItemMenu to={config.routeConfig.friends} Icon1={RiUserLine} Icon2={RiUserFill} tip="Bạn bè" />
                <ItemMenu to={config.routeConfig.news} Icon1={HiOutlineNewspaper} Icon2={HiNewspaper} tip="Bản tin" />
                <ItemMenu to={config.routeConfig.notification} Icon1={FaRegBell} Icon2={FaBell} tip="Thông báo" />
            </div>
            <div className={cx('h-2/6 w-full flex  flex-col justify-end items-center')}>
                <ItemMenu to={config.routeConfig.friends} Icon1={AiOutlineSetting} Icon2={AiFillSetting} />
                <div
                    className={cx(
                        ' rounded-full bg-white border border-lcn-blue-4 h-14 w-14 flex justify-center items-center mb-7 mt-3',
                    )}
                >
                    123
                </div>
            </div>
        </div>
    );
}

export default Header;
