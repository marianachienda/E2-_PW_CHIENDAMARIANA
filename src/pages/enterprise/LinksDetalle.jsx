// src/pages/enterprise/AmigoDetalle.jsx

import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
//import './LinksDetalle.css';
import axios from 'axios';

export default function LinkDetalle() {
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [student_id, setStudentId] = useState("");
  const { id } = useParams();

  const _obtenerDetalle = async () => {
    if (id !== undefined) {
      try {
        const response = await axios.get('/api/v1/links/' + id);

        console.log(response.data);

        setName(response.data.data.name);
        setUrl(response.data.data.url);
        setStudentId(response.data.data.student_id);

      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    _obtenerDetalle();
  }, [id]);

  const _guardarLink = async (e) => {
    e.preventDefault();

    try {
      let response;

      if(id === undefined){
        response = await axios.post('/api/v1/links', {
          name: name,
          url: url,
          student_id: student_id
          
        });
        if (response.data.success) {
          setName("");
          setUrl("");
          setStudentId("")
          
        }
      }else{
        response = await axios.put('/api/v1/links/' + id, {
          name: name,
          url: url,
          student_id: student_id
          
        });
      }
      
      setMessage(response.data.message);
      setStatusMessage(response.data.success);

    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message || "Error al registrar el link"
      );
      setStatusMessage(false);
    }
  };

  return (
    <>
      <h1>{id === undefined ? "Link Nuevo" : "Editar Link"}</h1>

      {message !== "" && (
        <div
          className={`alert ${statusMessage ? 'alert-success' : 'alert-danger'}`}
          role="alert"
          id="alertMessage"
        >
          {message}
        </div>
      )}

      <NavLink to="/enterprise/links" className="btn btn-secondary mb-3">
        Retroceder
      </NavLink>

      <form onSubmit={_guardarLink}>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre del Link
          </label>
    

          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Ingrese el nombre del Link"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            required
          />

        <label htmlFor="url" className="form-label">
            url del link
          </label>
          <input
            type="text"
            id="url"
            className="form-control"
            placeholder="Ingrese el url del link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />

        <label htmlFor="student_id" className="form-label">
            student id
          </label>
          <input
            type="text"
            id="student_id"
            className="form-control"
            placeholder="Ingrese el student id"
            value={student_id}
            onChange={(e) => setStudentId(e.target.value)}
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
