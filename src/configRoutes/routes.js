//level 1
const home = '/';
const friends = '/friends';
const news = '/news';
const notification = '/notification';
const setting = '/setting';
const signUp = '/dangky';
const signIn = '/dangnhap';

/*
    Level 2

*/
const profile = friends + '/profile';
const thongTinChung = setting + '/thongTinChung';
const doiMatKhau = setting + '/doiMatKhau';
const chan = setting + '/chan';

const routes = {
    home: home,
    friends: friends,
    news: news,
    notification: notification,
    setting: setting,
    signUp: signUp,
    signIn: signIn,
    // level 2
    profile: profile,
    thongTinChung: thongTinChung,
    doiMatKhau: doiMatKhau,
    chan: chan,
};
export default routes;
