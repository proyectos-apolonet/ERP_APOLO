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

const Badge = ({ label, type }) => {
  if (!label) return null;
  const clase = `badge badge-${label.toLowerCase()}`;
  return <span className={clase}>{label}</span>;
};

const AUTO_RENDERERS = {
  estado: (params) => <Badge label={params.value} />,
  prioridad: (params) => <Badge label={params.value} />,
};

/**
 * `DataGridAg` -- wrapper sobre AG-Grid React con DOS modos:
 *
 * 1) MODO NORMAL (client-side, el de siempre): le pasas `data` con TODAS las
 *    filas ya en memoria (bien para catálogos chicos: PBX, rangos, etc.).
 *
 * 2) MODO SERVIDOR (infinite row model, NUEVO): en vez de `data`, le pasas
 *    `fetchPage` -- una función async que recibe { startRow, endRow } y
 *    devuelve { rows, lastRow }. AG-Grid pide bloques de filas a medida que
 *    el usuario pagina/hace scroll, en vez de traer todo de una vez. Úsalo
 *    para tablas grandes (CDR, con millones de filas).
 *
 *    `lastRow`: si `rows.length` fue menor a lo pedido, ya no hay más datos
 *    -- pásale `startRow + rows.length`. Si sí llenaste el bloque completo y
 *    puede haber más, pásale `-1` (o no lo mandes) para que siga pidiendo.
 *
 * @example Modo servidor
 * <DataGridAg
 *   columns={columnasSalientes}
 *   fetchPage={({ startRow, endRow }) => CDRService.fetchSalientesPagina({ startRow, endRow, fechaInicio, fechaFin })}
 *   pageSize={100}
 * />
 *
 * @param {Object} props
 * @param {ColumnConfig[]} props.columns
 * @param {Array<Object>} [props.data] - Solo modo normal.
 * @param {function} [props.fetchPage] - Solo modo servidor: ({startRow, endRow}) => Promise<{rows, lastRow}>
 * @param {number} [props.pageSize=50]
 * @returns {JSX.Element}
 */
const DataGridAg = ({ columns, data, fetchPage, pageSize = 50 }) => {

  const columnDefs = useMemo(() => {
    if (!columns) return [];
    return columns.map(col => ({
      field: col.field,
      headerName: col.header,
      sortable: col.sortable ?? true,
      // El filtro nativo de columna de AG-Grid solo sirve en modo cliente
      // (data): filtra sobre lo que ya está cargado en memoria. En modo
      // servidor (fetchPage) el datasource no implementa filterModel, así
      // que ese filtro parecía "no hacer nada" -- se desactiva ahí y el
      // filtrado real lo hacen los <select> que arma cada página, contra
      // la base de datos.
      filter: fetchPage ? false : true,
      hide: col.hide ?? false,
      editable: col.editable ?? false,
      pinned: col.frozen === "left" ? "left" : undefined,
      width: col.width,
      cellRenderer: col.render
        ? (params) => col.render(params.data)
        : AUTO_RENDERERS[col.field] ?? undefined,
    }));
  }, [columns, !!fetchPage]);

  // MODO SERVIDOR: arma el "datasource" que AG-Grid usa para pedir bloques
  // de filas. Se recalcula si cambia fetchPage (por ejemplo, si cambian las
  // fechas del filtro -- pásale una función nueva cada vez que cambien los
  // filtros para que el grid vuelva a pedir desde cero).
  const datasource = useMemo(() => {
    if (!fetchPage) return null;
    return {
      getRows: async (params) => {
        const { startRow, endRow, successCallback, failCallback } = params;
        try {
          const { rows, lastRow } = await fetchPage({ startRow, endRow });
          successCallback(rows ?? [], lastRow ?? -1);
        } catch (err) {
          console.error("Error cargando datos del grid", err);
          failCallback();
        }
      },
    };
  }, [fetchPage]);

  if (fetchPage) {
    return (
      <div className="ag-theme-quartz mi-grid">
        <AgGridReact
          key={datasource} // fuerza recarga limpia cuando cambia fetchPage (ej: cambio de filtro de fechas)
          columnDefs={columnDefs}
          rowModelType="infinite"
          datasource={datasource}
          cacheBlockSize={pageSize}
          paginationPageSize={pageSize}
          pagination={true}
          animateRows={true}
          theme="legacy"
          defaultColDef={{
            resizable: true,
          }}
        />
      </div>
    );
  }

  return (
    <div className="ag-theme-quartz mi-grid">
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={pageSize}
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