// src/pages/enterprise/PerfilListado.jsx
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './PerfilListado.css'
import axios from 'axios';

export default function PerfilListado() {
  const navigate = useNavigate();

  const carrers2 = [];

  const [profiles, setProfiles] = useState(carrers2);
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);

  useEffect(() => {
    _cargarPerfiles();
  }, []);

  const _cargarPerfiles = async () => {
    try{
      const response = await axios.get('/api/v1/profiles');
      // console.log(response.data)
      setProfiles(response.data.data)
      setMessage(response.data.message)
      setStatusMessage(response.data.success)
    }catch(error){
      console.error(error)
    }
  }

  const _eliminar = async (e, id) => {
    try{
      const response = await axios.delete('/api/v1/profiles/' + id);
      // console.log(response.data)
      _cargarCarreras();

      setMessage(response.data.message)
      setStatusMessage(response.data.success)
    }catch(error){
      console.error(error)
    }
  }

  const _editar = async (e, id) => {
    navigate('/enterprise/profiles/' + id + '/edit')
  }

  return (
    <>
      <h1>Perfiles Listado</h1>
      <p>Bienvenido al panel de empresa.</p>
      {message != "" ? (
        <div className={`alert ${statusMessage ? 'alert-success' : 'alert-danger'}`} role="alert" id="alertMessage">
          {message}
        </div>
        ) : (<></>)
      }

      <NavLink to="/enterprise/profiles/new" className="btn btn-secondary">
        Agregar Perfil
      </NavLink>

      <table className='table'>
        <thead>
          <th>id</th>
          <th>nombre</th>
          <th>operaciones</th>
        </thead>
        <tbody>
          {Array.isArray(profiles) && profiles.map((profile) => (
            <tr>
              <td>{profile.id}</td>
              <td>{profile.name}</td>
              <td>
                <button onClick={(e) => _editar(e, profile.id)}>Editar</button>
                <button onClick={(e) => _eliminar(e, profile.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}