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