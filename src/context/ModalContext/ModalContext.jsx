import React, { createContext, useContext, useState } from 'react'
import GlobalModal from '../GlobalContext/GlobalModal';

/**
 * @typedef {Object} ModalConfig
 * @property {string} title - Título que se mostrará en la cabecera del modal.
 * @property {React.ReactNode} content - Componente o JSX que se renderizará en el cuerpo.
 * @property {('sm'|'md'|'lg'|'xl'|'full')} [size="xl"] - Ancho máximo del modal.
 * @property {boolean} [showFooter=false] - Determina si se incluyen botones de acción al pie.
 * @property {function} [onConfirm] - Lógica a ejecutar cuando se presiona el botón principal.
 * @property {string} [confirmText="Confirmar"] - Texto del botón de acción.
 * @property {string} [cancelText="Cancelar"] - Texto del botón de cierre.
 * @property {string} [confirmColor="btn-primary"] - Clase de DaisyUI para el color del botón.
 */
const ModalContext = createContext();

/**
 * `ModalProvider` - Proveedor de contexto global para la gestión de ventanas modales.
 * * Este componente centraliza la instancia de `GlobalModal` en la raíz de la aplicación,
 * permitiendo disparar diálogos desde cualquier nivel de la jerarquía mediante el hook `useModal`.
 * * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes envueltos que tendrán acceso al contexto.
 */
export const ModalProvider = ({ children }) => {

    /**
     * @state {Object} modal - Almacena el estado de apertura y la configuración dinámica del modal.
     */
    const [modal, setModal] = useState({ isOpen: false });

    /**
     * Abre el modal global inyectando la configuración recibida en el estado.
     * @param {ModalConfig} config - Configuración completa para personalizar el modal.
     */
    const openModal = (config) => setModal({ isOpen: true, ...config });  // ← fix
    
    /**
     * Cierra el modal reseteando el estado de apertura.
     */
    const closeModal = () => setModal({ isOpen: false });

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <GlobalModal {...modal} onClose={closeModal} />
        </ModalContext.Provider>
    );
};

/**
 * Hook personalizado para acceder a las funciones del modal global.
 * * @returns {{ openModal: function(ModalConfig): void, closeModal: function(): void }}
 */
export const useModal = () => useContext(ModalContext);