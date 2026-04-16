import React from "react";
/**
 * @typedef {Object} ModalTheme
 * @property {string} iconBg - Clase de Tailwind para el fondo del ícono.
 * @property {string} iconColor - Clase de Tailwind para el color del ícono.
 * @property {string} btnColor - Clases de Tailwind para el estado normal y hover del botón principal.
 * @property {JSX.Element} icon - Elemento SVG correspondiente al tipo de alerta.
 */

/**
 * Configuración de temas visuales para el modal.
 * Define colores y símbolos según la intención de la acción.
 * @constant
 * @type {Object.<string, ModalTheme>}
 */

const TIPOS = {
  danger: {
    iconBg: "bg-red-100", iconColor: "text-red-600",
    btnColor: "bg-red-600 hover:bg-red-700",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
  },
  success: {
    iconBg: "bg-green-100", iconColor: "text-green-600",
    btnColor: "bg-green-600 hover:bg-green-700",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  warning: {
    iconBg: "bg-yellow-100", iconColor: "text-yellow-600",
    btnColor: "bg-yellow-500 hover:bg-yellow-600",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    ),
  },
  info: {
    iconBg: "bg-blue-100", iconColor: "text-blue-600",
    btnColor: "bg-blue-600 hover:bg-blue-700",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
      </svg>
    ),
  },
};

/**
 * `ConfirmModal` - Un diálogo de confirmación reutilizable y estilizado con Tailwind CSS.
 * * @example
 * <ConfirmModal 
 * isOpen={show} 
 * onClose={() => setShow(false)} 
 * onConfirm={handleDelete}
 * title="¿Eliminar registro?"
 * message="Esta acción no se puede deshacer."
 * type="danger"
 * />
 * * @param {Object} props
 * @param {boolean} props.isOpen - Controla la visibilidad del modal.
 * @param {function} props.onClose - Función para cerrar el modal (Cancelación o click fuera).
 * @param {function} props.onConfirm - Función que se ejecuta al confirmar la acción.
 * @param {string} props.title - Título principal del modal.
 * @param {string} props.message - Texto descriptivo o cuerpo del mensaje.
 * @param {('danger'|'success'|'warning'|'info')} [props.type="danger"] - Define el estilo visual y el icono.
 * @param {string} [props.confirmText="Confirmar"] - Texto del botón de acción.
 * @param {string} [props.cancelText="Cancelar"] - Texto del botón de cierre.
 */
const ConfirmModal = ({
  isOpen, onClose, onConfirm,
  title, message,
  type = "danger",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}) => {
  if (!isOpen) return null;

  const t = TIPOS[type] || TIPOS.danger;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ícono */}
        <div className="flex justify-center mb-4">
          <div className={`${t.iconBg} ${t.iconColor} rounded-full p-3`}>
            {t.icon}
          </div>
        </div>

        {/* Texto */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-sm text-gray-500">{message}</p>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => { onConfirm?.(); onClose(); }}
            className={`flex-1 px-4 py-2 rounded-xl text-white font-semibold text-sm transition-colors ${t.btnColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;