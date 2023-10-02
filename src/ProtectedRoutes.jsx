import LoginPage from "./pages/Login";
import {Navigate, Outlet} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/AuthContext";

const ProtectedRoutes = () => {
    const {user} = useContext(Context);
    return user ? <Outlet /> : <LoginPage />;
};
export default ProtectedRoutes;