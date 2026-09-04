import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { TabMenu } from "primereact/tabmenu";

import React from 'react'

const PbxLayout = ({ user }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        { label: 'PBX', icon: 'pi pi-list', command: () => navigate('/pbx') },
    ];

    const activeIndex = location.pathname === '/rangos' ? 1 : 0;

  return (
     <div className="card shadow-sm border-1 surface-border p-4 bg-base-100 rounded-box">
            {/* Cabecera del Módulo */}
            <div className="flex align-items-center justify-content-between mb-4">
                <h2 className="text-xl font-bold ">PBX</h2>
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

export default PbxLayout