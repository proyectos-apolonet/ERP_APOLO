import DataGridAg from '../../../components/AgGrid/DataAgGrid';
import 'primeicons/primeicons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useCallback, useEffect, useState } from 'react';
import { getCDRLlamadasPronto, getFiltrosCDRLlamadasPronto } from '../../../api/CDR/CDRService';


const LlamadaPronto = () => {

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const [filtrosDisponibles, setFiltrosDisponibles] = useState({
    tipollamada: [], grupo: [], operador_origen: [], operador_destino: [], ciudad_origen: [], ciudad_destino: [],
  });
  const [tipollamada, setTipollamada] = useState("");
  const [grupo, setGrupo] = useState("");
  const [operadorOrigen, setOperadorOrigen] = useState("");
  const [operadorDestino, setOperadorDestino] = useState("");
  const [ciudadOrigen, setCiudadOrigen] = useState("");
  const [ciudadDestino, setCiudadDestino] = useState("");

  useEffect(() => {
    getFiltrosCDRLlamadasPronto()
      .then(setFiltrosDisponibles)
      .catch((error) => console.error("Error al cargar los filtros", error));
  }, []);

  const fetchPage = useCallback(
    ({ startRow, endRow }) => getCDRLlamadasPronto({
      startRow, endRow, fechaInicio, fechaFin,
      tipollamada, grupo, operadorOrigen, operadorDestino, ciudadOrigen, ciudadDestino,
    }),
    [fechaInicio, fechaFin, tipollamada, grupo, operadorOrigen, operadorDestino, ciudadOrigen, ciudadDestino]
  );

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

  return (
    <div className="p-6 bg-[#1e3a5f] min-h-screen">
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-[22px] font-bold text-[#FF6D1F] m-0">
          Llamadas Apolonet
        </h2>
      </div>

      <div className="flex flex-wrap gap-3 items-center mb-4">
        <input type="date" className="input input-bordered" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
        <input type="date" className="input input-bordered" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />

        <select className="select select-bordered" value={tipollamada} onChange={(e) => setTipollamada(e.target.value)}>
          <option value="">Tipo de llamada (todos)</option>
          {filtrosDisponibles.tipollamada.map((valor) => <option key={valor} value={valor}>{valor}</option>)}
        </select>

        <select className="select select-bordered" value={grupo} onChange={(e) => setGrupo(e.target.value)}>
          <option value="">Grupo / red (todos)</option>
          {filtrosDisponibles.grupo.map((valor) => <option key={valor} value={valor}>{valor}</option>)}
        </select>

        <select className="select select-bordered" value={operadorOrigen} onChange={(e) => setOperadorOrigen(e.target.value)}>
          <option value="">Operador origen (todos)</option>
          {filtrosDisponibles.operador_origen.map((valor) => <option key={valor} value={valor}>{valor}</option>)}
        </select>

        <select className="select select-bordered" value={operadorDestino} onChange={(e) => setOperadorDestino(e.target.value)}>
          <option value="">Operador destino (todos)</option>
          {filtrosDisponibles.operador_destino.map((valor) => <option key={valor} value={valor}>{valor}</option>)}
        </select>

        <select className="select select-bordered" value={ciudadOrigen} onChange={(e) => setCiudadOrigen(e.target.value)}>
          <option value="">Ciudad origen (todas)</option>
          {filtrosDisponibles.ciudad_origen.map((valor) => <option key={valor} value={valor}>{valor}</option>)}
        </select>

        <select className="select select-bordered" value={ciudadDestino} onChange={(e) => setCiudadDestino(e.target.value)}>
          <option value="">Ciudad destino (todas)</option>
          {filtrosDisponibles.ciudad_destino.map((valor) => <option key={valor} value={valor}>{valor}</option>)}
        </select>
      </div>

      <DataGridAg columns={columns} fetchPage={fetchPage} pageSize={100} />
    </div>
  )
}

export default LlamadaPronto