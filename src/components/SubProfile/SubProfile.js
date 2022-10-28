import classNames from 'classnames';

import GioiThieu from '~/components/GioiThieu';
import CardFriend from '~/components/CardFriend';
import CardImg from '~/components/CardImg';
import Button from '~/components/Button';

const cx = classNames;

function SubProfile({ type, soLuongBan, soLuongAnh, data, profile, birthday }) {
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
    const renderSubProfile = () => {
        if (Comp === GioiThieu) {
            return renderSubGioiThieu();
        } else if (Comp === CardFriend) {
            return renderSubBanBe();
        } else if (Comp === CardImg) {
            return renderSubHinhAnh();
        }
    };
    const renderSubGioiThieu = () => {
        return (
            <Comp
                gender={data.gender}
                birthday={birthday}
                education={profile.education}
                phoneNumber={data.phoneNumber}
            />
        );
    };
    const renderSubBanBe = () => {
        return <Comp />;
    };
    const renderSubHinhAnh = () => {
        return <Comp />;
    };
    return (
        <div className={cx('w-[300px] h-[324px] bg-white m-3 rounded-2xl flex flex-col justify-center items-center ')}>
            <div className={cx('text-lg font-semibold w-full text-lcn-blue-5 pt-5 flex justify-center h-12')}>
                {title}
                <span>{soLuong}</span>
            </div>
            <div className={cx('h-[228px] w-full')}>{renderSubProfile()}</div>
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
