import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "../../css/AgGrid.css";   // ← tu CSS personalizado

ModuleRegistry.registerModules([AllCommunityModule]);

// ── Badges ────────────────────────────────────────────────────
const Badge = ({ label, type }) => {
  if (!label) return null;
  const clase = `badge badge-${label.toLowerCase()}`;
  return <span className={clase}>{label}</span>;
};

const AUTO_RENDERERS = {
  estado:    (params) => <Badge label={params.value} />,
  prioridad: (params) => <Badge label={params.value} />,
};

// ── Componente ────────────────────────────────────────────────
const DataGridAg = ({ columns, data }) => {

  const columnDefs = useMemo(() => { 
    if(!columns) return [];
    return columns.map(col => ({
      field: col.field,
      headerName: col.header,
      sortable: col.sortable ?? true,
      filter: true,
      hide: col.hide ?? false,
      editable: col.editable ?? false,
      pinned: col.frozen === "left" ? "left" : undefined,
      width: col.width,
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