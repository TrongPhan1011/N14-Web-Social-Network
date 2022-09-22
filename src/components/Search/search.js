import classNames from 'classnames';
import { useState, useCallback, memo, useEffect } from 'react';

import { BiEdit, BiSearch } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';

import Button from '~/components/Button';
import Dropdown from '~/components/Dropdown';
import ItemDropdown from '~/components/Dropdown/ItemDropdown';
import Avartar from '~/components/Avartar';
import { useDebounce } from '~/hooks/useDebounce';
import * as userService from '~/services/userService';
import config from '~/configRoutes';
import Modal from '~/components/Modal';
import ItemSearchAll from './ItemSearchAll';
import ModalCreateChat from '~/components/Modal/ModalCreateChat';

const cx = classNames;

function Search() {
    const [showSearch, setShowSearch] = useState(false);
    const [hiddenSearchResult, setHiddenSearchResult] = useState('hidden');
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showCreateChat, setShowCreateChat] = useState(false);

    const [searchValueMore, setSearchValueMore] = useState('');
    const [searchResultMore, setSearchResultMore] = useState([]);

    const valueSearchLess = useDebounce(searchValue, 500);
    const valueSearchMore = useDebounce(searchValueMore, 500);

    useEffect(() => {
        if (!valueSearchLess.trim()) {
            setSearchResult([]);
            return;
        }
        const LIMIT_USER = {
            LESS: 5,
        };

        const fetchSearchLess = async () => {
            const result = await userService.getUserByTextSearch(valueSearchLess, LIMIT_USER.LESS);

            setSearchResult(result);
        };
        fetchSearchLess();
    }, [valueSearchLess]);

    useEffect(() => {
        if (!valueSearchMore.trim()) {
            setSearchResultMore([]);
            return;
        }
        const LIMIT_USER = {
            MORE: 10,
        };
        const fetchSearchMore = async () => {
            const result = await userService.getUserByTextSearch(valueSearchMore, LIMIT_USER.MORE);

            setSearchResultMore(result);
        };
        fetchSearchMore();
    }, [valueSearchMore]);

    const handleHiddenSearch = useCallback(() => {
        setSearchValue('');
        setHiddenSearchResult('hidden');
        setShowSearch(false);
    }, []);

    const handleFocusSearch = () => {
        setHiddenSearchResult('');
        setShowSearch(true);
    };

    const renderData = () => {
        if (searchResult.length === 0) {
            return <div className={cx('w-full flex justify-center text-sm')}>Không tìm thấy kết quả!</div>;
        }

        return searchResult.map((item) => (
            <ItemDropdown key={item.id} className={cx('')} to={config.routeConfig.home + `?id=${item.id}`}>
                <div className={cx('flex break-words items-center justify-start')}>
                    <Avartar src={item.profile.urlAvartar} className={cx('w-8 h-8')} />
                    <div className={cx(' w-40 break-words text-left pl-2 pr-2 text-sm font-medium text-lcn-blue-5')}>
                        {item.fullName}
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

    const handleShowModal = () => {
        handleHiddenSearch();
        setShowModal(true);
    };
    const handleHideModal = () => {
        setShowModal(false);
    };
    const handleKeyUpSearch = (e) => {
        if (e.key === 'Enter') {
            setSearchValueMore(searchValue);

            handleShowModal();
        }
    };
    const handleShowSearchMore = () => {
        return searchResultMore.map((item) => <ItemSearchAll key={item.id} data={item} />);
    };

    const handleShowCreateChat = () => {
        setShowCreateChat(true);
    };
    const handleHideCreateChat = useCallback(() => {
        setShowCreateChat(false);
    }, []);

    return (
        <>
            <div className={cx('p-2 w-full h-full flex justify-between items-center')}>
                <Dropdown render={handleLoadSearchResult} visible={showSearch} hidden={handleHiddenSearch}>
                    <div className={cx('w-52 h-10 flex rounded-3xl  border border-lcn-blue-4 ')}>
                        <input
                            type="text"
                            className={cx('w-full h-full  outline-none rounded-3xl pl-3 pr-2 caret-lcn-blue-4')}
                            placeholder="Tìm kiếm "
                            onFocus={handleFocusSearch}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyUp={handleKeyUpSearch}
                            value={searchValue}
                        />

                        <Button className="bg-lcn-blue-3 flex justify-center items-center" onClick={handleShowModal}>
                            <BiSearch className={cx('text-2xl text-lcn-blue-4')} />
                        </Button>
                    </div>
                </Dropdown>
                <Button
                    className={cx(
                        'w-10 rounded-full m-0 flex justify-center items-center h-10 bg-lcn-blue-3 ',
                        'hover:text-white ',
                    )}
                    onClick={handleShowCreateChat}
                >
                    <BiEdit className={cx('text-2xl text-lcn-blue-4')} />
                </Button>

                <Modal isShow={showModal}>
                    <div className={cx('flex items-center p-1 border-b  border-lcn-blue-1')}>
                        <div className="w-1/3"></div>
                        <p className={cx('w-1/3 text-lg text-lcn-blue-4 font-medium text-center')}>Tìm kiếm bạn bè</p>
                        <div className={cx('w-1/3 flex justify-end')}>
                            <Button
                                className={cx(' text-red-500 hover:text-white hover:bg-red-500')}
                                onClick={handleHideModal}
                            >
                                <FaTimes />
                            </Button>
                        </div>
                    </div>
                    <div className={cx('w-full  items-center flex justify-center p-3')}>
                        <div className={cx('w-full h-10 flex rounded-3xl  border border-lcn-blue-4 ')}>
                            <input
                                type="text"
                                className={cx('w-full h-full  outline-none rounded-3xl pl-3 pr-2 caret-lcn-blue-4')}
                                placeholder="Tìm kiếm người dùng"
                                onChange={(e) => setSearchValueMore(e.target.value)}
                                value={searchValueMore}
                            />
                        </div>
                    </div>
                    <div className={cx('w-full h-3/4  overflow-y-auto p-3')}>{handleShowSearchMore()}</div>
                </Modal>

                <ModalCreateChat showCreateChat={showCreateChat} handleHideCreateChat={handleHideCreateChat} />
            </div>
        </>
    );
}

export default memo(Search);
