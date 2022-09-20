import classNames from 'classnames';

import GioiThieu from '~/components/GioiThieu';
import CardFriend from '~/components/CardFriend';
import CardImg from '~/components/CardImg';
import Button from '~/components/Button';

const cx = classNames;

function SubProfile({ type, soLuongBan, soLuongAnh }) {
    var Comp = GioiThieu;
    var title = 'Thông tin chung';
    var soLuong = '';
    if (type === 'banbe') {
        Comp = CardFriend;
        title = 'Bạn bè';
        soLuong = `(${soLuongBan})`;
    }
    if (type === 'img') {
        Comp = CardImg;
        title = 'Hình ảnh';
        soLuong = `(${soLuongAnh})`;
    }

    return (
        <div className={cx('w-[300px] h-[324px] bg-white m-3 rounded-2xl flex flex-col justify-center items-center ')}>
            <div className={cx('text-lg font-semibold w-full text-lcn-blue-5 pt-5 flex justify-center h-12')}>
                {title}
                <span>{soLuong}</span>
            </div>
            <div className={cx('h-[228px] w-full')}>
                <Comp />
            </div>
            <Button
                className={cx(
                    'w-full h-[48px] flex justify-center text-[#0662BA] font-semibold hover:bg-lcn-blue-2',
                    'items-center',
                )}
            >
                Xem thêm
            </Button>
        </div>
    );
}

export default SubProfile;
