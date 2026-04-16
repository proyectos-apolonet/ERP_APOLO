import React from 'react'

/**
 * @typedef {Object} ModalSizes
 * @property {string} sm - max-w-xl (Pequeño)
 * @property {string} md - max-w-3xl (Mediano)
 * @property {string} lg - max-w-5xl (Grande)
 * @property {string} xl - max-w-7xl (Extra Grande)
 * @property {string} full - max-w-10xl (Ancho máximo)
 */

/**
 * Diccionario de anchos máximos permitidos para el modal.
 * @constant
 */
const SIZES = {
    sm: "max-w-xl",
    md: "max-w-3xl",
    lg: "max-w-5xl",
    xl: "max-w-7xl",
    full: "max-w-10xl"
};

/**
 * `GlobalModal` - Un contenedor de ventana modal versátil y responsivo.
 * * * Características:
 * - Soporta diferentes tamaños predefinidos.
 * - Fondo con desenfoque (backdrop-blur).
 * - Adaptable a temas (Dark/Light) mediante clases de DaisyUI (`bg-base-100`).
 * - Scroll interno independiente para contenido largo.
 * * @example
 * <GlobalModal 
 * isOpen={showModal} 
 * onClose={() => setShowModal(false)} 
 * title="Detalles del Registro"
 * size="lg"
 * content={<p>Este es el cuerpo del modal</p>}
 * />
 * * @param {Object} props
 * @param {boolean} props.isOpen - Estado que determina si el modal es visible.
 * @param {function} props.onClose - Función para cerrar el modal.
 * @param {string} props.title - Título que aparece en la cabecera.
 * @param {React.ReactNode} props.content - Contenido JSX que se renderizará en el cuerpo.
 * @param {('sm'|'md'|'lg'|'xl'|'full')} [props.size="xl"] - Ancho máximo del modal.
 * @param {boolean} [props.showFooter=false] - Determina si se muestra la barra de botones inferior.
 * @param {function} [props.onConfirm] - Función a ejecutar al hacer clic en el botón principal.
 * @param {string} [props.confirmText="Confirmar"] - Etiqueta del botón principal.
 * @param {string} [props.cancelText="Cancelar"] - Etiqueta del botón de cierre.
 * @param {string} [props.confirmColor="btn-primary"] - Clase de DaisyUI para el color del botón principal.
 */
const GlobalModal = ({
    isOpen,
    onClose,
    title,
    content,
    size = "xl",
    showFooter = false,
    onConfirm,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    confirmColor = "btn-primary" // Cambiado a clase de DaisyUI
}) => {

  /* Si el modal no está abierto, no renderizamos nada en el DOM */
    if(!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          // CAMBIO: bg-base-100 (fondo del tema) y text-base-content (color de texto del tema)
          className={`bg-base-100 text-base-content rounded-2xl shadow-2xl w-full ${SIZES[size]} flex flex-col border border-base-300`}
          style={{ maxHeight: "90vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {/* CAMBIO: border-base-300 para que el borde cambie con el tema */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-base-300">
            <h3 className="text-xl font-bold">{title}</h3>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Contenido */}
          <div className="px-6 py-4 overflow-y-auto flex-1">
            {content}
          </div>

          {/* Footer */}
          {showFooter && (
            <div className="flex gap-3 px-6 py-4 border-t border-base-300">
              <button
                onClick={onClose}
                className="btn btn-outline flex-1"
              >
                {cancelText}
              </button>
              <button
                onClick={() => { onConfirm?.(); onClose(); }}
                className={`btn flex-1 ${confirmColor}`}
              >
                {confirmText}
              </button>
            </div>
          )}
        </div>
      </div>
    )
}

export default GlobalModal;