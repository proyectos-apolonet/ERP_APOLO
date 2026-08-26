import React, { useRef, useState } from "react";
import { uploadCdrFile } from "../../../api/CDR/CDRService";

/**
 * @file CallDetailRegisterPage.jsx
 * @description Interfaz para subir archivos CDR (ENTICE Format 2.4+) desde el front.
 * El backend hace todo el trabajo pesado (hash, deduplicación, parseo vía
 * sp_procesar_cdr()); esta pantalla solo sube el archivo y muestra el resultado.
 */

const ESTADOS = {
    IDLE: "idle",
    SUBIENDO: "subiendo",
    EXITO: "exito",
    DUPLICADO: "duplicado",
    ERROR: "error",
};

const ModalCDRCarga = () => {
    const [archivo, setArchivo] = useState(null);
    const [estado, setEstado] = useState(ESTADOS.IDLE);
    const [progreso, setProgreso] = useState(0);
    const [resultado, setResultado] = useState(null);
    const [mensajeError, setMensajeError] = useState("");
    const inputRef = useRef(null);

    const handleSeleccionArchivo = (e) => {
        const file = e.target.files?.[0] ?? null;
        setArchivo(file);
        setEstado(ESTADOS.IDLE);
        setResultado(null);
        setMensajeError("");
    };

    const handleSubir = async () => {
        if (!archivo) return;
        setEstado(ESTADOS.SUBIENDO);
        setProgreso(0);
        try {
            const data = await uploadCdrFile(archivo, setProgreso);
            setResultado(data);
            setEstado(data.duplicado ? ESTADOS.DUPLICADO : ESTADOS.EXITO);
        } catch (err) {
            setMensajeError(err?.response?.data?.mensaje || "No se pudo subir el archivo CDR.");
            setEstado(ESTADOS.ERROR);
        }
    };

    const handleLimpiar = () => {
        setArchivo(null);
        setEstado(ESTADOS.IDLE);
        setResultado(null);
        setMensajeError("");
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex items-center gap-3 mb-6">
                <i className="bi bi-telephone text-3xl" />
                <h1 className="text-2xl font-bold">Registro de Llamadas (CDR)</h1>
            </div>

            <div className="card bg-base-200 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-lg">Subir archivo CDR</h2>
                    <p className="text-sm opacity-70">
                        Selecciona el archivo de texto exportado por la central. El sistema detecta
                        automáticamente si ya fue cargado antes.
                    </p>

                    <input
                        ref={inputRef}
                        type="file"
                        accept=".txt"
                        className="file-input file-input-bordered w-full mt-4"
                        onChange={handleSeleccionArchivo}
                        disabled={estado === ESTADOS.SUBIENDO}
                    />

                    {archivo && (
                        <p className="text-sm mt-2">
                            Archivo seleccionado: <span className="font-medium">{archivo.name}</span>{" "}
                            ({(archivo.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                    )}

                    {estado === ESTADOS.SUBIENDO && (
                        <div className="mt-4">
                            <progress className="progress progress-primary w-full" value={progreso} max="100" />
                            <p className="text-sm text-center mt-1">{progreso}%</p>
                        </div>
                    )}

                    {estado === ESTADOS.EXITO && resultado && (
                        <div role="alert" className="alert alert-success mt-4">
                            <i className="bi bi-check-circle-fill text-xl" />
                            <span>
                                Archivo cargado correctamente
                                {typeof resultado.archivo?.totalLineas === "number" &&
                                    ` (${resultado.archivo.totalLineas} registros).`}
                            </span>
                        </div>
                    )}

                    {estado === ESTADOS.DUPLICADO && resultado && (
                        <div role="alert" className="alert alert-warning mt-4">
                            <i className="bi bi-exclamation-triangle-fill text-xl" />
                            <span>
                                Ya tienes este CDR registrado
                                {resultado.archivo?.subido_en &&
                                    ` (subido el ${new Date(resultado.archivo.subido_en).toLocaleString()}).`}
                            </span>
                        </div>
                    )}

                    {estado === ESTADOS.ERROR && (
                        <div role="alert" className="alert alert-error mt-4">
                            <i className="bi bi-x-circle-fill text-xl" />
                            <span>{mensajeError}</span>
                        </div>
                    )}

                    <div className="card-actions justify-end mt-4">
                        <button
                            className="btn btn-ghost"
                            onClick={handleLimpiar}
                            disabled={estado === ESTADOS.SUBIENDO}
                            type="button"
                        >
                            Limpiar
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSubir}
                            disabled={!archivo || estado === ESTADOS.SUBIENDO}
                            type="button"
                        >
                            {estado === ESTADOS.SUBIENDO ? (
                                <>
                                    <span className="loading loading-spinner loading-sm" />
                                    Subiendo...
                                </>
                            ) : (
                                "Subir CDR"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCDRCarga;