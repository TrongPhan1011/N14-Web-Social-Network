import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { Fragment } from 'react';
import { DefaultLayout } from './layout';
import Page404 from '~/pages/Page404';
function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    let Layout = DefaultLayout;
                    if (route.layout) Layout = route.layout;
                    else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                <Route path="*" element={<Page404 />} />
            </Routes>
        </Router>
    );
}

export default App;
