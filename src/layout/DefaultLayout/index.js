import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Header from './Header';

function DefaultLayout({ children }) {
    const userLoginData = useSelector((state) => state.persistedReducer.signIn.userLogin);
    return (
        <div className="w-full h-screen overflow-scroll flex ">
            <div className="w-20 h-screen  flex justify-center ">
                <Header type="SideBarChat" userLoginData={userLoginData} />
            </div>
            <div className="w-full overflow-hidden">{children}</div>
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
