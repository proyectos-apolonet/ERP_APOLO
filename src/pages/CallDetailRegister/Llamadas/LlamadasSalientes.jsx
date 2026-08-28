import DataGridAg from '../../../components/AgGrid/DataAgGrid';
import 'primeicons/primeicons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { getCDRLlamadasSalientes } from '../../../api/CDR/CDRService';


const LlamadasSalientes = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getInfoCDRLlamadasSalientes = async () => {

    try {
      setLoading(true);

      const tempoCDR = await getCDRLlamadasSalientes();
      setData(tempoCDR);
      console.log("Carga de datos: ", tempoCDR);

    } catch (error) {
      console.error("Error al cargar CDR ", error);
    } finally {
      setLoading(false)
    }
  };

  const columns = [
    { field: "id", header: "ID", frozen: "left", width: 70 },
    { field: "direccion", header: "Dirección", width: 180 },
    { field: "grupo", header: "Grupo", frozen: "left", width: 180 },
    { field: "numeroani", header: "Número ANI", frozen: "left", width: 180 },
    { field: "operador_origen", header: "Operador Origén", width: 180 },
    { field: "ciudad_origen", header: "Ciudad Origén", width: 180 },
    { field: "numerollamadotraducido", header: "Número Llamado", width: 180 },
    { field: "operador_destino", header: "Operador Destino", width: 180 },
    { field: "ciudad_destino", header: "Ciudad Destino", width: 180 },
    { field: "tipollamada", header: "Tipo Llamada", width: 180 },
    { field: "fechacaptura", header: "Fecha Captura", width: 180 },
    { field: "horacaptura", header: "Hora Captura", width: 180 },
    { field: "tiempocobro_hhmmss", header: "Tiempo Cobro (s)", width: 180 },
    { field: "tiempocobro_minutos", header: "Tiempo Cobro (m)", width: 180 },
    { field: "generado_en", header: "Fecha Carga", width: 180 },
  ];


  useEffect(() => {
    getInfoCDRLlamadasSalientes();
  }, []);

  return (
    <div style={{ padding: "24px", background: "#1e3a5f", minHeight: "100vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
        {/* <div className="tooltip" data-tip="Nuevo Registro">
        <button
          className="btn btn-success p-5"
          onClick={handleAbrirCargaCDR}
        >
          <i className="pi pi-upload text-xl" />
          Ingrese CDR
        </button>
      </div> */}
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#FF6D1F", margin: 0 }}>
          Llamadas Salientes
        </h2>
      </div>
      <DataGridAg columns={columns} data={data} />
    </div>
  )
}

export default LlamadasSalientes