import client from "../client";

// ============================================================================
// OJO: ajusta el import de arriba a donde tengas realmente tu instancia de
// axios (`client`). Si tu carpeta es src/api/pbx/pbxService.js y el cliente
// esta en src/api/client.js, "../client" es correcto; si esta en otro lado,
// cambia la ruta.
// ============================================================================

const getPbxList = () => client.get("/pbx").then((r) => r.data);

const getPbxById = (id) => client.get(`/pbx/${id}`).then((r) => r.data);

const crearPbx = (data) => client.post("/pbx", data).then((r) => r.data);

const actualizarPbx = (id, data) => client.put(`/pbx/${id}`, data).then((r) => r.data);

const eliminarPbx = (id) => client.delete(`/pbx/${id}`).then((r) => r.data);

const agregarRango = (pbxId, data) => client.post(`/pbx/${pbxId}/rangos`, data).then((r) => r.data);

const actualizarRango = (rangoId, data) => client.put(`/pbx/rangos/${rangoId}`, data).then((r) => r.data);

const eliminarRango = (rangoId) => client.delete(`/pbx/rangos/${rangoId}`).then((r) => r.data);

const pbxService = {
    getPbxList,
    getPbxById,
    crearPbx,
    actualizarPbx,
    eliminarPbx,
    agregarRango,
    actualizarRango,
    eliminarRango,
};

export default pbxService;