import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Header from './Header';

function DefaultLayout({ children }) {
    const userLoginData = useSelector((state) => state.persistedReducer.signIn.userLogin);

    const navigateRoute = () => {
        if (userLoginData === null) {
            return <Navigate replace to="/dangnhap" />;
        } else
            return (
                <div className="w-full h-screen overflow-scroll flex ">
                    <div className="w-20 h-screen  flex justify-center ">
                        <Header type="SideBarChat" userLoginData={userLoginData} />
                    </div>
                    <div className="w-full overflow-hidden">{children}</div>
                </div>
            );
    };

    return <>{navigateRoute()}</>;
}
DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
