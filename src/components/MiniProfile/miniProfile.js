import classNames from 'classnames';

import Inbox from './Inbox';
import Group from './Group';
import { useEffect, useState, memo } from 'react';

const cx = classNames;

function MiniProfile({ profileIn, typeChat, curChat }) {
    var animationIn = 'ease-left-to-right ';
    if (profileIn) {
        animationIn = 'ease-right-to-left ';
    }
    const [showContent, setShowContent] = useState(false);
    const [curChatState, setCurChatState] = useState();

    useEffect(() => {
        if (!!curChat) {
            setCurChatState(curChat);
        }
    }, [curChat]);
    useEffect(() => {
        if (!!curChatState) {
            setShowContent(true);
        }
    }, [curChatState]);

    const renderProfile = () => {
        if (showContent) {
            if (typeChat === 'group') {
                return <Group curChat={curChat} />;
            } else return <Inbox curChat={curChat} />;
        }
    };

    return (
        <div className={cx(animationIn, 'border-l border-lcn-blue-3 h-full w-full overflow-y-scroll')}>
            {renderProfile()}
        </div>
    );
}

export default memo(MiniProfile);
