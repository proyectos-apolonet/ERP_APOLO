import React from 'react'
import DataGridAg from '../../../components/AgGrid/DataAgGrid';
import { useConfirm } from '../../../context/ConfirmDialog/ConfirmDialogContext';

/**
 * @file ConfirmacionRequisa.jsx
 * @description Vista de gestión para que los Jefes de Departamento aprueben o rechacen requisas.
 * Utiliza AG Grid para visualizar grandes volúmenes de datos y un sistema de diálogos de 
 * confirmación para acciones críticas.
 */

/**
 * `ConfirmacionRequisa` - Componente de control y aprobación de solicitudes.
 * * Características:
 * - Renderizado dinámico de acciones (Aprobar/Rechazar) por fila.
 * - Columnas inmovilizadas (Frozen) para mejorar la lectura en pantallas pequeñas.
 * - Integración con `ConfirmDialogContext` para validación de acciones del usuario.
 * * @returns {JSX.Element} Panel de confirmación con tabla de datos.
 */
const ConfirmacionRequisa = () => {

  /** * Hooks de confirmación global. 
     * Permiten disparar modales de advertencia antes de ejecutar procesos en el backend.
     */
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

  /**
   * Definición de columnas para DataGridAg.
   * @type {Array<Object>}
   * @property {string} field - Nombre del campo en el objeto de datos.
   * @property {string} header - Etiqueta visual de la columna.
   * @property {string} [frozen] - Fija la columna a la 'left' o 'right'.
   * @property {function} [render] - Función para inyectar JSX personalizado en la celda.
   */
  const columns = [
    { field: "id", header: "#", frozen: "left", width: 70, hide: true },
    { field: "requisa", header: "Requisa", frozen: "left", width: 130, },
    { field: "fechaRequisa", header: "Fecha Requisa" },
    { field: "fechaCreacion", header: "Fecha Creación" },
    { field: "solicitante", header: "Solicitante" },
    { field: "departamento", header: "Departamento" },
    { field: "estado", header: "Estado" }, // badge automático
    { field: "prioridad", header: "Prioridad" }, // badge automático
    { field: "producto", header: "Producto" },
    { field: "cantidad", header: "Cantidad" },
    { field: "stock", header: "Stock" },
    { field: "costo", header: "Costo" },
    {
      field: "id", header: "Acciones", width: 150, frozen: "right", render: (data) => (
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

  /**
     * Datos de prueba (Mock Data) para la visualización inicial del módulo.
     * En producción, estos datos provendrían de un servicio `requisaService.getPending()`.
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
    <div style={{ padding: "24px", background: "#1e3a5f", minHeight: "100vh" }}>
      <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#FF6D1F", marginBottom: "16px" }}>
        Confirmacion Requisas Jefe Departamento
      </h2>
      <DataGridAg columns={columns} data={data} />

    </div>
  )
}

export default ConfirmacionRequisa;