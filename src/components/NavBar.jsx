import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import 'primeicons/primeicons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react";
import { Link } from 'react-router-dom'

/**
 * `NavBar` - Componente de navegación principal (Layout) con Sidebar persistente.
 * * Este componente implementa un "Drawer" responsivo de DaisyUI que actúa como contenedor
 * maestro de la aplicación. Maneja el estado de la sesión y la navegación lateral.
 * * @example
 * <NavBar user={usuario} setUser={setUsuario}>
 * <MisRutas />
 * </NavBar>
 * * @param {Object} props
 * @param {Object} props.user - Objeto del usuario actualmente autenticado.
 * @param {Function} props.setUser - Función para actualizar el estado global del usuario (ej: para cerrar sesión).
 * @param {React.ReactNode} props.children - Contenido principal que se renderizará dentro del área de trabajo.
 */
const NavBar = ({ user, setUser, children }) => {  // ← agregar user
    const navigate = useNavigate();
    /**
     * @state {boolean} isOpen - Controla si el sidebar (drawer) está expandido o colapsado.
     */
    const [isOpen, setIsOpen] = useState(false)

    /**
     * Ejecuta el proceso de cierre de sesión.
     * Llama al servicio de autenticación, limpia el estado local y redirige al login.
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
        <>
            {/* Contenedor principal del Drawer: 'lg:drawer-open' lo mantiene abierto en pantallas grandes */}
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
                {/* Contenido Principal de la Página */}
                <div className="drawer-content">
                   {/* Barra Superior (Navbar) */}
                    <nav className="navbar w-full bg-base-300">
                        <label htmlFor="my-drawer-4" className=" btn-ghost">
                           {/* Icono dinámico según el estado del sidebar */}
                            {isOpen
                                ? <i className="bi bi-arrow-bar-left text-xl p-2" />
                                : <i className="bi bi-arrow-bar-right text-xl p-2" />
                            }
                        </label>
                        <div className="px-4">APOLONET</div>
                    </nav>
                 {/* Área de Inyección de Contenido (Children) */}
                    <div className="p-4">{children}</div>

                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                       {/* Lateral (Sidebar) */}
                        <ul className="menu w-full grow">
                           {/* Lista de Navegación */}
                            <li>
                                <Link to="/HomePage">
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    {/* Ítem: Homepage */}
                                    <i className="pi pi-home text-xl" />
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </button>
                                </Link>
                            </li>

                            {/* Ítem: Cerrar Sesión (Anclado al fondo con mt-auto) */}
                            <li className="mt-auto border-t border-base-300">
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 p-4 text-error"
                                    data-tip="Cerrar sesión"
                                    onClick={handleLogout}>
                                    {/* Settings icon */}
                                    <i class="bi bi-box-arrow-left text-xl"></i>
                                    <span className="is-drawer-close:hidden">Cerrar sesión</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    );
};

export default NavBar;

