import React from 'react'
import DataGridAg from '../../../components/AgGrid/DataAgGrid';
import { useConfirm } from '../../../context/ConfirmDialog/ConfirmDialogContext';
 
const ConfirmacionRequisa = () => {

    const { confirmDelete, confirmSave } = useConfirm();

    // Definimos el renderizador dentro o fuera del componente
  const AccionesRenderer = (params) => (
    <div className="flex justify-center items-center h-full">
      <button 
        onClick={() => console.log("Confirmar ID:", params.data.id)}
        className="btn btn-secondary btn-xl"
      >
        Aprobar
      </button>
    </div>
  );

     const columns = [
    { field: "id",            header: "#",              frozen: "left", width: 70, hide: true  },
    { field: "requisa",       header: "Requisa",        frozen: "left", width: 130, },
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
    { field: "id", header: "Acciones", width: 150, frozen: "right", render: (data) => (
    <div className="flex justify-center items-center h-full gap-5">
      <button
        onClick={() => confirmSave({
          message: "¿Guardar los cambios?",
          onAccept: () => console.log("Requisa Confirmada")
        })}
        className="btn btn-success btn-sm tooltip tooltip-right" data-tip="Confirmar"
      >
        <i className="bi bi-check-lg gap-2 mb-1 "></i>
      </button>
      <button
        onClick={() => confirmDelete({
          message: "¿Cancelar Requisa?",
          onAccept: () => console.log("Cancelado")
        })}
        className="btn btn-error btn-sm tooltip tooltip-left" data-tip="Cancel"
      >
        <i className="bi bi-x-lg "></i>
      </button>
    </div>
  )
},
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
        Confirmacion Requisas Jefe Departamento
      </h2>
      <DataGridAg columns={columns} data={data} />
      
    </div>
  )
}

export default ConfirmacionRequisa