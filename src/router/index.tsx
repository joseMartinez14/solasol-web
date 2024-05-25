import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Catalog from '../pages/Catalog';
import SignUp from '../components/signup';
import { MyLayout, CompanyLayout } from '../layouts';
import Home from '../pages/Home';
import CompanyHome from '../pages/CompanyHome';
import ProductMaintenance from '../pages/ProductMaintenance';
import SignCompanyUp from '../components/signup/signupCompany';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route element={<MyLayout />}>
                    <Route element={<Home />} path="/" />
                </Route>
                <Route element={<Catalog />} path="/:company_id/catalog" />
                <Route element={<CompanyLayout />}>
                    <Route element={<CompanyHome />} path="/company" />
                    <Route element={<ProductMaintenance />} path="/company/product/:product_id?" />
                </Route>
                <Route element={<SignUp />} path="/signup" />
                <Route element={<SignCompanyUp />} path="/signCompanyUp" />
            </Routes>
        </Router >
    );
};

export default AppRouter;