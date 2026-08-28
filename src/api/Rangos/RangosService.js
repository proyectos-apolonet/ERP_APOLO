import client from "../client.js"

export const getRangosApolonet = () => client.get("/rangos/apolonet").then(r => r.data);

export const getRangosCompetencia = () => client.get("/rangos/competencia").then(r => r.data);

export const getCodigosPaises = () => client.get("/rangos/codigo_pais").then(r => r.data);