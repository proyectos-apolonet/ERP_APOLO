import React from "react";

/**
 * @typedef {Object} FormField
 * @property {string} name - Nombre único del campo (usado como clave en 'values').
 * @property {string} label - Texto que se mostrará sobre el input.
 * @property {string} [type='text'] - Tipo de entrada ('text', 'number', 'email', 'password', 'select', 'date').
 * @property {string} [placeholder] - Texto de ayuda dentro del input.
 * @property {number} [colSpan=12] - Ancho en sistema de 12 columnas para pantallas medianas (md).
 * @property {Array<{value: string|number, label: string}>} [options] - Solo para tipo 'select': array de opciones.
 */

/**
 * `DynamicForm` - Generador de formularios basado en esquemas JSON.
 * * Este componente renderiza automáticamente un formulario con diseño responsivo
 * utilizando un sistema de grid de 12 columnas. Soporta inputs estándar y selectores.
 * * @example
 * const esquema = [
 * { name: 'nombre', label: 'Nombre Completo', colSpan: 6 },
 * { name: 'rol', label: 'Rol de Usuario', type: 'select', options: [{value: 1, label: 'Admin'}], colSpan: 6 }
 * ];
 * * <DynamicForm 
 * schema={esquema} 
 * values={formData} 
 * handleChange={onChangeHandler} 
 * onSubmit={saveData} 
 * />
 * * @param {Object} props
 * @param {FormField[]} props.schema - Definición de la estructura y campos del formulario.
 * @param {Object} props.values - Estado actual de los datos del formulario { [name]: value }.
 * @param {function} props.handleChange - Función para manejar cambios (e) => setValues(...).
 * @param {function} props.onSubmit - Función disparada al enviar el formulario.
 * @param {string} [props.buttonText="Enviar"] - Texto del botón de acción principal.
 */

const DynamicForm = ({ schema, values, handleChange, onSubmit, buttonText = "Enviar" }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 p-6 bg-base-200 rounded-xl shadow-lg">
      {/* Definimos un grid de 12 columnas para tener máxima precisión */}
      <div className="grid grid-cols-12 gap-x-4 gap-y-2">
        {schema.map((field) => (
          <div 
            key={field.name} 
            // Controlamos el tamaño: si no trae 'colSpan', por defecto usa 12 (ancho total)
            // md: usa el colSpan definido en el esquema
            className={`form-control col-span-12 md:col-span-${field.colSpan || 12}`}
          >
            <label className="label">
              <span className="label-text font-bold">{field.label}</span>
            </label>
            
            {field.type === 'select' ? (
              <select 
                name={field.name}
                className="select select-bordered w-full"
                value={values[field.name]}
                onChange={handleChange}
              >
                {field.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || 'text'}
                name={field.name}
                placeholder={field.placeholder}
                className="input input-bordered w-full"
                value={values[field.name] || ''}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Botón ajustable: lo ponemos en un div para controlar su ubicación */}
      <div className="flex justify-end mt-6">
        <button type="submit" className="btn btn-primary px-10">
          {buttonText}
        </button>
      </div>
    </form>
  );
};