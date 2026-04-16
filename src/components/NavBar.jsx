import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import 'primeicons/primeicons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from "react";
import { Link } from 'react-router-dom'

const NavBar = ({ user, setUser, children }) => {  // ← agregar user
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)

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

            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={isOpen} onChange={() => setIsOpen(!isOpen)} />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300">
                        <label htmlFor="my-drawer-4" className=" btn-ghost">
                            {/* Sidebar toggle icon */}
                            {isOpen
                                ? <i className="bi bi-arrow-bar-left text-xl p-2" />
                                : <i className="bi bi-arrow-bar-right text-xl p-2" />
                            }
                        </label>
                        <div className="px-4">APOLONET</div>
                    </nav>
                    {/* Page content here */}
                    <div className="p-4">{children}</div>

                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            {/* List item */}
                            <li>
                                <Link to="/HomePage">
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    {/* Home icon */}
                                    <i className="pi pi-home text-xl" />
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </button>
                                </Link>
                            </li>

                            {/* List item */}
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

