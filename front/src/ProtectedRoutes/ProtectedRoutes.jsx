import {Outlet, Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

export function ProtectedRoutes() {
    const {isAuthenticated} = useAuth();

    if(!isAuthenticated) {
        return <Navigate to='/'/>
    }

    return (
        <Outlet/>
    );
}