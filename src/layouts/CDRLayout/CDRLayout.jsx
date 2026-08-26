import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { TabMenu } from "primereact/tabmenu";

import React from 'react'

const CDRLayout = ({ user }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        { label: 'Carga de CDR', icon: 'pi pi-download', command: () => navigate('/cdr') },
        { label: 'Registros de CDR', icon: 'pi pi-list-tree', command: () => navigate('/cdr/registros') },
        { label: 'Llamadas entrantes', icon: 'pi pi-arrow-down-left', command: () => navigate('/cdr/llamadas_entrantes') },
        { label: 'Llamadas salientes', icon: 'pi pi-arrow-up-right', command: () => navigate('/cdr/llamadas_salientes') },
        { label: 'Llamadas Apolonet-Apolonet', icon: 'pi pi-phone', command: () => navigate('/cdr/llamadas_apolonet')},
        { label: 'Llamadas no Identificadas', icon: 'pi pi-phone', command: () => navigate('/cdr/llamadas_no_indentificadas')}
    ];

    const activeIndex = location.pathname === '/cdr/registros' ? 1 : 0;

  return (
     <div className="card shadow-sm border-1 surface-border p-4 bg-base-100 rounded-box">
            {/* Cabecera del Módulo */}
            <div className="flex align-items-center justify-content-between mb-4">
                <h2 className="text-xl font-bold ">Call Detail Register</h2>
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
  )
}

export default CDRLayout