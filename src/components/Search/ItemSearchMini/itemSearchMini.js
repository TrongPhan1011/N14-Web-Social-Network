import classNames from 'classnames';

import Button from '~/components/Button';
import Avartar from '~/components/Avartar';
import ItemDropdown from '~/components/Dropdown/ItemDropdown';
import { AiOutlineMessage } from 'react-icons/ai';

import config from '~/configRoutes';
import { useDispatch } from 'react-redux';
import { currentChat } from '~/redux/Slice/sidebarChatSlice';
import { getInboxByIdFriend, getChatByIdChat } from '~/services/chatService';

import { useNavigate } from 'react-router-dom';

const cx = classNames;

function ItemSearchMini({ itemData, type, searchMore, hidden, accessToken, axiosJWT, curChat, curUser }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getDataRender = () => {
        var srcAvatar = itemData?.profile?.urlAvartar;
        var name = itemData?.fullName;
        var to = config.routeConfig.profile + `?id=${itemData.id}`;
        var classItem = {
            nameClass: 'w-28',
            avatarClass: 'w-8 h-8',
            chatClass: 'text-xl',
        };
        if (type === 'group') {
            srcAvatar = itemData.avatar;
            name = itemData.name;
            to = null;
        }
        if (searchMore) {
            classItem = {
                avatarClass: 'w-11 h-11',
                nameClass: ' text-base',
                chatClass: 'text-2xl',
            };
        }
        return {
            srcAvatar,
            name,
            to,
            classItem,
        };
    };
    const dataRender = getDataRender();

    const handleShowChat = async () => {
        var chat = await getInboxByIdFriend(curUser.id, itemData.id, accessToken, axiosJWT);

        if (!!chat) {
            navigate(config.routeConfig.home);

            dispatch(currentChat(chat));
            hidden();
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
        <div className="relative flex items-center">
            <ItemDropdown to={dataRender.to} className={cx('w-full')} onClick={handleShowGroup}>
                <div className={cx('flex break-words items-center justify-start')}>
                    <Avartar src={dataRender.srcAvatar} className={cx(dataRender.classItem?.avatarClass)} />
                    <div
                        className={cx(
                            ' break-words text-left pl-2 pr-2 text-sm font-medium text-lcn-blue-5',
                            dataRender.classItem?.nameClass,
                        )}
                    >
                        {dataRender.name}
                    </div>
                </div>
            </ItemDropdown>
            {type === 'friend' ? (
                <Button onClick={handleShowChat} className={cx('absolute right-2  bg-yellow-400 mr-0 ml-0')}>
                    <AiOutlineMessage className={cx(' text-white ', dataRender.classItem?.chatClass)} />
                </Button>
            ) : (
                <></>
            )}
        </div>
    );
}

export default ItemSearchMini;
