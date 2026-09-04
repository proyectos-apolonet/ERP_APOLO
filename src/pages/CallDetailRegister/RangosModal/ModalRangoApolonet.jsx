import { useState } from "react";
import { crearRangoApolonet, actualizarRangoApolonet } from "../../../api/Rangos/RangosService.js";

// ============================================================================
// Formulario de alta/edición de un rango Apolonet (ciudad, rango_inicial,
// rango_final, cantidad). Se usa dentro de un modal (openModal/closeModal),
// tanto para "Nuevo rango" (rango = null) como para "Editar" (rango = fila
// seleccionada).
//
// Carpetas: va en la MISMA carpeta que RangosAsignadosApolonet.jsx --
// src/pages/CallDetailRegister/RangosAsignados/ModalRangoApolonet.jsx --
// por eso usa el mismo "../../../" para llegar a api/Rangos/RangosService.js.
// ============================================================================

const ModalRangoApolonet = ({ rango, onGuardado, onCancelar }) => {
    const esEdicion = Boolean(rango);

    const [ciudad, setCiudad] = useState(rango?.ciudad || "");
    const [rangoInicial, setRangoInicial] = useState(rango?.rango_inicial ?? "");
    const [rangoFinal, setRangoFinal] = useState(rango?.rango_final ?? "");
    const [cantidad, setCantidad] = useState(rango?.cantidad ?? "");
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");

    const handleGuardar = async () => {
        setError("");

        if (!ciudad.trim() || rangoInicial === "" || rangoFinal === "") {
            setError("Ciudad, rango inicial y rango final son obligatorios.");
            return;
        }
        if (Number(rangoFinal) < Number(rangoInicial)) {
            setError("El rango final debe ser mayor o igual al rango inicial.");
            return;
        }

        setGuardando(true);
        try {
            const payload = {
                ciudad: ciudad.trim(),
                rango_inicial: rangoInicial,
                rango_final: rangoFinal,
                cantidad: cantidad === "" ? null : cantidad,
            };

            if (esEdicion) {
                await actualizarRangoApolonet(rango.id, payload);
            } else {
                await crearRangoApolonet(payload);
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
                <label className="label">Ciudad</label>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    placeholder="Ej: Tegucigalpa"
                />
            </div>

            <div className="flex gap-3 mb-3">
                <div className="flex-1">
                    <label className="label">Rango inicial</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={rangoInicial}
                        onChange={(e) => setRangoInicial(e.target.value)}
                        placeholder="Ej: 22000000"
                    />
                </div>
                <div className="flex-1">
                    <label className="label">Rango final</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={rangoFinal}
                        onChange={(e) => setRangoFinal(e.target.value)}
                        placeholder="Ej: 22999999"
                    />
                </div>
            </div>

            <div className="mb-3">
                <label className="label">Cantidad</label>
                <input
                    type="number"
                    className="input input-bordered w-full"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    placeholder="Ej: 1000000"
                />
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

export default ModalRangoApolonet;