import classNames from 'classnames';

import ListItem from '~/components/ListItem';

const cx = classNames;
function SideBarNews() {
    return (
        <div className={cx('p-2 h-screen ')}>
            <ListItem type="banBe" />;
        </div>
    );
}

export default SideBarNews;
