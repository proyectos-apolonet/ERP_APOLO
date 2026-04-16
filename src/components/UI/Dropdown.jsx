import React from 'react';

/**
 * @typedef {Object} DropdownOption
 * @property {string|number} value - El valor real que se almacenará y enviará.
 * @property {string} label - El texto descriptivo que verá el usuario.
 */

/**
 * `Dropdown` - Un componente de selección desplegable personalizado con estilos de DaisyUI.
 * * Este componente utiliza el sistema de `dropdown` de CSS para el menú y simula el comportamiento
 * de un evento de cambio de input nativo para mantener la compatibilidad con manejadores genéricos.
 * * @example
 * const opciones = [{ value: 'hn', label: 'Honduras' }, { value: 'usa', label: 'Estados Unidos' }];
 * * <Dropdown 
 * label="Seleccione País"
 * name="pais"
 * options={opciones}
 * value={formData.pais}
 * onChange={handleChange}
 * />
 * * @param {Object} props
 * @param {string} [props.label] - Texto de la etiqueta flotante sobre el dropdown.
 * @param {string} props.name - Nombre del campo (clave para el objeto de estado).
 * @param {DropdownOption[]} [props.options=[]] - Lista de opciones a mostrar.
 * @param {string|number} props.value - El valor actualmente seleccionado.
 * @param {function} props.onChange - Callback que recibe un objeto `{ target: { name, value } }`.
 * @param {string} [props.placeholder="Seleccionar..."] - Texto a mostrar cuando no hay selección.
 */

const Dropdown = ({ label, name, options = [], value, onChange, placeholder = "Seleccionar..." }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="floating-label">
          <span className="label-text font-bold text-base-content">{label}</span>
        </label>
      )}
      
      <div className="dropdown w-60 p-2">
        <div 
          tabIndex={0} 
          role="button" 
          className="btn btn-outline w-full justify-between font-normal border-base-300 bg-base-100 hover:bg-base-200 text-base-content"
        >
          {/* Protección contra null/undefined con optional chaining */}
          {options?.find(opt => opt.value === value)?.label || placeholder}
          
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>

        <ul 
          tabIndex={0} 
          className="dropdown-content z-[100] menu p-2 shadow-xl bg-base-100 rounded-box w-full border border-base-300 mt-1"
        >
          {options?.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                className={value === opt.value ? "active" : ""}
                onClick={() => {
                  onChange({ target: { name, value: opt.value } });
                  document.activeElement.blur();
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;