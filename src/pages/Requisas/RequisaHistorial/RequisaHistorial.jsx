import React from 'react'
import DataGridAg from '../../../components/AgGrid/DataAgGrid'

/**
 * @file RequisaHistorial.jsx
 * @description Componente de consulta para el histórico de requisas.
 * Permite a los usuarios visualizar el estado y los detalles de todas las 
 * solicitudes de inventario realizadas en el sistema.
 */

/**
 * `RequisaHistorial` - Vista de solo lectura del historial de solicitudes.
 * * Características:
 * - Implementación de `DataGridAg` para manejo de grandes conjuntos de datos.
 * - Columnas inmovilizadas (ID y Requisa) para facilitar la navegación horizontal.
 * - Estilizado corporativo con el esquema de colores Azul Oscuro y Naranja.
 * * @returns {JSX.Element} Panel de historial con grid de datos.
 */
const RequisaHistorial = () => {

  /**
     * Definición de columnas para el historial.
     * Nota: En esta vista se omiten las acciones de edición/aprobación para 
     * mantener la integridad de los registros históricos.
     * @type {Array<Object>}
     */
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

  /**
     * Datos de ejemplo (Mock Data).
     * Representan el estado de las solicitudes en el tiempo.
     */
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
    /**
         * Contenedor principal con padding y fondo azul profundo (#1e3a5f)
         * que resalta el componente blanco del grid.
         */
    <div style={{ padding: "24px", background: "#1e3a5f", minHeight: "100vh" }}>
      {/* Título resaltado en Naranja (#FF6D1F) */}
      <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#FF6D1F", marginBottom: "16px" }}>
        Historial de Requisas
      </h2>
      {/* Encapsulado del DataGrid para mantener sombras y bordes limpios */}
      <DataGridAg columns={columns} data={data} />
    </div>
  );
};

export default RequisaHistorial;