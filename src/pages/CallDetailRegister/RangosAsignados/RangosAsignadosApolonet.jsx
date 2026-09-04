import { useState, useEffect, useCallback } from "react";
import { useModal } from "../../../context/ModalContext/ModalContext";
import DataGridAg from '../../../components/AgGrid/DataAgGrid';
import 'primeicons/primeicons.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ModalRangoApolonet from "../RangosModal/ModalRangoApolonet.jsx";
import { getRangosApolonet, eliminarRangoApolonet } from '../../../api/Rangos/RangosService.js';



const RangosAsignadosApolonet = () => {
    const { openModal, closeModal } = useModal();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState([]);
    const [rangoSeleccionadoId, setRangoSeleccionadoId] = useState("");

    const getInfoRangosApolonet = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const tempoCDR = await getRangosApolonet();
            setData(tempoCDR);
        } catch (error) {
            console.error("Error al cargar CDR ", error);
            setError("No se pudo cargar la lista de rangos Apolonet.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getInfoRangosApolonet();
    }, [getInfoRangosApolonet]);

    const handleNuevo = () => {
        openModal({
            title: "Nuevo rango Apolonet",
            size: "lg",
            showFooter: false,
            content: (
                <ModalRangoApolonet
                    rango={null}
                    onGuardado={() => {
                        closeModal();
                        getInfoRangosApolonet();
                    }}
                    onCancelar={closeModal}
                />
            ),
        });
    };

    const handleEditar = (rango) => {
        if (!rango) return;
        openModal({
            title: `Editar rango — ${rango.ciudad}`,
            size: "lg",
            showFooter: false,
            content: (
                <ModalRangoApolonet
                    rango={rango}
                    onGuardado={() => {
                        closeModal();
                        getInfoRangosApolonet();
                    }}
                    onCancelar={closeModal}
                />
            ),
        });
    };

    const handleEliminar = async (rango) => {
        if (!rango) {
            alert("Marca primero el checkbox del rango que quieres eliminar.");
            return;
        }
        if (!window.confirm(`¿Eliminar el rango ${rango.rango_inicial}-${rango.rango_final} de "${rango.ciudad}"?`)) {
            return;
        }
        try {
            await eliminarRangoApolonet(rango.id);
            setRangoSeleccionadoId("");
            getInfoRangosApolonet();
        } catch (error) {
            console.error("Error en solicitud", error);
            alert("No se pudo eliminar el rango.");
        }
    };

    const rangoSeleccionado = data.find((r) => String(r.id) === String(rangoSeleccionadoId));

    const handleToggleSeleccion = (rango) => {
        setRangoSeleccionadoId((actual) => (String(actual) === String(rango.id) ? "" : rango.id));
    };

    const columns = [
        {
            field: "_seleccionar",
            header: "",
            width: 50,
            sortable: false,
            frozen: "left",
            render: (rowData) => (
                <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={String(rowData.id) === String(rangoSeleccionadoId)}
                    onChange={() => handleToggleSeleccion(rowData)}
                />
            ),
        },
        { field: "id", header: "ID", frozen: "left", width: 70 },
        { field: "ciudad", header: "Ciudad", width: 200 },
        { field: "rango_inicial", header: "Rango Inicial", width: 200 },
        { field: "rango_final", header: "Rango Final", width: 200 },
        { field: "cantidad", header: "Cantidad", width: 150 },
    ];

    return (
        <div className="p-6 bg-[#1e3a5f] min-h-screen">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <h2 className="text-[22px] font-bold text-[#FF6D1F] m-0">
                    Rangos Asignados Apolonet
                </h2>

                <div className="flex items-center gap-2">
                    <button className="btn btn-success btn-sm" onClick={handleNuevo}>
                        <i className="pi pi-plus" />
                        Nuevo rango
                    </button>
                    <button
                        className="btn btn-warning btn-sm"
                        disabled={!rangoSeleccionado}
                        onClick={() => handleEditar(rangoSeleccionado)}
                    >
                        <i className="pi pi-pencil" />
                        Editar
                    </button>
                    <button
                        className="btn btn-error btn-sm"
                        disabled={!rangoSeleccionado}
                        onClick={() => handleEliminar(rangoSeleccionado)}
                    >
                        <i className="pi pi-trash" />
                        Eliminar
                    </button>
                </div>
            </div>

            {error && (
                <div className="alert alert-error mb-3">
                    <span>{error}</span>
                </div>
            )}

            <DataGridAg columns={columns} data={data} />
        </div>
    );
};

export default RangosAsignadosApolonet;