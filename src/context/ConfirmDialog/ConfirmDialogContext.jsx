import React, { createContext, useContext, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-blue/theme.css';

const ConfirmDialogContext = createContext();

export const ConfirmDialogProvider = ({ children }) => {
    const toast = useRef(null);

    // ── Confirmación genérica ─────────────────────────────────
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

    // ── Atajos por tipo ───────────────────────────────────────
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

    // Toast para notificaciones después de confirmar
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

// Helper para clases de botón
const severityClass = (severity) => {
    const classes = {
        danger:  "p-button-danger",
        success: "p-button-success",
        warn:    "p-button-warning",
        info:    "p-button-info",
    };
    return classes[severity] || "p-button-warning";
};

export const useConfirm = () => useContext(ConfirmDialogContext);