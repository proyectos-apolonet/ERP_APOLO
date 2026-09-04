import { useState } from "react";
import pbxService from "../../../api/pbx/pbxService";

// ============================================================================
// Formulario de alta/edición de un cliente PBX (número padre + sus rangos
// asignados). Se usa dentro de un modal (openModal/closeModal), tanto para
// "Nuevo PBX" (pbx = null) como para "Editar PBX" (pbx = fila seleccionada).
//
// OJO: ajusta el numero de "../" del import de arriba si tu archivo no queda
// exactamente en src/pages/Pbx/PBXMODAL/PbxModal.jsx -- tiene que apuntar al
// mismo archivo que usa PbxPage.jsx (ahi usaste "../../../api/pbx/pbxService",
// aqui va uno mas porque PBXMODAL esta un nivel mas profundo que PbxPage.jsx).
// ============================================================================

const rangoVacio = () => ({ id: null, rango_inicial: "", rango_final: "", esNuevo: true });

const PbxModal = ({ pbx, onGuardado, onCancelar }) => {
    const esEdicion = Boolean(pbx);

    const [nombreCliente, setNombreCliente] = useState(pbx?.nombre_cliente || "");
    const [numeroPadre, setNumeroPadre] = useState(pbx?.numero_padre || "");
    const [activo, setActivo] = useState(pbx?.activo ?? true);
    const [rangos, setRangos] = useState(
        pbx?.rangos?.length ? pbx.rangos.map((r) => ({ ...r, esNuevo: false })) : [rangoVacio()]
    );
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");

    const handleAgregarRango = () => setRangos((prev) => [...prev, rangoVacio()]);

    const handleQuitarRangoLocal = (idx) => setRangos((prev) => prev.filter((_, i) => i !== idx));

    const handleCambiarRango = (idx, campo, valor) => {
        setRangos((prev) => prev.map((r, i) => (i === idx ? { ...r, [campo]: valor } : r)));
    };

    const handleEliminarRango = async (idx, rango) => {
        if (rango.id) {
            if (!window.confirm(`¿Eliminar el rango ${rango.rango_inicial}-${rango.rango_final}?`)) return;
            try {
                await pbxService.eliminarRango(rango.id);
            } catch (err) {
                console.error("Error en solicitud", err);
                setError("No se pudo eliminar el rango.");
                return;
            }
        }
        handleQuitarRangoLocal(idx);
    };

    const handleGuardar = async () => {
        setError("");

        if (!nombreCliente.trim() || !numeroPadre.trim()) {
            setError("El nombre del cliente y el número padre son obligatorios.");
            return;
        }

        const rangosValidos = rangos.filter((r) => r.rango_inicial && r.rango_final);
        for (const r of rangosValidos) {
            if (Number(r.rango_final) < Number(r.rango_inicial)) {
                setError(
                    `El rango ${r.rango_inicial}-${r.rango_final} no es válido (el final debe ser mayor o igual al inicial).`
                );
                return;
            }
        }

        setGuardando(true);
        try {
            let padreId = pbx?.id;
            let primerRangoYaGuardado = null;

            if (esEdicion) {
                await pbxService.actualizarPbx(padreId, { nombreCliente, numeroPadre, activo });
            } else {
                const primerRango = rangosValidos[0];
                const creado = await pbxService.crearPbx({
                    nombreCliente,
                    numeroPadre,
                    rangoInicial: primerRango?.rango_inicial || null,
                    rangoFinal: primerRango?.rango_final || null,
                });
                padreId = creado.id;
                primerRangoYaGuardado = primerRango || null;
            }

            for (const r of rangosValidos) {
                if (r === primerRangoYaGuardado) continue; // ya se guardó junto con el padre

                if (r.esNuevo) {
                    await pbxService.agregarRango(padreId, {
                        rangoInicial: r.rango_inicial,
                        rangoFinal: r.rango_final,
                    });
                } else if (r.id) {
                    await pbxService.actualizarRango(r.id, {
                        rangoInicial: r.rango_inicial,
                        rangoFinal: r.rango_final,
                    });
                }
            }

            onGuardado();
        } catch (err) {
            console.error("Error en solicitud", err);
            setError(err?.response?.data?.message || "No se pudo guardar el PBX.");
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
                <label className="form-label">Nombre del cliente</label>
                <input
                    type="text"
                    className="form-control"
                    value={nombreCliente}
                    onChange={(e) => setNombreCliente(e.target.value)}
                    placeholder="Ej: HOSPITAL CEMESA"
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Número padre de la PBX</label>
                <input
                    type="text"
                    className="form-control"
                    value={numeroPadre}
                    onChange={(e) => setNumeroPadre(e.target.value)}
                    placeholder="Ej: 25160174"
                />
            </div>

            {esEdicion && (
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="pbxActivo"
                        checked={activo}
                        onChange={(e) => setActivo(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="pbxActivo">
                        Activo
                    </label>
                </div>
            )}

            <hr />

            <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="form-label mb-0">Rangos asignados</label>
                <button type="button" className="btn btn-sm btn-outline-success" onClick={handleAgregarRango}>
                    <i className="pi pi-plus me-1" /> Agregar rango
                </button>
            </div>

            {rangos.map((r, idx) => (
                <div className="row g-2 mb-2 align-items-center" key={r.id ?? `nuevo-${idx}`}>
                    <div className="col-5">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Inicio (ej: 25161800)"
                            value={r.rango_inicial}
                            onChange={(e) => handleCambiarRango(idx, "rango_inicial", e.target.value)}
                        />
                    </div>
                    <div className="col-5">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Fin (ej: 25161899)"
                            value={r.rango_final}
                            onChange={(e) => handleCambiarRango(idx, "rango_final", e.target.value)}
                        />
                    </div>
                    <div className="col-2">
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleEliminarRango(idx, r)}
                            title="Quitar rango"
                        >
                            <i className="pi pi-trash" />
                        </button>
                    </div>
                </div>
            ))}

            <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-secondary" onClick={onCancelar} disabled={guardando}>
                    Cancelar
                </button>
                <button type="button" className="btn btn-success" onClick={handleGuardar} disabled={guardando}>
                    {guardando ? "Guardando..." : "Guardar"}
                </button>
            </div>
        </div>
    );
};

export default PbxModal;