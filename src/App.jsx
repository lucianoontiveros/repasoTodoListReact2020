import { useState } from 'react'
import { nanoid } from 'nanoid'

function App() {
  const [tarea, setTarea] = useState('')
  const [tareas, setTareas] = useState([])

  const agregarTarea = e => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('Indicar una tarea')
      return
    }
    setTareas([...tareas, {id: nanoid(), nombreTarea: tarea}])
    console.log(tareas)
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
                tareas.map( item => (
                  <li key={item.id} className="list-group-item">
                    <span className="lead">{item.nombreTarea}</span>
                    <button className="btn btn-danger btn-sm float-end  mx-2 ">marcar</button>
                    <button className="btn btn-warning btn-sm float-end ">eliminar</button>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="col-4">
            <h2 className='text-center'>Formulario</h2>
            <form onSubmit={agregarTarea}>
              <input 
                type="text" 
                className="form-control mb-2" 
                placeholder='Ingrese Tarea'
                onChange={ e => setTarea(e.target.value)}
              />
              <button type='submit' className="btn btn-dark btn-block">Agregar</button>
            </form>
          </div>
        </div>
      </div>
      

    </>
  )
}

export default App
