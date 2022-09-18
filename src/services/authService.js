import { loginSuccess, loginErorr } from '~/redux/Slice/authSlice';
import * as httpRequest from '~/utils/httpRequest';

export const loginUser = async (user, dispatch, navigate) => {
    try {
        //  const res = await httpRequest.get('auth/',  user);

        dispatch(loginSuccess(user)); // lưu lại user

        // return res;
    } catch (error) {
        dispatch(loginErorr());
    }
};
