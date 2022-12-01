import classNames from 'classnames';
import { useState, useCallback, memo, useEffect } from 'react';

import { BiSearch } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';

import Button from '~/components/Button';
import Dropdown from '~/components/Dropdown';

import { useDebounce } from '~/hooks/useDebounce';
import * as userService from '~/services/userService';

import Modal from '~/components/Modal';

import AddGroupChat from '~/components/AddGroupChat';
import { useDispatch, useSelector } from 'react-redux';
import { getAxiosJWT } from '~/utils/httpConfigRefreshToken';
import ItemSearchMini from './ItemSearchMini';

const cx = classNames;

function Search() {
    const dispatch = useDispatch();
    var currAuth = useSelector((state) => state.persistedReducer.auth);
    var currAccount = currAuth.currentUser;
    var accessToken = currAccount.accessToken;
    var axiosJWT = getAxiosJWT(dispatch, currAccount);

    var curChat = useSelector((state) => state.sidebarChatSlice.currentChat);

    var curSignIn = useSelector((state) => state.persistedReducer.signIn);
    var curUser = curSignIn.userLogin;

    const [showSearch, setShowSearch] = useState(false);
    const [hiddenSearchResult, setHiddenSearchResult] = useState('hidden');
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchButton, setSearchButton] = useState('friend');

    const [limitValue, setLimitValue] = useState(10);

    const valueSearch = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!valueSearch.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchSearch = async () => {
            let result = await userService.getUserByTextSearch(
                curUser.id,
                valueSearch,
                limitValue,
                accessToken,
                axiosJWT,
            );

            let listResult = [];
            if (searchButton === 'friend') {
                // loc ban be bang filter
                listResult = result.users.filter((user) => {
                    // chay some de check object trong mang ban be

                    return curUser.friend.some((friend) => friend.id === user.id && friend.status === 1);
                });
            } else if (searchButton === 'group') {
                listResult = result.groups;
            } else if (searchButton === 'other') {
                listResult = result.users.filter((user) => {
                    // chay some de check object trong mang khong phai la ban be

                    return !curUser.friend.some((friend) => friend.id === user.id && friend.status === 1);
                });
            }

            setSearchResult(listResult);
        };
        fetchSearch();
    }, [valueSearch, limitValue, searchButton]);

    const handleHiddenSearch = useCallback(() => {
        setHiddenSearchResult('hidden');
        setSearchButton('friend');
        setLimitValue(10);
        setShowSearch(false);
    }, []);

    const handleFocusSearch = () => {
        setHiddenSearchResult('');
        setShowSearch(true);
    };

    const renderData = (searchMore) => {
        if (searchResult.length === 0) {
            return (
                <>
                    <div className={cx('w-full flex justify-center text-sm')}>Không tìm thấy kết quả!</div>
                </>
            );
        }

        if (searchMore) {
            return searchResult.map((item) => (
                <ItemSearchMini
                    type={searchButton}
                    key={item.id}
                    itemData={item}
                    accessToken={accessToken}
                    axiosJWT={axiosJWT}
                    curChat={curChat}
                    curUser={curUser}
                    searchMore={searchMore}
                    hidden={handleHideModal}
                />
            ));
        } else
            return searchResult.map((item) => (
                <ItemSearchMini
                    type={searchButton}
                    key={item.id}
                    itemData={item}
                    accessToken={accessToken}
                    axiosJWT={axiosJWT}
                    curChat={curChat}
                    curUser={curUser}
                    searchMore={searchMore}
                    hidden={handleHiddenSearch}
                />
            ));
    };
    const handleLoadSearchResult = (attrs) => {
        return (
            <div
                className={cx('w-52 bg-white border border-lcn-blue-2 rounded-lg shadow-lg p-2 ', hiddenSearchResult)}
                tabIndex="-1"
                {...attrs}
            >
                <div className={cx('text-xs font-semibold flex flex-wrap border-b border-lcn-blue-2 mb-2')}>
                    <Button
                        className={
                            searchButton === 'friend'
                                ? cx('bg-lcn-blue-2 text-lcn-blue-4 pr-2 pl-2 ')
                                : cx('bg-gray-300 text-white pr-2 pl-2 ')
                        }
                        onClick={() => setSearchButton('friend')}
                    >
                        Bạn bè
                    </Button>
                    <Button
                        className={
                            searchButton === 'group'
                                ? cx('bg-lcn-blue-2 text-lcn-blue-4 pr-2 pl-2 ')
                                : cx('bg-gray-300 text-white pr-2 pl-2 ')
                        }
                        onClick={() => setSearchButton('group')}
                    >
                        Nhóm
                    </Button>
                    <Button
                        className={
                            searchButton === 'other'
                                ? cx('bg-lcn-blue-2 text-lcn-blue-4 pr-2 pl-2 ')
                                : cx('bg-gray-300 text-white pr-2 pl-2 ')
                        }
                        onClick={() => setSearchButton('other')}
                    >
                        Người dùng khác
                    </Button>
                </div>
                {renderData(false)}
            </div>
        );
    };

    const handleShowModal = () => {
        handleHiddenSearch();
        setShowModal(true);
    };
    var handleHideModal = () => {
        setLimitValue(10);
        setShowModal(false);
    };
    const handleKeyUpSearch = (e) => {
        if (e.key === 'Enter') {
            setLimitValue(25);

            handleShowModal();
        }
    };

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
                        />

                        <Button className="bg-lcn-blue-3 flex justify-center items-center" onClick={handleShowModal}>
                            <BiSearch className={cx('text-2xl text-lcn-blue-4')} />
                        </Button>
                    </div>
                </Dropdown>
                <AddGroupChat accessToken={accessToken} axiosJWT={axiosJWT} curChat={curChat} curUser={curUser} />

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
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('w-full h-3/4  overflow-y-auto p-3')}>
                        <div className={cx('text-xs font-semibold flex flex-wrap border-b border-lcn-blue-2 mb-2')}>
                            <Button
                                className={
                                    searchButton === 'friend'
                                        ? cx('bg-lcn-blue-2 text-lcn-blue-4 pr-2 pl-2 ')
                                        : cx('bg-gray-300 text-white pr-2 pl-2 ')
                                }
                                onClick={() => setSearchButton('friend')}
                            >
                                Bạn bè
                            </Button>
                            <Button
                                className={
                                    searchButton === 'group'
                                        ? cx('bg-lcn-blue-2 text-lcn-blue-4 pr-2 pl-2 ')
                                        : cx('bg-gray-300 text-white pr-2 pl-2 ')
                                }
                                onClick={() => setSearchButton('group')}
                            >
                                Nhóm
                            </Button>
                            <Button
                                className={
                                    searchButton === 'other'
                                        ? cx('bg-lcn-blue-2 text-lcn-blue-4 pr-2 pl-2 ')
                                        : cx('bg-gray-300 text-white pr-2 pl-2 ')
                                }
                                onClick={() => setSearchButton('other')}
                            >
                                Người dùng khác
                            </Button>
                        </div>
                        {renderData(true)}
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default memo(Search);
