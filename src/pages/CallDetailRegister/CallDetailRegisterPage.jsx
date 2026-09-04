import DataGridAg from '../../components/AgGrid/DataAgGrid'
import 'primeicons/primeicons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ModalCDRCarga from '../CallDetailRegister/CDRModal/ModalCDRCarga';
import { useModal } from '../../context/ModalContext/ModalContext';
import { useCallback, useState } from 'react';
import { getCDR } from '../../api/CDR/CDRService';
import ModalReportePorNumero from '../CallDetailRegister/CDRModal/ModalReportePorNumero';


const CallDetailRegisterPage = () => {

  const { openModal, closeModal } = useModal();
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // getCDR ahora devuelve { rows, lastRow } -- justo la forma que espera el
  // grid en modo servidor. Tiene que ser una función NUEVA cada vez que
  // cambian los filtros de fecha (por eso useCallback con esas dependencias)
  // para que el grid vuelva a pedir desde el principio en vez de mezclar
  // páginas viejas con el nuevo filtro.
  const fetchPage = useCallback(
    ({ startRow, endRow }) => getCDR({ startRow, endRow, fechaInicio, fechaFin }),
    [fechaInicio, fechaFin]
  );

  const handleAbrirCargaCDR = () => {
    openModal({
      title: "Carga CDR",
      size: "full",
      showFooter: false,
      content: <ModalCDRCarga onClose={closeModal} />
    });
  };

  const handleAbrirReportePorNumero = () => {
    openModal({
      title: "Reporte por Número",
      size: "md",
      showFooter: false,
      content: <ModalReportePorNumero onClose={closeModal} />
    });
  };

  const columns = [
    { field: "id", header: "ID", frozen: "left", width: 70, hide: true },
    { field: "archivo_control_id", header: "Archivo CDR", width: 180, hide: true },
    { field: "nombre_archivo", header: "Nombre Archivo", width: 210 },
    { field: "fecha_carga", header: "Fecha Carga", frozen: "left", width: 180, hide: true },
    { field: "direccioncdr", header: "Dirección CDR", frozen: "left", width: 180 },
    { field: "numeroani", header: "Número ANI", frozen: "left", width: 180 },
    { field: "numerollamadooriginal", header: "Número Lamado", frozen: "left", width: 180 },
    { field: "tiempocobro", header: "Duración Llamada", frozen: "left", width: 180 },
    { field: "fechacaptura", header: "Fecha de Captura", frozen: "left", width: 220 },
    { field: "horacaptura", header: "Hora de captura", frozen: "left", width: 180 },
  ];

  return (
    <div className="p-6 bg-[#1e3a5f] min-h-screen">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h2 className="text-[22px] font-bold text-[#FF6D1F] m-0 whitespace-nowrap">
          Call Detail Register
        </h2>

        <div className="flex flex-wrap items-center gap-4">
          <div className="tooltip" data-tip="Nuevo Registro">
            <button
              className="btn btn-success p-5 whitespace-nowrap"
              onClick={handleAbrirCargaCDR}
            >
              <i className="pi pi-upload text-xl" />
              Ingrese CDR
            </button>
          </div>
          <div className="tooltip" data-tip="Reporte por Número">
            <button className="btn btn-warning p-5 whitespace-nowrap" onClick={handleAbrirReportePorNumero}>
              <i className="pi pi-file-excel text-xl" />
              Reporte por Número
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-3 items-center mb-4">
        <input
          type="date"
          className="input input-bordered"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
        <input
          type="date"
          className="input input-bordered"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
        <span className="text-[#cbd5e1] text-[13px]">
          (opcional -- si no filtras por fecha, carga por bloques desde el registro más reciente)
        </span>
      </div>

      <DataGridAg columns={columns} fetchPage={fetchPage} pageSize={100} />
    </div>
  )
}

export default CallDetailRegisterPage