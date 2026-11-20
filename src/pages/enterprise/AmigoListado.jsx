// src/pages/enterprise/AmigoListado.jsx
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AmigoListado.css'
import axios from 'axios';

export default function AmigoListado() {
  const navigate = useNavigate();

  const [amigos, setAmigos] = useState([]);
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);

  useEffect(() => {
    _cargarAmigos();
  }, []);

  const _cargarAmigos = async () => {
    try{
      const response = await axios.get('/api/v1/amigos');
      // console.log(response.data)
      setAmigos(response.data.data)
      setMessage(response.data.message)
      setStatusMessage(response.data.success)
    }catch(error){
      console.error(error)
    }
  }

  const _eliminar = async (e, id) => {
    try{
      const response = await axios.delete('/api/v1/amigos/' + id);
      // console.log(response.data)
      _cargarAmigos();

      setMessage(response.data.message)
      setStatusMessage(response.data.success)
    }catch(error){
      console.error(error)
    }
  }

  const _editar = async (e, id) => {
    navigate('/enterprise/amigos/' + id + '/edit')
  }

  return (
    <>
      <h1>Amigos Listado</h1>
      <p>Bienvenido al panel de empresa.</p>
      {message != "" ? (
        <div className={`alert ${statusMessage ? 'alert-success' : 'alert-danger'}`} role="alert" id="alertMessage">
          {message}
        </div>
        ) : (<></>)
      }

      <NavLink to="/enterprise/amigos/new" className="btn btn-secondary">
        Agregar Amigo
      </NavLink>

      <table className='table'>
        <thead>
          <th>id</th>
          <th>name</th>
          <th>edad</th>
          <th>estado civil</th>
          <th>mascotas</th>
        </thead>
        <tbody>
          {Array.isArray(amigos) && amigos.map((amigo) => (
            <tr>
              <td>{amigo.id}</td>
              <td>{amigo.name}</td>
              <td>{amigo.edad}</td>
              <td>{amigo.estado_civil}</td>
              <td>{amigo.mascotas}</td>
              <td>
                <button onClick={(e) => _editar(e, amigo.id)}>Editar</button>
                <button onClick={(e) => _eliminar(e, amigo.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}