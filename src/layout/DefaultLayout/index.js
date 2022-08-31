import PropTypes from 'prop-types';

import Header from './Header';
import SideBar from './SideBar';

function DefaultLayout({ children }) {
    return (
        <div className="w-full h-screen overflow-scroll flex ">
            <div className="w-20 h-screen  bg-blue-400 ">
                <Header />
            </div>

            <div className="w-96 h-screen bg-slate-300">
                <SideBar />
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
