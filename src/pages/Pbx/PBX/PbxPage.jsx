import { useState, useEffect, useCallback } from "react";
import { useModal } from "../../../context/ModalContext/ModalContext";
import DataGridAg from "../../../components/AgGrid/DataAgGrid";
import PbxModal from "../PBXMODAL/PbxModal";
import pbxService from "../../../api/pbx/pbxService";

// ============================================================================
// Página de administración de clientes PBX: alta, edición y baja del número
// padre y de los rangos que tiene asignados. Esto alimenta directamente a
// fn_reporte_detalle_plano_por_numero(), que consolida bajo el número padre
// cualquier llamada de un número dentro de su rango.
// ============================================================================

const PbxPage = () => {
    const { openModal, closeModal } = useModal();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [pbxSeleccionadoId, setPbxSeleccionadoId] = useState("");

    const cargarPbx = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const getPbxInfo = await pbxService.getPbxList();
            // "rangos" es un array de objetos -- lo paso a texto plano antes de
            // guardarlo en el estado, para que se vea igual que un campo normal.
            const formateado = (getPbxInfo || []).map((pbx) => ({
                ...pbx,
                rangosTexto:
                    (pbx.rangos || [])
                        .map((r) => `${r.rango_inicial}-${r.rango_final}`)
                        .join("  |  ") || "Sin rangos",
                activoTexto: pbx.activo ? "Activo" : "Inactivo",
            }));
            setData(formateado);
        } catch (err) {
            console.error("Error en solicitud", err);
            setError("No se pudo cargar la lista de PBX.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        cargarPbx();
    }, [cargarPbx]);

    const handleNuevo = () => {
        openModal({
            title: "Nuevo cliente PBX",
            size: "lg",
            showFooter: false,
            content: (
                <PbxModal
                    pbx={null}
                    onGuardado={() => {
                        closeModal();
                        cargarPbx();
                    }}
                    onCancelar={closeModal}
                />
            ),
        });
    };

    const handleEditar = (pbx) => {
        if (!pbx) return;
        openModal({
            title: `Editar PBX — ${pbx.nombre_cliente}`,
            size: "lg",
            showFooter: false,
            content: (
                <PbxModal
                    pbx={pbx}
                    onGuardado={() => {
                        closeModal();
                        cargarPbx();
                    }}
                    onCancelar={closeModal}
                />
            ),
        });
    };

    const handleEliminar = async (pbx) => {
        if (!pbx) {
            alert("Marca primero el checkbox del PBX que quieres eliminar.");
            return;
        }
        if (
            !window.confirm(
                `¿Eliminar el PBX de "${pbx.nombre_cliente}" (${pbx.numero_padre}) y todos sus rangos asignados?`
            )
        ) {
            return;
        }
        try {
            await pbxService.eliminarPbx(pbx.id);
            setPbxSeleccionadoId("");
            cargarPbx();
        } catch (err) {
            console.error("Error en solicitud", err);
            alert("No se pudo eliminar el PBX.");
        }
    };

    const pbxSeleccionado = data.find((p) => String(p.id) === String(pbxSeleccionadoId));

    // Marcar el checkbox de una fila selecciona ese PBX; volver a marcarlo lo
    // deselecciona. Es selección única (como un radio) porque Editar solo
    // tiene sentido para un PBX a la vez.
    const handleToggleSeleccion = (pbx) => {
        setPbxSeleccionadoId((actual) => (String(actual) === String(pbx.id) ? "" : pbx.id));
    };

    // OJO: tu DataGridAg (AgGridReact por dentro) solo lee estas claves por
    // columna: field, header, sortable, hide, editable, frozen, width, render
    // -- "render" recibe la FILA completa (no solo el valor), así que ahí
    // metemos el checkbox real.
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
                    checked={String(rowData.id) === String(pbxSeleccionadoId)}
                    onChange={() => handleToggleSeleccion(rowData)}
                />
            ),
        },
        { field: "nombre_cliente", header: "Cliente", width: 300 },
        { field: "numero_padre", header: "Número padre", width: 180 },
        { field: "rangosTexto", header: "Rangos asignados", width: 400 },
        { field: "activoTexto", header: "Estado", width: 130 },
    ];

    return (
        <div style={{ padding: "24px", background: "#1e3a5f", minHeight: "100vh" }}>
            {/* Fila superior: título a la izquierda, acciones a la derecha.
                "flex", "justify-between", "gap-3", etc. son clases reales de
                Tailwind (la base de DaisyUI) -- las de Bootstrap (d-flex,
                justify-content-between...) no hacían nada en tu proyecto, por
                eso los botones se veían amontonados. */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <h2
                    className="flex items-center gap-2 text-2xl font-bold m-0"
                    style={{ color: "#FF6D1F" }}
                >
                    <i className="pi pi-sitemap" />
                    PBX
                </h2>

                <div className="flex items-center gap-2">
                    <button className="btn btn-success btn-sm" onClick={handleNuevo}>
                        <i className="pi pi-plus" />
                        Nuevo PBX
                    </button>
                    <button
                        className="btn btn-warning btn-sm"
                        disabled={!pbxSeleccionado}
                        onClick={() => handleEditar(pbxSeleccionado)}
                    >
                        <i className="pi pi-pencil" />
                        Editar
                    </button>
                    <button
                        className="btn btn-error btn-sm"
                        disabled={!pbxSeleccionado}
                        onClick={() => handleEliminar(pbxSeleccionado)}
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

export default PbxPage;