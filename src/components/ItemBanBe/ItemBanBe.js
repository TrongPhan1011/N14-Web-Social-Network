import { useEffect, useState } from 'react';
import classNames from 'classnames';

import Button from '~/components/Button';
import { lcnImage } from '~/image';

import routeConfig from '~/configRoutes';
import { getUserById } from '~/services/userService';

const cx = classNames;
function ItemBanBe({ userId }) {
    const _route = routeConfig.routeConfig;

    const [friendData, setFriendData] = useState({});
    useEffect(() => {
        const printData = async (userId) => {
            var userData = await getUserById(userId);
            setFriendData(userData);
        };
        printData(userId);
    }, [userId]);

    const renderFriendItem = () => {
        if (!!friendData) {
            return (
                <Button
                    to={_route.profile}
                    className={cx('rounded-xl h-16 w-full hover:bg-lcn-blue-3 m-0 p-2 mb-1 mt-1')}
                >
                    <div className={cx('relative w-full h-full flex items-center')}>
                        <div
                            className={cx(
                                'w-10 h-10 bg-lcn-blue-4 rounded-full overflow-hidden flex justify-center items-center p-1 relative',
                            )}
                        >
                            <img src={lcnImage.avatarDefault} alt="avartar" className={cx('w-full h-full border ')} />
                        </div>

                        <div className={cx('w-40  h-full ml-2 overflow-hidden flex items-center')}>
                            <div className={cx('text-left text-lcn-blue-5 font-semibold h-8 w-96 ')}>
                                {friendData.fullName}
                            </div>
                        </div>
                        <div className={cx('h-full w-8 flex items-center')}>
                            <div className={cx('h-3 w-3 bg-lcn-green-1 rounded-full   top-4 left-0')}></div>
                        </div>
                    </div>
                </Button>
            );
        }
        return <></>;
    };
    return <>{renderFriendItem()}</>;
}

export default ItemBanBe;
