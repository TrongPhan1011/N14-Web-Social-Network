import classNames from 'classnames';
import { useState, useCallback } from 'react';

import { BiEdit, BiSearch } from 'react-icons/bi';
import Button from '~/components/Button';

import Dropdown from '~/components/Dropdown';
import ItemDropdown from '~/components/Dropdown/ItemDropdown';
import Avartar from '~/components/Avartar';

const cx = classNames;

function Search() {
    const [showSearch, setShowSearch] = useState(false);
    const [hiddenSearchResult, setHiddenSearchResult] = useState('hidden');

    const handleHiddenSearch = useCallback(() => {
        setHiddenSearchResult('hidden');
        setShowSearch(false);
    }, []);

    const searchResult = [
        {
            id: 1,
            title: 'alfdk;ajdlajdfl',
        },
        {
            id: 2,
            title: 'alfdk;adslfjlasdfjladsjflasjdflja',
        },
        {
            id: 3,
            title: 'alfdk;ajdlajdfalsdfjklasdfjlasdjl',
        },
    ];

    const handleShowSearch = () => {
        setHiddenSearchResult('');
        setShowSearch(true);
    };

    const renderData = () => {
        return searchResult.map((item) => (
            <ItemDropdown key={item.id} className={cx('')}>
                <div className={cx('flex break-words items-center justify-start')}>
                    <Avartar className={cx('w-8 h-8')} />
                    <div className={cx(' w-40 break-words text-left pl-2 pr-2 text-sm font-medium text-lcn-blue-5')}>
                        {item.title}
                    </div>
                </div>
            </ItemDropdown>
        ));
    };
    const handleLoadSearchResult = (attrs) => {
        return (
            <div
                className={cx('w-52 bg-white border border-lcn-blue-2 rounded-lg shadow-lg p-2', hiddenSearchResult)}
                tabIndex="-1"
                {...attrs}
            >
                {renderData()}
            </div>
        );
    };

    return (
        <div className={cx('p-2 w-full h-full flex justify-between items-center')}>
            <Dropdown render={handleLoadSearchResult} visible={showSearch} hidden={handleHiddenSearch}>
                <div className={cx('w-52 h-10 flex rounded-3xl  border border-lcn-blue-4 ')}>
                    <input
                        type="text"
                        className={cx('w-full h-full  outline-none rounded-3xl pl-3 pr-2 caret-lcn-blue-4')}
                        placeholder="Tìm kiếm "
                        onFocus={handleShowSearch}
                    />

                    <Button className="bg-lcn-blue-3 flex justify-center items-center">
                        <BiSearch className={cx('text-2xl text-lcn-blue-4')} />
                    </Button>
                </div>
            </Dropdown>
            <Button
                className={cx(
                    'w-10 rounded-full m-0 flex justify-center items-center h-10 bg-lcn-blue-3 ',
                    'hover:text-white ',
                )}
            >
                <BiEdit className={cx('text-2xl text-lcn-blue-4')} />
            </Button>
        </div>
    );
}

export default Search;
