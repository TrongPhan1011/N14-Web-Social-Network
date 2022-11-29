import classNames from 'classnames';

import Button from '~/components/Button';
import Avartar from '~/components/Avartar';

import config from '~/configRoutes';
import { useDispatch } from 'react-redux';
import { currentChat } from '~/redux/Slice/sidebarChatSlice';
import { getInboxByIdFriend, getChatByIdChat } from '~/services/chatService';

import { useNavigate } from 'react-router-dom';

const cx = classNames;

function ItemSearchAll({ itemData, type, accessToken, axiosJWT, curChat, curUser }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getDataRender = () => {
        var srcAvatar = itemData?.profile?.urlAvartar;
        var name = itemData?.fullName;
        var to = config.routeConfig.profile + `?id=${itemData.id}`;

        if (type === 'group') {
            srcAvatar = itemData.avatar;
            name = itemData.name;
            to = null;
        }
        return {
            srcAvatar,
            name,
            to,
        };
    };
    const dataRender = getDataRender();

    const handleShowChat = async () => {
        var chat = await getInboxByIdFriend(curUser.id, itemData.id, accessToken, axiosJWT);

        if (!!chat) {
            navigate(config.routeConfig.home);

            dispatch(currentChat(chat));
        }
    };
    const handleShowGroup = async () => {
        if (type === 'group') {
            var chat = await getChatByIdChat(itemData.id, accessToken, axiosJWT);

            if (!!chat) {
                navigate(config.routeConfig.home);

                dispatch(currentChat(chat));
            }
        }
    };

    return (
        <div className={cx('flex items-center m-2 mb-5')}>
            <div className={cx('flex items-center w-2/3')}>
                <Avartar src={dataRender.srcAvatar} className={cx('w-12 h-12')} />
                <div className={cx('text-lcn-blue-5 font-medium pr-3 pl-3 text-lg')}>{dataRender.name}</div>
            </div>
            <div className={cx('flex items-center w-1/3 justify-end')}>
                <Button className={cx('bg-lcn-blue-4 bg-opacity-100 text-white p-2 pr-3 pl-3')}>Kết bạn</Button>
            </div>
        </div>
    );
}

export default ItemSearchAll;
