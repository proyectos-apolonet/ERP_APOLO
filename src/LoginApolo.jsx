import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import PrivateLayout from "./layouts/PrivateLayout";  // ← nuevo
import HomePage from "./pages/HomePage";
import ControlUsuario from "./pages/ControlUsuario";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { getMe } from "../src/api/services/authService";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import RequisaPage from "./pages/Requisas/RequisaPrincipal/RequisaPage";
import RequisaHistorial from "./pages/Requisas/RequisaHistorial/RequisaHistorial";
import RequisaLayout from "./layouts/RequisaLayout/RequisaLayout";
import ConfirmacionRequisa from "./pages/Requisas/RequisaHistorial/ConfirmacionRequisa";

export const LoginApolo = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const tempoMe = await getMe();
                setUser(tempoMe);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <Router>
            <Routes>
                {/* Rutas públicas — sin navbar */}
                <Route path="/" element={
                    <PublicRoute user={user} loading={loading}>
                        <LoginPage setUser={setUser} />
                    </PublicRoute>
                }/>
                <Route path="/register" element={
                    <PublicRoute user={user} loading={loading}>
                        <RegisterPage />
                    </PublicRoute>
                }/>

                {/* Rutas privadas — con layout */}
                <Route element={
                    <PrivateRoute user={user} loading={loading}>
                        <PrivateLayout user={user} setUser={setUser} />
                    </PrivateRoute>
                }>
                    <Route path="/home" element={<HomePage user={user} />} />
                    <Route path="/cusuario" element={<ControlUsuario user={user} />} />

                    <Route path="/requisas" element={<RequisaLayout user={user} />} >
                        <Route index element={<RequisaPage user={user} />} />
                        <Route path="historial" element={<RequisaHistorial user={user} />} />
                         <Route path="confirmacion" element={<ConfirmacionRequisa user={user} />} />
                    </Route>    
                    {/* Aquí agregas más páginas en el futuro */}
                </Route>
            </Routes>
        </Router>
    );
};

export default LoginApolo;