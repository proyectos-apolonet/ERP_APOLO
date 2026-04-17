import React, { useEffect, useState } from 'react'
import { getExtensiones } from "../api/services/extensionesService/extenssionesService.js"
import DataGridAg from '../components/AgGrid/DataAgGrid.jsx'
import { useConfirm } from '../context/ConfirmDialog/ConfirmDialogContext.jsx'
import { useModal } from '../context/ModalContext/ModalContext.jsx'
import ExtensionModal from './ExtensionAPOLO/ExtensionModal.jsx'

/**
 * @file HomePage.jsx
 * @description Vista principal del directorio de extensiones.
 * Gestiona el ciclo de vida de los datos de extensiones, permitiendo la consulta,
 * edición y creación de nuevos registros mediante servicios asíncronos.
 */

/**
 * `HomePage` - Componente principal de la interfaz de extensiones.
 * * Características:
 * - Carga automática de datos al montar el componente vía `useEffect`.
 * - Integración con `ExtensionModal` para altas de registros.
 * - Acciones de fila protegidas por diálogos de confirmación.
 * * @returns {JSX.Element} Panel de administración de extensiones.
 */
const HomePage = () => {

  const { openModal, closeModal } = useModal();
  const { confirmSave, confirmDelete } = useConfirm();

  // Estados para el manejo de datos y feedback visual
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  /**
   * Obtiene la información desde el backend.
   * Actualiza el estado local 'data' y maneja la visibilidad del loader.
   * @async
   * @function getInfo
   */
  const getInfo = async () => {

    try {
      setLoading(true);

      const tempo = await getExtensiones();
      setData(tempo)

      console.log("Las extensiones son: ", tempo);

    } catch (error) {
      console.error("Error al cargar extensiones: ", error);
    } finally {
      setLoading(false)
    }
  };

  /**
   * Dispara la apertura del modal para crear una nueva extensión.
   * Pasa la función 'closeModal' al hijo para permitir el cierre tras guardar.
   */
  const handleNuevaExtension = () => {
    openModal({
      title: "Nueva Extension",
      size: "lg",
      showFooter: false,
      // Aquí pasamos el componente directamente
      content: <ExtensionModal onClose={closeModal} />
    });
  };

  /**
   * Definición de columnas para el Grid de Extensiones.
   * Incluye anchos específicos y renderizadores de acciones.
   */
  const columns = [
    {
      field: "id_ext",
      header: "ID",
      frozen: "left",
      width: 70,
      hide: true
    },
    {
      field: "nombre",
      header: "Nombre",
      frozen: "left",
      width: 180,
      editable: true
    },
    {
      field: "departamento",
      header: "Departamento",
      frozen: "left",
      width: 130
    },
    {
      field: "extension",
      header: "Extension",
      width: 130
    },
    {
      field: "puesto",
      header: "Puesto",
      width: 250
    },
    {
      field: "correo",
      header: "Correo",
      width: 350
    },
    {
      field: "estado",
      header: "Estado",
      width: 190
    },
    {
      field: "id", header: "Acciones", width: 150, frozen: "right", render: (data) => (
        <div className="flex justify-center items-center h-full gap-5">
          {/* Acción de Edición */}
          <button
            onClick={() => confirmSave({
              message: "¿Guardar los cambios?",
              onAccept: () => console.log("Requisa Confirmada")
            })}
            className="btn btn-info btn-sm tooltip tooltip-right" data-tip="Editar"
          >
            <i className="bi bi-pencil-square gap-2 mb-1 "></i>
          </button>

          {/* Acción de Eliminación */}
          <button
            onClick={() => confirmDelete({
              message: "¿Cancelar Requisa?",
              onAccept: () => console.log("Cancelado")
            })}
            className="btn btn-error btn-sm tooltip tooltip-left" data-tip="Eliminar"
          >
            <i className="bi bi-x-lg "></i>
          </button>
        </div>
      )
    },
  ];

  /**
   * Efecto de inicialización. 
   * Ejecuta la petición de datos al cargar la página por primera vez.
   */
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div style={{ padding: "24px", background: "#1e3a5f", minHeight: "100vh" }}>
        <div className='flex flex-wrap gap-5 p-2'>
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#FF6D1F", marginBottom: "16px" }}>
            Extensiones
          </h2>


          <button className='border border rounded-sm h-8 w-45 btn btn-success'
            onClick={handleNuevaExtension}

          >
            Nueva Extension
          </button>

        </div>
        <DataGridAg columns={columns} data={data} />
      </div>
    </>
  )
}

export default HomePage;