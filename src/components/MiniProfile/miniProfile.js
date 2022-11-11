import classNames from 'classnames';

import Inbox from './Inbox';
import Group from './Group';

const cx = classNames;

function MiniProfile({ profileIn, typeChat }) {
    var animationIn = 'ease-left-to-right ';
    if (profileIn) {
        animationIn = 'ease-right-to-left ';
    }

    const renderProfile = () => {
        console.log(typeChat);
        if (typeChat === 'group') {
            return <Group />;
        } else return <Inbox />;
    };

    return (
        <div className={cx(animationIn, 'border-l border-lcn-blue-3 h-full w-full overflow-y-scroll')}>
            {renderProfile()}
        </div>
    );
}

export default MiniProfile;
