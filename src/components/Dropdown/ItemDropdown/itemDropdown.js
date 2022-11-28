import classNames from 'classnames';

import Button from '~/components/Button';

const cx = classNames;
function ItemDropdown({ children, className, ...prop }) {
    return (
        <Button
            type="button"
            {...prop}
            className={cx(
                'w-full hover:bg-lcn-blue-2 active:bg-lcn-blue-3 rounded-lg m-0 items-center  break-words ',
                className,
            )}
        >
            {children}
        </Button>
    );
}

export default ItemDropdown;
