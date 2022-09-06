import classNames from 'classnames/bind';

import styles from './MiniProfile.module.scss';
import HeaderProfile from '~/components/HeaderProfile';
import { lcnImage } from '~/image';

const cx = classNames.bind(styles);

function MiniProfile({ profileIn }) {
    var animationIn = 'ease-left-to-right';
    if (profileIn) {
        animationIn = 'ease-right-to-left';
    }

    return (
        <div className={cx(animationIn, 'border-l border-lcn-blue-3 h-full w-full')}>
            <HeaderProfile avartar={lcnImage.avatarDefault} coverPhoto={lcnImage.coverPhoto} userName="Trọng Phan" />
        </div>
    );
}

export default MiniProfile;
