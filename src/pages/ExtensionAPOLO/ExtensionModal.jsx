import React from 'react'
import { useConfirm } from '../../context/ConfirmDialog/ConfirmDialogContext';
import { postExtensiones } from '../../api/services/extensionesService/extenssionesService';
import useForm from '../../hook/useForm';

const ExtensionModal = ({ onClose }) => {

    const { confirmSave, confirmLeave } = useConfirm();

    const { form, errors, loading, handleChange, resetForm, handleSubmit } = useForm({
        nombre:       "",
        departamento: "",
        extension:    "",
        puesto:       "",
        correo:       "",
        estado:       "Habilitado",
    });

    const guardar = handleSubmit(
        async (data) => {
            await postExtensiones(data);
            onClose();
        },
        ["nombre", "departamento", "extension", "puesto", "correo"]
    );

    return (
        <div>
            {/* Botones */}
            <div className="flex flex-wrap gap-1 mb-1 p-2">
                <button
                    onClick={guardar}
                    disabled={loading}
                    className="btn btn-success btn-sm tooltip tooltip-right gap-2 p-4 mb-2"
                    data-tip="Guardar"
                >
                    <i className="bi bi-floppy2 gap-1">
                        {loading ? " Guardando..." : " Guardar"}
                    </i>
                </button>

                <button
                    onClick={() => confirmLeave({
                        onAccept: () => onClose()
                    })}
                    className="btn btn-warning btn-sm tooltip tooltip-left gap-2 p-4 mb-2"
                    data-tip="Cancelar"
                >
                    <i className="bi bi-x-lg gap-1"> Cancelar </i>
                </button>
            </div>

            {/* Fila 1 */}
            <div className='border border-black p-2 mb-2 rounded-sm'>
                <div className='flex flex-wrap gap-5 p-1'>

                    <div className="flex flex-col">
                        <label className="label">
                            <span className="label-text font-bold">Nombre</span>
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            placeholder="Nombre completo"
                            className="input input-bordered w-xs"
                        />
                        {errors.nombre && <span className="text-red-500 text-xs mt-1">{errors.nombre}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label className="label">
                            <span className="label-text font-bold">Departamento</span>
                        </label>
                        <input
                            type="text"
                            name="departamento"
                            value={form.departamento}
                            onChange={handleChange}
                            placeholder="Departamento"
                            className="input input-bordered w-xs"
                        />
                        {errors.departamento && <span className="text-red-500 text-xs mt-1">{errors.departamento}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label className="label">
                            <span className="label-text font-bold">Extension</span>
                        </label>
                        <input
                            type="number"
                            name="extension"
                            value={form.extension}
                            onChange={handleChange}
                            placeholder="Ej: 1136"
                            className="input input-bordered w-xs"
                        />
                        {errors.extension && <span className="text-red-500 text-xs mt-1">{errors.extension}</span>}
                    </div>

                </div>
            </div>

            {/* Fila 2 */}
            <div className='border border-black p-2 mb-2 rounded-sm'>
                <div className='flex flex-wrap gap-5 p-1'>

                    <div className="flex flex-col">
                        <label className="label">
                            <span className="label-text font-bold">Puesto</span>
                        </label>
                        <input
                            type="text"
                            name="puesto"
                            value={form.puesto}
                            onChange={handleChange}
                            placeholder="Puesto o cargo"
                            className="input input-bordered w-xs"
                        />
                        {errors.puesto && <span className="text-red-500 text-xs mt-1">{errors.puesto}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label className="label">
                            <span className="label-text font-bold">Correo</span>
                        </label>
                        <input
                            type="email"
                            name="correo"
                            value={form.correo}
                            onChange={handleChange}
                            placeholder="correo@empresa.com"
                            className="input input-bordered w-xs"
                        />
                        {errors.correo && <span className="text-red-500 text-xs mt-1">{errors.correo}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label className="label">
                            <span className="label-text font-bold">Estado</span>
                        </label>
                        <select
                            name="estado"
                            value={form.estado}
                            onChange={handleChange}
                            className="select select-bordered w-xs"
                        >
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </select>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default ExtensionModal;