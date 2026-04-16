import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { TabMenu } from 'primereact/tabmenu';

const RequisaLayout = ({ user }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Opciones del submenú
    const items = [
        { label: 'Nueva Requisa', icon: 'pi pi-plus', command: () => navigate('/requisas') },
        { label: 'Historial', icon: 'pi pi-history', command: () => navigate('/requisas/historial') },
        { label: 'Confirmacion', icon: 'pi pi-check-square', command: () => navigate('/requisas/confirmacion')}
    ];

    // Sincroniza la pestaña activa con la URL actual
    const activeIndex = location.pathname === '/requisas/historial' ? 1 : 0;

    return (
        <div className="card shadow-sm border-1 surface-border p-4 bg-base-100 rounded-box">
            <div className="flex align-items-center justify-content-between mb-4">
                <h2 className="text-xl font-bold ">Gestión de Requisas</h2>
            </div>

            {/* Navegación interna del módulo */}
            <TabMenu model={items} activeIndex={activeIndex} className="mb-4" />

            {/* Renderiza RequisaPage o RequisaHistorial */}
            <div className="p-2">
                <Outlet context={{ user }} />
            </div>
        </div>
    );
};

export default RequisaLayout;