import client from "../client.js"

// ============================================================================
// Reemplazo completo de tu api/Rangos/RangosService.js -- se agregan crear/
// actualizar/eliminar para Apolonet y Competencia. getCodigosPaises queda
// igual (catálogo fijo, sin CRUD).
// ============================================================================

export const getRangosApolonet = () => client.get("/rangos/apolonet").then(r => r.data);
export const crearRangoApolonet = (data) => client.post("/rangos/apolonet", data).then(r => r.data);
export const actualizarRangoApolonet = (id, data) => client.put(`/rangos/apolonet/${id}`, data).then(r => r.data);
export const eliminarRangoApolonet = (id) => client.delete(`/rangos/apolonet/${id}`).then(r => r.data);

export const getRangosCompetencia = () => client.get("/rangos/competencia").then(r => r.data);
export const crearRangoCompetencia = (data) => client.post("/rangos/competencia", data).then(r => r.data);
export const actualizarRangoCompetencia = (id, data) => client.put(`/rangos/competencia/${id}`, data).then(r => r.data);
export const eliminarRangoCompetencia = (id) => client.delete(`/rangos/competencia/${id}`).then(r => r.data);

export const getCodigosPaises = () => client.get("/rangos/codigo_pais").then(r => r.data);