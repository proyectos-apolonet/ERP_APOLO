import client from "../client.js"

export const uploadCdrFile = async (file, onProgress) => {
    const archivo_cdr = new FormData();
    archivo_cdr.append("archivo_cdr", file);

    const result = await client.post("cdr/upload", archivo_cdr, {
        onUploadProgress: (evt) => {
            if (onProgress && evt.total){
                onProgress(Math.round((evt.loaded * 100) / evt.total));
            }
        },
    });

    return result.data;
};


// Llamadas CDR
// ============================================================================
// Las 5 funciones de abajo (getCDR, getCDRLlamadas*) ahora piden un bloque
// de filas en vez de la tabla completa -- reciben { startRow, endRow,
// fechaInicio, fechaFin } y el backend responde { rows, lastRow } (ya no un
// array plano). Cada una queda lista para usarse directo como el `fetchPage`
// de DataGridAg -- solo hay que enlazarle fechaInicio/fechaFin del filtro
// de la página (ver ejemplo abajo).
// ============================================================================

export const getCDR = ({ startRow, endRow, fechaInicio, fechaFin } = {}) =>
    client.get("/cdr/call", { params: { startRow, endRow, fechaInicio, fechaFin } }).then(r => r.data);

export const getCDRArchivosControl = () => client.get("/cdr/archivos_control").then(r => r.data);

export const getCDRLlamadasEntrantes = ({
    startRow, endRow, fechaInicio, fechaFin,
    tipollamada, grupo, operadorOrigen, operadorDestino, ciudadOrigen, ciudadDestino,
} = {}) =>
    client.get("/cdr/llamadas_entrantes", { params: { startRow, endRow, fechaInicio, fechaFin, tipollamada, grupo, operadorOrigen, operadorDestino, ciudadOrigen, ciudadDestino } }).then(r => r.data);

export const getCDRLlamadasSalientes = ({
    startRow, endRow, fechaInicio, fechaFin,
    tipollamada, grupo, operadorOrigen, operadorDestino, ciudadOrigen, ciudadDestino,
} = {}) =>
    client.get("/cdr/llamadas_Salientes", { params: { startRow, endRow, fechaInicio, fechaFin, tipollamada, grupo, operadorOrigen, operadorDestino, ciudadOrigen, ciudadDestino } }).then(r => r.data);

export const getCDRLlamadasPronto = ({
    startRow, endRow, fechaInicio, fechaFin,
    tipollamada, grupo, operadorOrigen, operadorDestino, ciudadOrigen, ciudadDestino,
} = {}) =>
    client.get("/cdr/llamadas_pronto", { params: { startRow, endRow, fechaInicio, fechaFin, tipollamada, grupo, operadorOrigen, operadorDestino, ciudadOrigen, ciudadDestino } }).then(r => r.data);

export const getCDRLlamadasNoIdentificadas = ({
    startRow, endRow, fechaInicio, fechaFin,
    tipollamada, grupo, operadorOrigen, operadorDestino, ciudadOrigen, ciudadDestino,
} = {}) =>
    client.get("/cdr/llamadas_no_identificadas", { params: { startRow, endRow, fechaInicio, fechaFin, tipollamada, grupo, operadorOrigen, operadorDestino, ciudadOrigen, ciudadDestino } }).then(r => r.data);

// Valores disponibles para los <select> de filtro -- distintos por tabla,
// sacados de la base de datos.
export const getFiltrosCDRLlamadasEntrantes = () => client.get("/cdr/llamadas_entrantes/filtros").then(r => r.data);
export const getFiltrosCDRLlamadasSalientes = () => client.get("/cdr/llamadas_Salientes/filtros").then(r => r.data);
export const getFiltrosCDRLlamadasPronto = () => client.get("/cdr/llamadas_pronto/filtros").then(r => r.data);
export const getFiltrosCDRLlamadasNoIdentificadas = () => client.get("/cdr/llamadas_no_identificadas/filtros").then(r => r.data);

export const downloadReportePorNumeroExcel = (fechaInicio, fechaFin) =>
    client.get("/cdr/reporte_por_numero_excel", {
        params: { fechaInicio, fechaFin },
        responseType: "blob",
    }).then(r => r.data);

export const generarReportePorNumeroCarpeta = (fechaInicio, fechaFin) =>
    client.get("/cdr/reporte_por_numero_carpeta", {
        params: { fechaInicio, fechaFin },
    }).then(r => r.data);

//Rangos Asignados Apolonet y Competencia

// ============================================================================
// EJEMPLO de uso en una página con el grid en modo servidor:
//
// import { useCallback, useState } from "react";
// import DataGridAg from "../../components/DataAgGrid/DataAgGrid";
// import { getCDRLlamadasSalientes } from "../../api/cdr/cdrService";
//
// const [fechaInicio, setFechaInicio] = useState("");
// const [fechaFin, setFechaFin] = useState("");
//
// // Debe ser una función NUEVA cada vez que cambian los filtros, para que
// // el grid vuelva a pedir desde cero:
// const fetchPage = useCallback(
//     ({ startRow, endRow }) => getCDRLlamadasSalientes({ startRow, endRow, fechaInicio, fechaFin }),
//     [fechaInicio, fechaFin]
// );
//
// <DataGridAg columns={columnasSalientes} fetchPage={fetchPage} pageSize={100} />
// ============================================================================