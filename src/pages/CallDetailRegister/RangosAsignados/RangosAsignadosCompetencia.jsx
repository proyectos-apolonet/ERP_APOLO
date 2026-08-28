import DataGridAg from '../../../components/AgGrid/DataAgGrid';
import 'primeicons/primeicons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { getRangosCompetencia } from '../../../api/Rangos/RangosService.js';

const RangosAsignadosCompetencia = () => {

    const [ loading, setLoading ] = useState(false);
    const [ data, setData ] = useState([]);

    const getInfoRangosCompetencia = async () => {

      try {
        setLoading(true);

        const tempoCDR = await getRangosCompetencia();
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
    { field: "ciudad", header: "Ciudad", width: 200 },
    { field: "zona", header: "Zona", width: 200 },
    { field: "operador", header: "Operador", width: 200 },
    { field: "rango_inicio", header: "Rango Inicial", frozen: "left", width: 200 },
    { field: "rango_fin", header: "Rango Final", frozen: "left", width: 200 },
  ];

 
    useEffect(() => {
      getInfoRangosCompetencia();
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

export default RangosAsignadosCompetencia