// src/pages/enterprise/CarreraListado.jsx
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './CarreraListado.css'
import axios from 'axios';

export default function CarreraListado() {
  const navigate = useNavigate();

  const carrers2 = [];

  const [carrers, setCarrers] = useState(carrers2);
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);

  useEffect(() => {
    _cargarCarreras();
  }, []);

  const _cargarCarreras = async () => {
    try{
      const response = await axios.get('/api/v1/carrers');
      // console.log(response.data)
      setCarrers(response.data.data)
      setMessage(response.data.message)
      setStatusMessage(response.data.success)
    }catch(error){
      console.error(error)
    }
  }

  const _eliminar = async (e, id) => {
    try{
      const response = await axios.delete('/api/v1/carrers/' + id);
      // console.log(response.data)
      _cargarCarreras();

      setMessage(response.data.message)
      setStatusMessage(response.data.success)
    }catch(error){
      console.error(error)
    }
  }

  const _editar = async (e, id) => {
    navigate('/enterprise/carrers/' + id + '/edit')
  }

  return (
    <>
      <h1>Carrera Listado</h1>
      <p>Bienvenido al panel de empresa.</p>
      {message != "" ? (
        <div className={`alert ${statusMessage ? 'alert-success' : 'alert-danger'}`} role="alert" id="alertMessage">
          {message}
        </div>
        ) : (<></>)
      }

      <NavLink to="/enterprise/carrers/new" className="btn btn-secondary">
        Agregar Carrera
      </NavLink>

      <table className='table'>
        <thead>
          <th>id</th>
          <th>nombre</th>
          <th>operaciones</th>
        </thead>
        <tbody>
          {Array.isArray(carrers) && carrers.map((carrer) => (
            <tr>
              <td>{carrer.id}</td>
              <td>{carrer.name}</td>
              <td>
                <button onClick={(e) => _editar(e, carrer.id)}>Editar</button>
                <button onClick={(e) => _eliminar(e, carrer.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}