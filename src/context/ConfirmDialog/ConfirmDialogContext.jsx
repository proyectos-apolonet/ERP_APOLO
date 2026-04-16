import React, { createContext, useContext, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-blue/theme.css';

/**
 * @typedef {Object} ConfirmOptions
 * @property {string} message - Mensaje que se mostrará en el cuerpo del diálogo.
 * @property {string} [header="¿Estás seguro?"] - Título del diálogo.
 * @property {string} [icon="pi pi-exclamation-triangle"] - Clase del icono de PrimeIcons.
 * @property {('warn'|'danger'|'success'|'info')} [severity="warn"] - Nivel de severidad para el estilo del botón.
 * @property {string} [acceptLabel="Sí, confirmar"] - Texto del botón de aceptación.
 * @property {string} [rejectLabel="Cancelar"] - Texto del botón de rechazo.
 * @property {function} [onAccept] - Callback ejecutado al confirmar.
 * @property {function} [onReject] - Callback ejecutado al cancelar.
 */
const ConfirmDialogContext = createContext();

/**
 * `ConfirmDialogProvider` - Proveedor de contexto para diálogos de confirmación y notificaciones Toast.
 * * Este componente centraliza la lógica de PrimeReact para mostrar alertas de confirmación
 * y mensajes de notificación (Toast) en toda la aplicación sin necesidad de declarar
 * el componente en cada página.
 * * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 */
export const ConfirmDialogProvider = ({ children }) => {
    /** @type {React.MutableRefObject<Toast>} */
    const toast = useRef(null);

    /**
     * Función base para disparar un diálogo de confirmación.
     * @param {ConfirmOptions} options - Configuración del diálogo.
     */
    const confirm = ({ 
        message, 
        header = "¿Estás seguro?", 
        icon = "pi pi-exclamation-triangle",
        severity = "warn",       // warn | danger | success | info
        acceptLabel = "Sí, confirmar",
        rejectLabel = "Cancelar",
        onAccept, 
        onReject 
    }) => {
        confirmDialog({
            message,
            header,
            icon,
            acceptClassName: severityClass(severity),
            acceptLabel,
            rejectLabel,
            accept: () => {
                onAccept?.();
            },
            reject: () => {
                onReject?.();
            }
        });
    };

  /**
     * Atajo para diálogos de eliminación.
     * @param {Pick<ConfirmOptions, 'message'|'onAccept'|'onReject'>} options
     */
    const confirmDelete = ({ message = "¿Deseas eliminar este registro?", onAccept, onReject }) => {
        confirm({
            message,
            header: "Confirmar eliminación",
            icon: "pi pi-trash",
            severity: "danger",
            acceptLabel: "Sí, eliminar",
            onAccept,
            onReject,
        });
    };

    /**
     * Atajo para confirmación de guardado de datos.
     * @param {Pick<ConfirmOptions, 'message'|'onAccept'|'onReject'>} options
     */
    const confirmSave = ({ message = "¿Deseas guardar los cambios?", onAccept, onReject }) => {
        confirm({
            message,
            header: "Confirmar cambios",
            icon: "pi pi-save",
            severity: "success",
            acceptLabel: "Sí, guardar",
            onAccept,
            onReject,
        });
    };

    /**
     * Atajo para confirmación de cierre de sesión.
     * @param {Pick<ConfirmOptions, 'onAccept'|'onReject'>} options
     */
    const confirmLogout = ({ onAccept, onReject }) => {
        confirm({
            message: "¿Estás seguro que deseas cerrar sesión?",
            header: "Cerrar sesión",
            icon: "pi pi-sign-out",
            severity: "warn",
            acceptLabel: "Sí, salir",
            onAccept,
            onReject,
        });
    };

    /**
     * Atajo para advertir sobre cambios no guardados al intentar salir de una vista.
     * @param {Pick<ConfirmOptions, 'onAccept'|'onReject'>} options
     */
    const confirmLeave = ({ onAccept, onReject }) => {
        confirm({
            message: "Tienes cambios sin guardar. ¿Deseas salir de todas formas?",
            header: "Cambios sin guardar",
            icon: "pi pi-exclamation-circle",
            severity: "warn",
            acceptLabel: "Sí, salir",
            rejectLabel: "Quedarme",
            onAccept,
            onReject,
        });
    };

   /**
     * Muestra una notificación flotante (Toast).
     * @param {('success'|'info'|'warn'|'error')} severity - Tipo de notificación.
     * @param {string} summary - Título de la notificación.
     * @param {string} detail - Mensaje detallado.
     */
    const notify = (severity = "success", summary, detail) => {
        toast.current?.show({ severity, summary, detail, life: 3000 });
    };

    return (
        <ConfirmDialogContext.Provider value={{ confirm, confirmDelete, confirmSave, confirmLogout, confirmLeave, notify }}>
            {children}
            <ConfirmDialog />
            <Toast ref={toast} />
        </ConfirmDialogContext.Provider>
    );
};

/**
 * Mapea la severidad de PrimeReact a clases CSS de botones de PrimeIcons.
 * @private
 * @param {string} severity 
 * @returns {string} Clase CSS.
 */
const severityClass = (severity) => {
    const classes = {
        danger:  "p-button-danger",
        success: "p-button-success",
        warn:    "p-button-warning",
        info:    "p-button-info",
    };
    return classes[severity] || "p-button-warning";
};

/**
 * Hook personalizado para acceder a las funciones de confirmación y notificación.
 * @returns {{ confirm: Function, confirmDelete: Function, confirmSave: Function, confirmLogout: Function, confirmLeave: Function, notify: Function }}
 */
export const useConfirm = () => useContext(ConfirmDialogContext);