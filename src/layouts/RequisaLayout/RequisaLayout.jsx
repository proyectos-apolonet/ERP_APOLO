import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { TabMenu } from 'primereact/tabmenu';

/**
 * `RequisaLayout` - Layout especializado para el módulo de Gestión de Requisas.
 * * Este componente actúa como un contenedor para las sub-rutas de requisas. 
 * Implementa una navegación por pestañas (TabMenu) que se mantiene sincronizada 
 * con la ruta actual de la aplicación.
 * * @example
 * // En la configuración de rutas (App.js)
 * <Route path="/requisas" element={<RequisaLayout user={user} />}>
 * <Route index element={<RequisaPage />} />
 * <Route path="historial" element={<RequisaHistorial />} />
 * </Route>
 * * @param {Object} props
 * @param {Object} props.user - Objeto del usuario autenticado, pasado a las rutas hijas vía Outlet Context.
 */
const RequisaLayout = ({ user }) => {
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Definición de las opciones del submenú de pestañas.
     * Cada ítem utiliza el hook `Maps` para cambiar la ruta de forma programática.
     * @type {Array<{label: string, icon: string, command: function}>}
     */
    const items = [
        { label: 'Nueva Requisa', icon: 'pi pi-plus', command: () => navigate('/requisas') },
        { label: 'Historial', icon: 'pi pi-history', command: () => navigate('/requisas/historial') },
        { label: 'Confirmacion', icon: 'pi pi-check-square', command: () => navigate('/requisas/confirmacion')}
    ];

    /**
     * Sincronización de la pestaña activa.
     * Determina el índice basándose en el pathname actual para que la UI 
     * refleje correctamente la ubicación del usuario, incluso tras recargar la página.
     * @constant {number}
     */
    const activeIndex = location.pathname === '/requisas/historial' ? 1 : 0;

    return (
        <div className="card shadow-sm border-1 surface-border p-4 bg-base-100 rounded-box">
            {/* Cabecera del Módulo */}
            <div className="flex align-items-center justify-content-between mb-4">
                <h2 className="text-xl font-bold ">Gestión de Requisas</h2>
            </div>

            {/* Navegación interna del módulo */}
            <TabMenu model={items} activeIndex={activeIndex} className="mb-4" />

            {/* Renderizado Dinámico de Sub-rutas:
                El componente 'Outlet' inyecta aquí la vista correspondiente (RequisaPage, Historial, etc.).
                Se utiliza 'context' para heredar los datos del usuario hacia abajo en la jerarquía.
            */}
            <div className="p-2">
                <Outlet context={{ user }} />
            </div>
        </div>
    );
};

export default RequisaLayout;