import Tippy from '@tippyjs/react';
import { memo } from 'react';

function Dropdown({ children, width, position = 'bottom', visible, render, hidden }) {
    return (
        <Tippy
            maxWidth={width}
            interactive
            arrow={false}
            offset={[0, 1]}
            placement={position}
            visible={visible}
            render={(attrs) => render(attrs)}
            onClickOutside={hidden}
        >
            {children}
        </Tippy>
    );
}

export default memo(Dropdown);
