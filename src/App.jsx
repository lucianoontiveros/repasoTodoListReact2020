import { useState } from 'react'
import { nanoid } from 'nanoid'

function App() {
  const [tarea, setTarea] = useState('')
  const [tareas, setTareas] = useState([])
  const [modoEdicion, setmodoEdicion] = useState(false)
  const [id, setId] = useState('')

  const agregarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Indicar una tarea')
      return
    }
    setTareas([...tareas, {id: nanoid(), nombreTarea: tarea}])
    setTarea('')
  }

  const handleclick = (id, tarea) => {
      console.log("identificando ID " + id + "Corresponde al a tarea " + tarea)
      const buscandoId = tareas.filter(item => item.id != id)
      setTareas(buscandoId)
      console.log(buscandoId)
  }

  const handleEditar = (item) => {
    setmodoEdicion(true)
    setTarea(item.nombreTarea)
    setId(item.id)
  }

  const editarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Indicar una tarea')
      return
    }
    const arrayEditado = tareas.map(item => item.id === id ? { id, nombreTarea: tarea} : item)
    setTareas(arrayEditado)
    setmodoEdicion(false)
    setTarea('')
    setId('')
  }

  return ( 
    <>
      <div className="container">
        <h1 className='text-center'> CRUD Simple</h1>
        <hr/>
        <div className="row">
          <div className="col-8">
            <h2 className='text-center'>Lista de tareas </h2>
            <ul className="list-group">
              {

                tareas.length === 0 ? (<li className="text-center list-group-item"> No tiene tareas</li>):
                (tareas.map( item => (
                  <li key={item.id} className="list-group-item">
                    <span className="lead">{item.nombreTarea}</span>
                    <button 
                      className="btn btn-warning btn-sm float-end  mx-2 "
                      onClick={() => handleEditar(item)}
                      >Editar</button>
                    <button 
                      className="btn btn-danger btn-sm float-end "
                      onClick={() => handleclick(item.id, item.nombreTarea)}
                      >eliminar</button>
                  </li>
                )))
              }
            </ul>
          </div>
          <div className="col-4">
            <h2 className='text-center'>
              {
                modoEdicion ? "Editar Tareas" : "AgregarTarea"
              }
            </h2>
            <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
              <input 
                type="text" 
                className="form-control mb-2" 
                placeholder='Ingrese Tarea'
                onChange={ e => setTarea(e.target.value)}
                value={tarea}
              />
              {
                modoEdicion ? 
                (<button type='submit' className="btn btn-warning btn-block"> Editar </button>) 
                : 
                (<button type='submit' className="btn btn-dark btn-block"> Agregar</button>)
              }
              
            </form>
          </div>
        </div>
      </div>
      

    </>
  )
}

export default App
