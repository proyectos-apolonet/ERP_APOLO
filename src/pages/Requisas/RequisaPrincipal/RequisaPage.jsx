import React from 'react'
import DataGridAg from '../../../components/AgGrid/DataAgGrid'
import 'primeicons/primeicons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import RequisaModalNueva from '../RequisasModal/RequisaModalNueva';
import { useModal } from '../../../context/ModalContext/ModalContext';

/**
 * @file RequisaPage.jsx
 * @description Punto de entrada principal para la gestión de requisas.
 * Permite la visualización de datos existentes y actúa como disparador
 * para la creación de nuevas requisas mediante un modal de pantalla completa.
 */

/**
 * `RequisaPage` - Componente operativo del módulo de Requisas.
 * * Características:
 * - Integración con `ModalContext` para apertura de formularios.
 * - Uso de `DataGridAg` para visualización técnica de inventario/pedidos.
 * - Estilizado corporativo alineado con la identidad visual de Apolonet.
 * * @returns {JSX.Element} Vista principal con tabla y botones de acción.
 */
const RequisaPage = () => {

  /** * Hook del contexto global de modales. 
   * Permite inyectar cualquier componente (como RequisaModalNueva) dinámicamente.
   */
  const { openModal, closeModal } = useModal();

  /**
   * Manejador para abrir el formulario de nueva requisa.
   * Configura el modal en modo 'full' para dar máximo espacio de trabajo al usuario.
   * @function handleNuevaRequisa
   */
  const handleNuevaRequisa = () => {
    openModal({
      title: "Nueva Requisa",
      size: "full",
      showFooter: false,
      content: <RequisaModalNueva onClose={closeModal} />
    });
  };

  /**
   * Configuración de columnas para el grid de datos.
   * Incluye propiedades de inmovilización (frozen) para campos de referencia.
   * @type {Array<Object>}
   */
  const columns = [
    { field: "id", header: "#", frozen: "left", width: 70 },
    { field: "requisa", header: "Requisa", frozen: "left", width: 130 },
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
  ];

  /**
   * Datos estáticos (Mock Data) para representación visual.
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
      <div className="tooltip" data-tip="Nueva Requisa">
        <button
          className="btn btn-success p-4 mb-4"
          onClick={handleNuevaRequisa}
        >+</button>
      </div>
      <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#FF6D1F", marginBottom: "16px" }}>
        Historial de Requisas
      </h2>
      <DataGridAg columns={columns} data={data} />
    </div>
  )
}

export default RequisaPage;