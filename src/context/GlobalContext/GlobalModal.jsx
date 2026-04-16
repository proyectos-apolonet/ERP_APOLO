import React from 'react'

const SIZES = {
    sm: "max-w-xl",
    md: "max-w-3xl",
    lg: "max-w-5xl",
    xl: "max-w-7xl",
    full: "max-w-10xl"
};

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

export default GlobalModal