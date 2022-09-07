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
};
export default routes;
