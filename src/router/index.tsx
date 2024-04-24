import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import React, { useMemo, useState } from 'react';
import DisplayMessage from '../pages/DisplayMessage';
import Catalog from '../pages/Catalog';
import SignUp from '../components/signup';
import SignIn from '../components/login';
import { VisitorLayout, MyLayout, CompanyLayout } from '../layouts';
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
                    <Route element={<Home />} path="/" />
                </Route>
                <Route element={<VisitorLayout />}>
                    <Route element={<DisplayMessage />} path="/kims_party" />
                    <Route element={<Catalog />} path="/catalog" />
                </Route>
                <Route element={<PrivateOnlyRoutes />}>
                    <Route element={<CompanyLayout />}>
                        <Route element={<CompanyHome />} path="/company" />
                        <Route element={<ProductMaintenance />} path="/company/product/:product_id?" />
                    </Route>
                </Route>
                <Route element={<SignUp />} path="/signup" />
                <Route element={<SignCompanyUp />} path="/signCompanyUp" />
                <Route element={<SignIn />} path="/signin" />
            </Routes>
        </Router >
    );
};

export default AppRouter;