import { useState } from 'react';
import { downloadReportePorNumeroExcel, generarReportePorNumeroCarpeta } from '../../../api/CDR/CDRService';

const ModalReportePorNumero = ({ onClose }) => {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [loadingExcel, setLoadingExcel] = useState(false);
    const [loadingCarpeta, setLoadingCarpeta] = useState(false);
    const [error, setError] = useState('');
    const [resultadoCarpeta, setResultadoCarpeta] = useState(null);

    const validarFechas = () => {
        if (!fechaInicio || !fechaFin) {
            setError('Selecciona ambas fechas.');
            return false;
        }
        setError('');
        return true;
    };

    const handleDescargarExcel = async () => {
        if (!validarFechas()) return;

        try {
            setLoadingExcel(true);
            setResultadoCarpeta(null);

            const blob = await downloadReportePorNumeroExcel(fechaInicio, fechaFin);

            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `reporte_por_numero_${fechaInicio}_a_${fechaFin}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error descargando reporte por numero:', err);
            setError('No se pudo generar el reporte. Verifica las fechas o intenta de nuevo.');
        } finally {
            setLoadingExcel(false);
        }
    };

    const handleGenerarCarpeta = async () => {
        if (!validarFechas()) return;

        try {
            setLoadingCarpeta(true);
            setResultadoCarpeta(null);

            const resultado = await generarReportePorNumeroCarpeta(fechaInicio, fechaFin);
            setResultadoCarpeta(resultado);
        } catch (err) {
            console.error('Error generando reportes en carpeta:', err);
            setError('No se pudo generar los reportes en la carpeta. Verifica las fechas o intenta de nuevo.');
        } finally {
            setLoadingCarpeta(false);
        }
    };

    return (
        <div style={{ padding: '16px' }}>
            <div className="mb-3">
                <label className="form-label">Fecha inicio</label>
                <input
                    type="date"
                    className="form-control"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Fecha fin</label>
                <input
                    type="date"
                    className="form-control"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                />
            </div>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            {resultadoCarpeta && (
                <div className="alert alert-success py-2">
                    {resultadoCarpeta.message}
                    <br />
                    <small>Carpeta: {resultadoCarpeta.carpeta}</small>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button className="btn btn-success" onClick={handleDescargarExcel} disabled={loadingExcel || loadingCarpeta}>
                    {loadingExcel ? 'Generando...' : (
                        <>
                            <i className="pi pi-file-excel" style={{ marginRight: '6px' }} />
                            Descargar Excel (para Odoo)
                        </>
                    )}
                </button>

                <button className="btn btn-primary" onClick={handleGenerarCarpeta} disabled={loadingExcel || loadingCarpeta}>
                    {loadingCarpeta ? 'Generando...' : (
                        <>
                            <i className="pi pi-folder" style={{ marginRight: '6px' }} />
                            Generar carpeta (un Excel por número)
                        </>
                    )}
                </button>

                <button className="btn btn-secondary" onClick={onClose} disabled={loadingExcel || loadingCarpeta}>
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default ModalReportePorNumero;