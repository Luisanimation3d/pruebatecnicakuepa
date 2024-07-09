import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.jsx";
import {ClassView} from "./views/ClassView/ClassView.jsx";
import {LoginView} from "./views/LoginView/LoginView.jsx";
import {ProtectedRoutes} from "./ProtectedRoutes/ProtectedRoutes.jsx";
import {RegisterView} from "./views/RegisterView/RegisterView.jsx";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={"/user/"} element={<ProtectedRoutes/>}>
                        <Route path="class" element={<ClassView/>}/>
                    </Route>
                    <Route path="/" element={<LoginView/>}/>
                    <Route path="/register" element={<RegisterView/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>

    );
}