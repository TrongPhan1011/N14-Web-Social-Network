import classNames from 'classnames';
import { memo } from 'react';
import Button from '~/components/Button';
import { lcnImage } from '~/image';
import config from '~/configRoutes';

const cx = classNames;

function CardFriend({ list }) {
    var img = lcnImage.avatarDefault;
    const renderItemBanBe = () => {
        if (list.length <= 4) {
            return list.map((item) => {
                if (!!item?.profile.urlAvartar) {
                    img = item?.profile.urlAvartar;
                }
                const linkTrangCaNhan = config.routeConfig.profile + `?id=${item._id}`;

                return (
                    <Button
                        key={item._id}
                        to={linkTrangCaNhan}
                        className={cx('w-[120px] h-[100px] flex flex-col p-2 ')}
                    >
                        <div className={cx('h-4/5 w-full block overflow-hidden')}>
                            <img src={img} alt="avartar" className={cx('w-full h-full rounded')} />
                        </div>
                        <div className={cx('h-1/5 w-full flex justify-center text-sm font-semibold')}>
                            {item.fullName}
                        </div>
                    </Button>
                );
            });
        } else {
            var listfull = list.slice(0, 4);
            return listfull.map((item) => {
                const linkTrangCaNhan = config.routeConfig.profile + `?id=${item._id}`;

                return (
                    <Button
                        key={item._id}
                        to={linkTrangCaNhan}
                        className={cx('w-[120px] h-[100px] flex flex-col p-0 ')}
                    >
                        <div className={cx('h-4/5 w-full block overflow-hidden')}>
                            <img
                                src={item?.profile?.urlAvartar}
                                alt="avartar"
                                className={cx('w-full h-full rounded')}
                            />
                        </div>
                        <div className={cx('mt-1 mb-1 h-1/5 w-full flex justify-center text-xs font-semibold ')}>
                            {item.fullName}
                        </div>
                    </Button>
                );
            });
        }
    };
    return <div className={cx('w-full h-full p-5 flex flex-wrap justify-between')}>{renderItemBanBe()}</div>;
}

export default memo(CardFriend);
