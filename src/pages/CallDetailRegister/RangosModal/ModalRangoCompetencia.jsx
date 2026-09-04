import { useState } from "react";
import { crearRangoCompetencia, actualizarRangoCompetencia } from "../../../api/Rangos/RangosService.js";

// ============================================================================
// Formulario de alta/edición de un rango de competencia (zona, ciudad,
// operador, rango_inicio, rango_fin). Se usa dentro de un modal (openModal/
// closeModal), tanto para "Nuevo rango" (rango = null) como para "Editar"
// (rango = fila seleccionada).
//
// Carpetas: este archivo va en la MISMA carpeta que
// RangosAsignadosCompetencia.jsx --
// src/pages/CallDetailRegister/RangosAsignados/ModalRangoCompetencia.jsx --
// por eso usa el mismo "../../../" para llegar a api/Rangos/RangosService.js.
// ============================================================================

const ModalRangoCompetencia = ({ rango, onGuardado, onCancelar }) => {
    const esEdicion = Boolean(rango);

    const [zona, setZona] = useState(rango?.zona || "");
    const [ciudad, setCiudad] = useState(rango?.ciudad || "");
    const [operador, setOperador] = useState(rango?.operador || "");
    const [rangoInicio, setRangoInicio] = useState(rango?.rango_inicio ?? "");
    const [rangoFin, setRangoFin] = useState(rango?.rango_fin ?? "");
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");

    const handleGuardar = async () => {
        setError("");

        if (!ciudad.trim() || rangoInicio === "" || rangoFin === "") {
            setError("Ciudad, rango inicial y rango final son obligatorios.");
            return;
        }
        if (Number(rangoFin) < Number(rangoInicio)) {
            setError("El rango final debe ser mayor o igual al rango inicial.");
            return;
        }

        setGuardando(true);
        try {
            const payload = {
                zona: zona.trim() || null,
                ciudad: ciudad.trim(),
                operador: operador.trim() || null,
                rango_inicio: rangoInicio,
                rango_fin: rangoFin,
            };

            if (esEdicion) {
                await actualizarRangoCompetencia(rango.id, payload);
            } else {
                await crearRangoCompetencia(payload);
            }

            onGuardado();
        } catch (err) {
            console.error("Error en solicitud", err);
            setError(err?.response?.data?.message || "No se pudo guardar el rango.");
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div>
            {error && (
                <div className="alert alert-error mb-3">
                    <span>{error}</span>
                </div>
            )}

            <div className="mb-3">
                <label className="label">Zona</label>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={zona}
                    onChange={(e) => setZona(e.target.value)}
                    placeholder="Ej: Norte"
                />
            </div>

            <div className="mb-3">
                <label className="label">Ciudad</label>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    placeholder="Ej: San Pedro Sula"
                />
            </div>

            <div className="mb-3">
                <label className="label">Operador</label>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={operador}
                    onChange={(e) => setOperador(e.target.value)}
                    placeholder="Ej: Tigo"
                />
            </div>

            <div className="flex gap-3 mb-3">
                <div className="flex-1">
                    <label className="label">Rango inicial</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={rangoInicio}
                        onChange={(e) => setRangoInicio(e.target.value)}
                        placeholder="Ej: 96000000"
                    />
                </div>
                <div className="flex-1">
                    <label className="label">Rango final</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={rangoFin}
                        onChange={(e) => setRangoFin(e.target.value)}
                        placeholder="Ej: 96999999"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="btn btn-ghost" onClick={onCancelar} disabled={guardando}>
                    Cancelar
                </button>
                <button type="button" className="btn btn-success" onClick={handleGuardar} disabled={guardando}>
                    {guardando ? "Guardando..." : "Guardar"}
                </button>
            </div>
        </div>
    );
};

export default ModalRangoCompetencia;