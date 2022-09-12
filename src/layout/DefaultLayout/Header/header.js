import classNames from 'classnames';
import { useState } from 'react';

import { AiOutlineMessage, AiFillMessage, AiFillSetting, AiOutlineSetting } from 'react-icons/ai';
import { FaBell, FaRegBell } from 'react-icons/fa';
import { RiUserLine, RiUserFill } from 'react-icons/ri';
import { HiNewspaper, HiOutlineNewspaper } from 'react-icons/hi';

import config from '~/configRoutes';
import { lcnImage } from '~/image';
import Button from '~/components/Button';
import ItemMenu from '~/components/ItemMenu';

const cx = classNames;
function Header() {
    return (
        <div className="  bg-lcn-blue-2 w-full  ">
            <div className={cx('h-1/6 w-full flex pt-4')}>
                <Button className="h-10 w-full ">
                    <img src={lcnImage.logo1} alt="logo" className="bg-none h-16 w-full " />
                </Button>
            </div>
            <div className={cx('h-3/6 w-full ')}>
                <ItemMenu to={config.routeConfig.home} icon1={AiOutlineMessage} icon2={AiFillMessage} tip="Tin nhắn" />
                <ItemMenu to={config.routeConfig.friends} icon1={RiUserLine} icon2={RiUserFill} tip="Bạn bè" />
                <ItemMenu to={config.routeConfig.news} icon1={HiOutlineNewspaper} icon2={HiNewspaper} tip="Bản tin" />
            </div>
            <div className={cx('h-2/6 w-full flex  flex-col justify-end items-center')}>
                <ItemMenu to={config.routeConfig.setting} icon1={AiOutlineSetting} icon2={AiFillSetting} tip="Cài đặt" />
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
