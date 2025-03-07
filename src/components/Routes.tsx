import { createRoutesFromElements, Route, RouteObject } from 'react-router-dom';
import NotFoundPage from './404';
import About from './about/About';
import Checklist from './checklist/Checklist';
import Checklists from './checklists/Checklists';
import Home from './home/Home';
import Layout from './Layout';

const Routes = (): RouteObject[] => {
    return createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/sjekklister">
                <Route index element={<Checklists />} />
                <Route path=":slug" element={<Checklist />} />
            </Route>
            <Route path="/om" element={<About />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    );
};

export default Routes;
