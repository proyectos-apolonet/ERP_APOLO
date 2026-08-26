import DataGridAg from '../../../components/AgGrid/DataAgGrid';
import 'primeicons/primeicons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { getCDRArchivosControl } from '../../../api/CDR/CDRService';


const RegistrosCDR = () => {

    const [ loading, setLoading ] = useState(false);
    const [ data, setData ] = useState([]);

    const getInfoCDRArchivosControl = async () => {

      try {
        setLoading(true);

        const tempoCDR = await getCDRArchivosControl();
        setData(tempoCDR); 
        console.log("Carga de datos: ", tempoCDR);

      } catch (error) {
        console.error("Error al cargar CDR ", error);
      } finally {
        setLoading(false)
      }
    };

     const columns = [
    { field: "id", header: "ID", frozen: "left", width: 70},
    { field: "nombre_archivo", header: "Nombre Archivo", width: 180 },
    { field: "subido_en", header: "Fecha Carga", frozen: "left", width: 180},
    { field: "hash_sha256", header: "SHA256", frozen: "left", width: 180 },
    { field: "total_lineas", header: "Total de Líneas", frozen: "left", width: 180 },
  ];

 
    useEffect(() => {
      getInfoCDRArchivosControl();
    }, []);

    return (
    <div style={{ padding: "24px", background: "#1e3a5f", minHeight: "100vh" }}>
      <div className="tooltip" data-tip="Nuevo Registro">
        {/* <button
          className="btn btn-success p-5 mb-5"
          onClick={handleAbrirCargaCDR}
        >
        <i className="pi pi-upload text-xl" /> 
        Ingrese CDR </button> */}
      </div>
      <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#FF6D1F", marginBottom: "16px" }}>
        Control de Archivos
      </h2>
      <DataGridAg columns={columns} data={data} />
    </div>
  )
}

export default RegistrosCDR