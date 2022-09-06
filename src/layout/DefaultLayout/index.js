import PropTypes from 'prop-types';

import Header from './Header';

function DefaultLayout({ children }) {
    return (
        <div className="w-full h-screen overflow-scroll flex ">
            <div className="w-20 h-screen  flex justify-center ">
                <Header type="SideBarChat" />
            </div>
            <div className="w-full overflow-hidden">{children}</div>
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
