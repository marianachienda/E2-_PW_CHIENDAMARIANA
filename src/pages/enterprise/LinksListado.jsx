// src/pages/enterprise/AmigoListado.jsx
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
//import './AmigoListado.css'
import axios from 'axios';

export default function LinkListado() {
  const navigate = useNavigate();

  const [links, setLinks] = useState([]);
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);

  useEffect(() => {
    _cargarLinks();
  }, []);

  const _cargarLinks = async () => {
    try{
      const response = await axios.get('/api/v1/links');
      // console.log(response.data)
      setLinks(response.data.data)
      setMessage(response.data.message)
      setStatusMessage(response.data.success)
    }catch(error){
      console.error(error)
    }
  }

  const _eliminar = async (e, id) => {
    try{
      const response = await axios.delete('/api/v1/links/' + id);
      // console.log(response.data)
      _cargarLinks();

      setMessage(response.data.message)
      setStatusMessage(response.data.success)
    }catch(error){
      console.error(error)
    }
  }

  const _editar = async (e, id) => {
    navigate('/enterprise/links/' + id + '/edit')
  }

  return (
    <>
      <h1>Links Listado</h1>
      <p>Bienvenido al panel de empresa.</p>
      {message != "" ? (
        <div className={`alert ${statusMessage ? 'alert-success' : 'alert-danger'}`} role="alert" id="alertMessage">
          {message}
        </div>
        ) : (<></>)
      }

      <NavLink to="/enterprise/links/new" className="btn btn-secondary">
        Agregar Link
      </NavLink>

      <table className='table'>
        <thead>
          <th>id</th>
          <th>name</th>
          <th>url</th>
          <th>student_id</th>
          
        </thead>
        <tbody>
          {Array.isArray(links) && links.map((link) => (
            <tr>
              <td>{link.id}</td>
              <td>{link.name}</td>
              <td>{link.url}</td>
              <td>{link.student_id}</td>
              
              <td>
                <button onClick={(e) => _editar(e, link.id)}>Editar</button>
                <button onClick={(e) => _eliminar(e, link.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}