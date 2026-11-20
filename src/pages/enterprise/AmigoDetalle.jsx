// src/pages/enterprise/AmigoDetalle.jsx

import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './AmigoDetalle.css';
import axios from 'axios';

export default function AmigoDetalle() {
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);
  const [name, setName] = useState("");
  const [edad, setEdad] = useState("");
  const [estado_civil, setEstadoCivil] = useState("");
  const [mascotas, setMascotas] = useState("");
  const { id } = useParams();

  const _obtenerDetalle = async () => {
    if (id !== undefined) {
      try {
        const response = await axios.get('/api/v1/amigos/' + id);

        console.log(response.data);

        setName(response.data.data.name);
        setEdad(response.data.data.edad);
        setEstadoCivil(response.data.data.estado_civil);
        setMascotas(response.data.data.mascotas);

      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    _obtenerDetalle();
  }, [id]);

  const _guardarAmigo = async (e) => {
    e.preventDefault();

    try {
      let response;

      if(id === undefined){
        response = await axios.post('/api/v1/amigos', {
          name: name,
          edad: edad,
          estado_civil: estado_civil,
          mascotas: mascotas
        });
        if (response.data.success) {
          setName("");
          setEdad("");
          setEstadoCivil("");
          setMascotas("");
        }
      }else{
        response = await axios.put('/api/v1/amigos/' + id, {
          name: name,
          edad: edad,
          estado_civil: estado_civil,
          mascotas: mascotas
        });
      }
      
      setMessage(response.data.message);
      setStatusMessage(response.data.success);

    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message || "Error al registrar el amigo"
      );
      setStatusMessage(false);
    }
  };

  return (
    <>
      <h1>{id === undefined ? "Amigo Nuevo" : "Editar Amigo"}</h1>

      {message !== "" && (
        <div
          className={`alert ${statusMessage ? 'alert-success' : 'alert-danger'}`}
          role="alert"
          id="alertMessage"
        >
          {message}
        </div>
      )}

      <NavLink to="/enterprise/amigos" className="btn btn-secondary mb-3">
        Retroceder
      </NavLink>

      <form onSubmit={_guardarAmigo}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre del amigo
          </label>
    

          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Ingrese el nombre del amigo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            required
          />

        <label htmlFor="edad" className="form-label">
            edad del amigo
          </label>
          <input
            type="integer"
            id="edad"
            className="form-control"
            placeholder="Ingrese la edad del amigo"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />

        <label htmlFor="estado_civil" className="form-label">
            estado civil del amigo
          </label>
          <input
            type="text"
            id="estado_civil"
            className="form-control"
            placeholder="Ingrese el estado civil del amigo"
            value={estado_civil}
            onChange={(e) => setEstadoCivil(e.target.value)}
            maxLength={30}
            required
          />

          <label htmlFor="mascotas" className="form-label">
            mascotas del amigo
          </label>
          <input
            type="text"
            id="mascotas"
            className="form-control"
            placeholder="Ingrese las mascotas del amigo"
            value={mascotas}
            onChange={(e) => setMascotas(e.target.value)}
            maxLength={30}
            required
          />



        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Amigo
        </button>

      </form>
    </>
  );
}
