import DataGridAg from '../../../components/AgGrid/DataAgGrid';
import 'primeicons/primeicons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { getRangosApolonet } from '../../../api/Rangos/RangosService.js';

const RangosAsignadosApolonet = () => {

    const [ loading, setLoading ] = useState(false);
    const [ data, setData ] = useState([]);

    const getInfoRangosAsignados = async () => {

      try {
        setLoading(true);

        const tempoCDR = await getRangosApolonet();
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
    { field: "ciudad", header: "Ciudad", width: 315 },
    { field: "rango_inicial", header: "Rango Inicial", frozen: "left", width: 315 },
    { field: "rango_final", header: "Rango Final", frozen: "left", width: 315 },
    { field: "cantidad", header: "Cantidad", width: 315 },
  ];

 
    useEffect(() => {
      getInfoRangosAsignados();
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
          Rangos Asignados Apolonet
        </h2>
      </div>
      <DataGridAg columns={columns} data={data} />
    </div>
  )
}

export default RangosAsignadosApolonet