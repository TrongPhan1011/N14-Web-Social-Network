import classNames from 'classnames';

import HeaderNews from '~/components/HeaderNews';
import CreatePost from '~/components/CreatePost';
import Post from '~/components/Post';

const cx = classNames;
function ContentNews() {
    return (
        <div className={cx(' w-full  overflow-hidden ')}>
            <HeaderNews />
            <div className="overflow-y-scroll h-screen bg-white bg-opacity-70 drop-shadow-md">
                <div className={cx('w-full  flex flex-col items-center justify-center  overflow-y-scroll p-5 pb-20')}>
                    <CreatePost />
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>
        </div>
    );
}

export default ContentNews;
