import DataGridAg from '../../components/AgGrid/DataAgGrid'
import 'primeicons/primeicons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ModalCDRCarga from '../CallDetailRegister/CDRModal/ModalCDRCarga';
import { useModal } from '../../context/ModalContext/ModalContext';
import { useEffect, useState } from 'react';
import { getCDR } from '../../api/CDR/CDRService';


const CallDetailRegisterPage = () => {

    const { openModal, closeModal } = useModal();
    const [ loading, setLoading ] = useState(false);
    const [ data, setData ] = useState([]);

    const getInfoCDR = async () => {

      try {
        setLoading(true);

        const tempoCDR = await getCDR();
        setData(tempoCDR); 
        console.log("Carga de datos: ", tempoCDR);

      } catch (error) {
        console.error("Error al cargar CDR ", error);
      } finally {
        setLoading(false)
      }
    };

    const handleAbrirCargaCDR = () => {
        openModal({
            title: "Carga CDR",
            size: "full",
            showFooter: false,
            content: <ModalCDRCarga onClose={closeModal} />
        });
    };

     const columns = [
    { field: "id", header: "ID", frozen: "left", width: 70, hide: true },
    { field: "archivo_control_id", header: "Archivo CDR", width: 180, hide: true },
    { field: "nombre_archivo", header: "Nombre Archivo", width: 210},
    { field: "fecha_carga", header: "Fecha Carga", frozen: "left", width: 180, hide:true },
    { field: "direccioncdr", header: "Dirección CDR", frozen: "left", width: 180 },
    { field: "numeroani", header: "Número ANI", frozen: "left", width: 180 },
    { field: "numerollamadooriginal", header: "Número Lamado", frozen: "left", width: 180 },
    { field: "tiempocobro", header: "Duración Llamada", frozen: "left", width: 180 },
    { field: "fechacaptura", header: "Fecha de Captura", frozen: "left", width: 220 },
    { field: "horacaptura", header: "Hora de captura", frozen: "left", width: 180 },
  ];

 
    useEffect(() => {
      getInfoCDR();
    }, []);

  return (
    <div style={{ padding: "24px", background: "#1e3a5f", minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
        <div className="tooltip" data-tip="Nuevo Registro">
          <button
            className="btn btn-success p-5"
            onClick={handleAbrirCargaCDR}
          >
            <i className="pi pi-upload text-xl" />
            Ingrese CDR
          </button>
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#FF6D1F", margin: 0 }}>
          Call Detail Register
        </h2>
      </div>
      <DataGridAg columns={columns} data={data} />
    </div>
  )
}

export default CallDetailRegisterPage