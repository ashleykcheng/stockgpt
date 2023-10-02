import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import LoginPage from './pages/Login';
import SignUpPage from './pages/Signup';
import App from './pages/App';
import SearchPage from './pages/Search';
import TradePage from './pages/Trade';
import ProtectedRoutes from './ProtectedRoutes';
import { AuthContext } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContext>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route element = {<ProtectedRoutes/>}>
                    <Route path="/dashboard" element={<DashboardPage />}/>
                    <Route path="/trade" element={<TradePage />}/>
                </Route>
                <Route path="/search" element={<SearchPage />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/signup" element={<SignUpPage />}/>
            </Routes>
        </BrowserRouter>
    </AuthContext>
);