import { useNavigate, Outlet } from "react-router-dom";
import { logoutUser } from "../api/services/authService";
import 'primeicons/primeicons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useTheme } from "../context/theme/ThemeContext";
import useIdleTimer from "../hook/IdleTimer";

/**
 * `PrivateLayout` - El componente de diseño maestro para rutas protegidas.
 * * Este layout centraliza:
 * 1. **Seguridad:** Llama al hook `useIdleTimer` para cerrar sesión tras 30 min de inactividad.
 * 2. **Navegación Lateral:** Implementa un drawer de DaisyUI (sidebar) colapsable.
 * 3. **Gestión de Temas:** Permite alternar entre modo claro y oscuro.
 * 4. **Renderizado Dinámico:** Utiliza `<Outlet />` para mostrar el contenido de las rutas hijas.
 * * @param {Object} props
 * @param {Object} props.user - Datos del usuario autenticado.
 * @param {Function} props.setUser - Función para actualizar el estado global del usuario.
 */
const PrivateLayout = ({ user, setUser }) => {

    /** * Inicializa el temporizador de inactividad para cerrar sesión automáticamente.
     */
    useIdleTimer(setUser);

    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    /** @state {boolean} isOpen - Controla la apertura del sidebar en dispositivos móviles y escritorio. */
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Maneja el proceso de cierre de sesión.
     * Invoca el servicio API, limpia el estado global y redirige al inicio.
     * @async
     */
    const handleLogout = async () => {
        try {
            await logoutUser();
            setUser(null);
            navigate("/");
        } catch (err) {
            console.error("Error al cerrar sesión:", err);
        }
    };

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={isOpen} onChange={() => setIsOpen(!isOpen)} />

            {/* Contenedor del contenido principal */}
            <div className="drawer-content">
                {/* El Outlet es donde se inyectan las páginas (Home, Requisas, etc.) 
                  según la ruta activa en el navegador.
                */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
            {/* Sidebar (Drawer Lateral) */}
            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-65">
                    <ul className="menu w-full grow">
                        {/* Cabecera del Sidebar con botón de colapso */}
                        <nav className="navbar w-full ">
                            <label htmlFor="my-drawer-4" className="btn-ghost">
                                {isOpen
                                    ? <i className="bi bi-arrow-bar-left text-xl p-2" />
                                    : <i className="bi bi-arrow-bar-right text-xl p-2" />
                                }
                            </label>
                        </nav>  

                        {/* Enlaces de Navegación */}
                        <li>
                            <Link to="/home">
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    <i className="pi pi-home text-xl" />
                                    <span className="is-drawer-close:hidden p-2 text-xl">Homepage</span>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cusuario">
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Control Usuario">
                                    <i className="bi bi-shield-lock text-xl" />
                                    <span className="is-drawer-close:hidden p-2 text-xl">Control Usuario</span>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/requisas">
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Requisas">
                                    <i className="bi bi-box-seam text-xl" />
                                    <span className="is-drawer-close:hidden p-2 text-xl">Requisas</span>
                                </button>
                            </Link>
                        </li>
                        
                        {/* Botón de Logout (Anclado al fondo) */}
                        <li className="mt-auto border-t border-base-300">
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 p-4 text-error"
                                data-tip="Cerrar sesión"
                                onClick={handleLogout}>
                                <i className="bi bi-box-arrow-left text-xl"></i>
                                <span className="is-drawer-close:hidden">Cerrar sesión</span>
                            </button>
                        </li>

                        {/* Selector de Tema */}
                        <div>
                            <button className='btn btn-sm' onClick={toggleTheme}>
                                {theme === "ligth" ? "🌙" : "☀️"}
                            </button>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PrivateLayout;