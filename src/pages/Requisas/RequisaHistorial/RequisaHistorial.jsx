import React from 'react'
import DataGridAg from '../../../components/AgGrid/DataAgGrid'

const RequisaHistorial = () => {

  const columns = [
    { field: "id",            header: "#",              frozen: "left", width: 70  },
    { field: "requisa",       header: "Requisa",        frozen: "left", width: 130 },
    { field: "fechaRequisa",  header: "Fecha Requisa"  },
    { field: "fechaCreacion", header: "Fecha Creación" },
    { field: "solicitante",   header: "Solicitante"    },
    { field: "departamento",  header: "Departamento"   },
    { field: "estado",        header: "Estado"         }, // badge automático
    { field: "prioridad",     header: "Prioridad"      }, // badge automático
    { field: "producto",      header: "Producto"       },
    { field: "cantidad",      header: "Cantidad"       },
    { field: "stock",         header: "Stock"          },
    { field: "costo",         header: "Costo"          },
  ];

  const data = [
    {
      id: 1, requisa: "REQ-001", fechaRequisa: "2026-04-01", fechaCreacion: "2026-04-01",
      solicitante: "Mauricio", departamento: "Sistemas", estado: "Pendiente",
      prioridad: "Alta", producto: "Laptop", cantidad: 2, stock: 5, costo: "$1,000",
    },
    {
      id: 2, requisa: "REQ-002", fechaRequisa: "2026-04-02", fechaCreacion: "2026-04-02",
      solicitante: "Juan", departamento: "Compras", estado: "Aprobado",
      prioridad: "Media", producto: "Mouse", cantidad: 10, stock: 50, costo: "$200",
    },
  ];

  return (
    <div style={{ padding: "24px", background: "#1e3a5f", minHeight: "100vh" }}>
      <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#FF6D1F", marginBottom: "16px" }}>
        Historial de Requisas
      </h2>
      <DataGridAg columns={columns} data={data} />
    </div>
  );
};

export default RequisaHistorial;