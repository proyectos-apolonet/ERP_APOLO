import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "../../css/AgGrid.css";   // ← tu CSS personalizado

ModuleRegistry.registerModules([AllCommunityModule]);

/**
 * @typedef {Object} ColumnConfig
 * @property {string} field - Nombre del campo en el set de datos.
 * @property {string} header - Etiqueta a mostrar en el encabezado de la columna.
 * @property {boolean} [sortable=true] - Define si la columna permite ordenamiento.
 * @property {boolean} [hide=false] - Define si la columna está oculta por defecto.
 * @property {boolean} [editable=false] - Permite la edición de celdas.
 * @property {('left'|undefined)} [frozen] - Si es 'left', ancla la columna a la izquierda.
 * @property {number} [width] - Ancho fijo de la columna en píxeles.
 * @property {function} [render] - Función personalizada: (data) => ReactNode. Recibe el objeto de la fila.
 */

/**
 * Componente interno para renderizar etiquetas de estado/prioridad.
 * @private
 */

const Badge = ({ label, type }) => {
  if (!label) return null;
  const clase = `badge badge-${label.toLowerCase()}`;
  return <span className={clase}>{label}</span>;
};

/**
 * Diccionario de renderizado automático basado en el nombre del campo (field).
 * @constant
 */
const AUTO_RENDERERS = {
  estado: (params) => <Badge label={params.value} />,
  prioridad: (params) => <Badge label={params.value} />,
};

 /**
 * `DataGridAg` es un wrapper personalizado sobre AG-Grid React.
 * * Ofrece soporte nativo para:
 * - Renderizado automático de Badges (campos 'estado' y 'prioridad').
 * - Configuración simplificada de columnas mediante una interfaz personalizada.
 * - Paginación y filtrado configurados por defecto.
 * * @example
 * <DataGridAg 
 * columns={[{ field: 'nombre', header: 'Nombre' }, { field: 'estado', header: 'Status' }]} 
 * data={usuarios} 
 * />
 * * @param {Object} props
 * @param {ColumnConfig[]} props.columns - Configuración de columnas para la tabla.
 * @param {Array<Object>} props.data - Array de objetos con la información de las filas.
 * @returns {JSX.Element}
  */
const DataGridAg = ({ columns, data }) => {

  /**
   * Mapea la configuración personalizada de 'columns' al formato interno de AG-Grid.
   * Utiliza useMemo para evitar cálculos innecesarios en cada re-render.
   */
  const columnDefs = useMemo(() => {
    if (!columns) return [];
    return columns.map(col => ({
      field: col.field,
      headerName: col.header,
      sortable: col.sortable ?? true,
      filter: true,
      hide: col.hide ?? false,
      editable: col.editable ?? false,
      pinned: col.frozen === "left" ? "left" : undefined,
      width: col.width,
      // Lógica de renderizado: personalizada > automática > defecto
      cellRenderer: col.render
        ? (params) => col.render(params.data)
        : AUTO_RENDERERS[col.field] ?? undefined,
    }));
  }, [columns]);

  return (
    <div className="ag-theme-quartz mi-grid">
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={50}
        animateRows={true}
        theme="legacy"
        defaultColDef={{
          resizable: true,
        }}
      />
    </div>
  );
};

export default DataGridAg;