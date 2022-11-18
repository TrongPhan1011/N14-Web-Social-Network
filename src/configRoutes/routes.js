//level 1
const home = '/';
const friends = '/friends';
const news = '/news';
const notification = '/notification';
const setting = '/setting';
const signUp = '/dangky';
const signIn = '/dangnhap';
const otp = '/otp';
const quenMatKhau = '/quenMatKhau';
const suaMatKhau = '/suaMatKhau';
const call = '/call';
/*
    Level 2
*/
const profile = friends + '/profile';
const thongTinChung = setting + '/thongtinchung';
const doiMatKhau = setting + '/doimatkhau';
const chan = setting + '/chan';

const routes = {
    home: home,
    friends: friends,
    news: news,
    notification: notification,
    setting: setting,
    signUp: signUp,
    signIn: signIn,
    otp: otp,
    quenMatKhau: quenMatKhau,
    suaMatKhau: suaMatKhau,
    // level 2
    profile: profile,
    thongTinChung: thongTinChung,
    doiMatKhau: doiMatKhau,
    chan: chan,
    call: call,
};
export default routes;
