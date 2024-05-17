import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Catalog from '../pages/Catalog';
import SignUp from '../components/signup';
import SignIn from '../components/login';
import { MyLayout, CompanyLayout } from '../layouts';
import Home from '../pages/Home';
import PrivateOnlyRoutes from '../layouts/PrivateOnlyRoutes';
import CompanyHome from '../pages/CompanyHome';
import ProductMaintenance from '../pages/ProductMaintenance';
import SignCompanyUp from '../components/signup/signupCompany';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route element={<MyLayout />}>
                    <Route element={<Home />} path="/solasol-web/" />
                </Route>
                <Route element={<Catalog />} path="/solasol-web/:company_id/catalog" />
                <Route element={<CompanyLayout />}>
                    <Route element={<CompanyHome />} path="/solasol-web/company" />
                    <Route element={<ProductMaintenance />} path="/solasol-web/company/product/:product_id?" />
                </Route>
                <Route element={<SignUp />} path="/solasol-web/signup" />
                <Route element={<SignCompanyUp />} path="/solasol-web/signCompanyUp" />
                <Route element={<SignIn />} path="/solasol-web/signin" />
            </Routes>
        </Router >
    );
};

export default AppRouter;