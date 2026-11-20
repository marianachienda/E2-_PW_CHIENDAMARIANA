// src/pages/enterprise/PerfilDetalle.jsx

import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './PerfilDetalle.css';
import axios from 'axios';

export default function PerfilDetalle() {
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);
  const [name, setName] = useState("");
  const { id } = useParams();

  const _obtenerDetalle = async () => {
    if (id !== undefined) {
      try {
        const response = await axios.get('/api/v1/profiles/' + id);

        console.log(response.data);

        setName(response.data.data.name);

      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    _obtenerDetalle();
  }, [id]);

  const _guardarCarrera = async (e) => {
    e.preventDefault();

    try {
      let response;

      if(id === undefined){
        response = await axios.post('/api/v1/profiles', {
          name: name
        });
        if (response.data.success) {
          setName("");
        }
      }else{
        response = await axios.put('/api/v1/profiles/' + id, {
          name: name
        });
      }
      
      setMessage(response.data.message);
      setStatusMessage(response.data.success);

    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message || "Error al registrar la carrera"
      );
      setStatusMessage(false);
    }
  };

  return (
    <>
      <h1>{id === undefined ? "Perfil Nueva" : "Editar Perfil"}</h1>

      {message !== "" && (
        <div
          className={`alert ${statusMessage ? 'alert-success' : 'alert-danger'}`}
          role="alert"
          id="alertMessage"
        >
          {message}
        </div>
      )}

      <NavLink to="/enterprise/profiles" className="btn btn-secondary mb-3">
        Retroceder
      </NavLink>

      <form onSubmit={_guardarCarrera}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre del perfil
          </label>

          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Ingrese el nombre del perfil"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Perfil
        </button>

      </form>
    </>
  );
}
