import classNames from 'classnames';

import { lcnImage } from '~/image';
import ItemMessage from '~/components/ItemMessage';

const cx = classNames;

function ContentMessage() {
    return (
        <div className={cx('p-5 w-full h-screen overflow-scroll pb-20 pt-20')}>
            <div className={cx('h-3/5 flex flex-col justify-center items-center')}>
                <div
                    className={cx(
                        'w-24 h-24 bg-lcn-blue-4 rounded-full overflow-hidden flex justify-center items-center p-1  ',
                    )}
                >
                    <img src={lcnImage.avatarDefault} alt="avartar" className={cx('w-full h-full border ')} />
                </div>
                <div className={cx('text-lcn-blue-5 font-semibold mt-4')}>Trọng Phan</div>
                <div className={cx('text-slate-500  text-xs mt-2')}>
                    Bạn đã kết nối với <span className="font-semibold">Trọng Phan</span>
                </div>
            </div>
            <div className={cx('w-full   ')}>
                <ItemMessage from="me">
                    testtesttesttesttesttesttestkjhkhkhkhkjkhhkhktesttesttesttestte sttesttesttesttesttesttesttesttest
                    testtesttest testtest test test testtest test test test test
                    testtesttesttesttesttesttesttesttesttest test testtest testtest testtest test test test testtesttest
                </ItemMessage>
                <ItemMessage>
                    est testtesttesttesttesttesttesttesttesttest test testtest testtest testtest test test test
                    testtesttest testtest testtest test test test test test test test test test test
                </ItemMessage>
                <ItemMessage>
                    testtesttesttesttesttesttestkjhkhkhkhkjkhhkhktesttesttesttestte sttesttesttesttesttesttesttesttest
                </ItemMessage>
                <ItemMessage from="me">
                    testtesttesttesttesttesttestkjhkhkhkhkjkhhkhktesttesttesttestte sttesttesttesttesttesttesttesttest
                    testtesttest testtest test test testtest test test test test
                    testtesttesttesttesttesttesttesttesttest test testtest testtest testtest test test test testtesttest
                </ItemMessage>
                <ItemMessage>
                    testtesttesttesttesttesttestkjhkhkhkhkjkhhkhktesttesttesttestte sttesttesttesttesttesttesttesttest
                    testtesttest testtest test test testtest test test test test
                    testtesttesttesttesttesttesttesttesttest test testtest testtest testtest test test test testtesttest
                </ItemMessage>
            </div>
        </div>
    );
}

export default ContentMessage;
