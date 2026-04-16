import client from "../../client.js";

export const getExtensiones = () => client.get("/extensiones").then(r => r.data);
export const postExtensiones = (extensionesData) => client.post("extensiones", extensionesData).then(r => r.data);