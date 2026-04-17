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

/**
 * @file LoginApolo.jsx
 * @description Root Router de la aplicación Apolonet.
 * Gestiona el estado global de autenticación, la protección de rutas y
 * la estructura de layouts anidados (Nested Routing).
 */

/**
 * `LoginApolo` - Orquestador de Rutas y Sesión.
 * * Características:
 * - Persistencia de sesión: Valida el token al cargar mediante `getMe`.
 * - Guardias de Navegación: Utiliza `PrivateRoute` y `PublicRoute`.
 * - Layouts Anidados: Mantiene el Sidebar/Navbar en rutas privadas y pestañas en Requisas.
 * * @returns {JSX.Element} El árbol de rutas configurado.
 */
export const LoginApolo = () => {

    /** * Estado global del usuario autenticado. */
    const [user, setUser] = useState(null);

    /** * Estado de carga inicial para evitar parpadeos de redirección (FOUC). */
    const [loading, setLoading] = useState(true);

    /**
     * Ciclo de vida de inicialización.
     * Al montar la App, verifica si existe una sesión activa en el servidor/cookies.
     */
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Intentamos obtener el perfil del usuario actual
                const tempoMe = await getMe();
                setUser(tempoMe);
            } catch (err) {
                // Si el token es inválido o no existe, el usuario es nulo
                setUser(null);
            } finally {
                // Finalizamos el estado de carga independientemente del resultado
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Mientras se valida la sesión, mostramos una pantalla de carga
    if (loading) return <div>Loading...</div>;

    return (
        <Router>
            <Routes>

                {/* -----------------------------------------------------------
                    ZONA PÚBLICA: Accesible solo si NO hay sesión activa
                   ----------------------------------------------------------- */}
                <Route path="/" element={
                    <PublicRoute user={user} loading={loading}>
                        <LoginPage setUser={setUser} />
                    </PublicRoute>
                } />
                <Route path="/register" element={
                    <PublicRoute user={user} loading={loading}>
                        <RegisterPage />
                    </PublicRoute>
                } />

                {/* -----------------------------------------------------------
                    ZONA PRIVADA: Requiere autenticación
                    Se envuelve en PrivateLayout para mostrar Sidebar y Navbar
                   ----------------------------------------------------------- */}
                <Route element={
                    <PrivateRoute user={user} loading={loading}>
                        <PrivateLayout user={user} setUser={setUser} />
                    </PrivateRoute>
                }>
                    {/* Dashboard Principal */}
                    <Route path="/home" element={<HomePage user={user} />} />
                    {/* Perfil y Control de Usuarios */}
                    <Route path="/cusuario" element={<ControlUsuario user={user} />} />

                    {/* MÓDULO DE REQUISAS: Layout anidado con pestañas internas */}
                    <Route path="/requisas" element={<RequisaLayout user={user} />} >
                        {/* /requisas (Pestaña por defecto) */}
                        <Route index element={<RequisaPage user={user} />} />
                        {/* /requisas/historial */}
                        <Route path="historial" element={<RequisaHistorial user={user} />} />
                        {/* /requisas/confirmacion */}
                        <Route path="confirmacion" element={<ConfirmacionRequisa user={user} />} />
                    </Route>
                    {/* Aquí agregas más páginas en el futuro */}
                </Route>
            </Routes>
        </Router>
    );
};

export default LoginApolo;