import React from 'react'
import Dropdown from '../../../components/UI/Dropdown'
import DataGridAg from '../../../components/AgGrid/DataAgGrid'


const RequisaModalNueva = () => {

  const columns = [
    { field: "id", header: "#", frozen: "left", width: 70 },
    { field: "requisa", header: "Requisa", frozen: "left", width: 130 },
    { field: "fechaRequisa", header: "Fecha Requisa" },
    { field: "fechaCreacion", header: "Fecha Creación" },
    { field: "solicitante", header: "Solicitante" },
    { field: "departamento", header: "Departamento" },
    { field: "estado", header: "Estado" }, // badge automático
    { field: "prioridad", header: "Prioridad" }, // badge automático
    { field: "producto", header: "Producto" },
    { field: "cantidad", header: "Cantidad" },
    { field: "stock", header: "Stock" },
    { field: "costo", header: "Costo" },
  ];

  const data = [
    {
      id: 1, requisa: "REQ-001", fechaRequisa: "2026-04-01", fechaCreacion: "2026-04-01",
      solicitante: "Mauricio", departamento: "Sistemas", estado: "Pendiente",
      prioridad: "Alta", producto: "Laptop", cantidad: 2, stock: 5, costo: "$1,000",
    },
    {
      id: 2, requisa: "REQ-002", fechaRequisa: "2026-04-02", fechaCreacion: "2026-04-02",
      solicitante: "Juan", departamento: "Compras", estado: "Aprobado",
      prioridad: "Media", producto: "Mouse", cantidad: 10, stock: 50, costo: "$200",
    },
  ];


  return (

    <>
      <div className='flex flex-wrap mb-2 border border-black rounded-md p-2 gap-4' >
        <div className='p-2 border border-black mb-1 rounded-sm'>
          <div className='p-1 mb-1 gap-1 border border-black rounded-sm' >
            <Dropdown
              label="No.Requisa"
              name="No.Requisa"
              options={[]}
              value={[]}
              onChange={[]}
            />
          </div>
          <div className='p-1 mb-1 gap-1 border border-black rounded-sm ' >
            <label className="floating-label p-1 ">
              <span className="label-text font-bold text-base-content">Fecha</span>
            </label>
            <input
              type="date"
              className="input w-s"
              value={[]}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div className='p-1 mb-1 gap-1 border border-black rounded-sm'>
            <div className="tooltip p-1" data-tip="Nuevo Item">
              <button className="btn btn-secondary p-3 mb-2">
                <i className="bi bi-plus"></i>
              </button>
            </div>
            <div className="tooltip p-1" data-tip="Editar">
              <button className="btn btn-info p-3 mb-2">
                <i className="bi bi-pencil-square"></i>
              </button>
            </div>
            <div className="tooltip p-1" data-tip="Borrar Item">
              <button className="btn btn-error p-3 mb-2">
                <i className="bi bi-trash3"></i>
              </button>
            </div>
            <div className="tooltip p-1" data-tip="Nueva Requisa">
              <button className="btn btn-accent p-3 mb-2">
                <i className="bi bi-file-earmark-plus"></i>
              </button>
            </div>
            <div className="tooltip p-1" data-tip="Guardar">
              <button className="btn btn-success  p-3 mb-2">
                <i className="bi bi-floppy"></i>
              </button>
            </div>
            <div className="tooltip p-1" data-tip="Imprimir">
              <button className="btn btn-active p-3 mb-2">
                <i className="bi bi-printer"></i>
              </button>
            </div>
          </div>
        </div>

        <div className='border border-black p-2 mb-2 rounded-sm'>
          <div className='flex flex-wrap border border-black mb-2 p-1 gap-5 rounded-sm'>
            <div>
              <Dropdown
                label="Solicitante:"
                name="Solicitante"
                options={[]}
                value={[]}
                onChange={[]}
              />
            </div>
            <div className=''>
              <Dropdown
                label="Solicita"
                name="Solicita"
                options={[]}
                value={[]}
                onChange={[]}
              />
            </div>
            <div className=''>
              <Dropdown
                label="Estado"
                name="Estado"
                options={[]}
                value={[]}
                onChange={[]}
              />
            </div>
            <div>
              <Dropdown
                label="Departamento"
                name="Departamento"
                options={[]}
                value={[]}
                onChange={[]}
              />
            </div>
          </div>

          <div className='flex flex-wrap border border-black p-1 gap-4 rounded-sm'>
            
            <div>
              <Dropdown
                label="Prioridad"
                name="prioridad"
                options={[]}
                value={[]}
                onChange={[]}
              />
            </div>
            <div>
              <textarea className="textarea" placeholder="Bio"></textarea>
            </div>
          </div>

        </div>
      </div>

      <div style={{ padding: "24px", background: "#09093e", minHeight: "100vh", borderRadius:"10px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#FF6D1F", marginBottom: "16px" }}>
          Historial de Requisas
        </h2>
        <DataGridAg columns={columns} data={data} />
      </div>

    </>
  )
}

export default RequisaModalNueva