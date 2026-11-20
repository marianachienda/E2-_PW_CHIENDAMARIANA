// src/pages/enterprise/EstudianteDetalle.jsx
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './EstudianteDetalle.css';
import axios from 'axios';

export default function EstudianteDetalle() {
  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);

  // Catálogos
  const [carrers, setCarrers] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [semesters, setSemesters] = useState([]);

  // Campos del modelo Student
  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [carrereId, setCarrereId] = useState("");
  const [sementerId, setSementerId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [userId, setUserId] = useState("");

  // Cargar catálogos (carreras, distritos y semestres)
  useEffect(() => {
    const _cargarCatalogos = async () => {
      try {
        const [carrersRes, districtsRes, semestersRes] = await Promise.all([
          axios.get('/api/v1/carrers'),
          axios.get('/api/v1/districts'),
          axios.get('/api/v1/semesters'),
        ]);

        setCarrers(carrersRes.data.data || []);
        setDistricts(districtsRes.data.data || []);
        setSemesters(semestersRes.data.data || []);
      } catch (error) {
        console.error('Error al cargar catálogos:', error);
      }
    };
    _cargarCatalogos();
  }, []);

  // Si existe :id, cargar los datos del estudiante para editar
  useEffect(() => {
    const _obtenerEstudiante = async () => {
      if (id !== undefined) {
        try {
          const response = await axios.get('/api/v1/students/' + id);
          const student = response.data.data;

          setNames(student.names || "");
          setLastNames(student.last_names || "");
          setEmail(student.email || "");
          setPhone(student.phone || "");
          setCarrereId(student.carrere_id || "");
          setSementerId(student.sementer_id || "");
          setDistrictId(student.district_id || "");
          setPictureUrl(student.picture_url || "");
          setSummary(student.summary || "");
          setUserId(student.user_id || "");
        } catch (error) {
          console.error(error);
          setMessage(
            error.response?.data?.message || "Error al obtener el estudiante"
          );
          setStatusMessage(false);
        }
      }
    };
    _obtenerEstudiante();
  }, [id]);

  const _limpiarFormulario = () => {
    setNames("");
    setLastNames("");
    setEmail("");
    setPhone("");
    setCarrereId("");
    setSementerId("");
    setDistrictId("");
    setPictureUrl("");
    setSummary("");
    setUserId("");
  };

  const _guardarEstudiante = async (e) => {
    e.preventDefault();

    const payload = {
      names: names.trim(),
      last_names: lastNames.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      carrere_id: carrereId !== "" ? Number(carrereId) : null,
      sementer_id: sementerId !== "" ? Number(sementerId) : null,
      district_id: districtId !== "" ? Number(districtId) : null,
      picture_url: pictureUrl.trim() || null,
      summary: summary.trim() || null,
      user_id: userId !== "" ? Number(userId) : null,
    };

    try {
      let response;

      if (id === undefined) {
        response = await axios.post('/api/v1/students', payload);
        if (response.data.success) {
          _limpiarFormulario();
        }
      } else {
        response = await axios.put('/api/v1/students/' + id, payload);
      }

      setMessage(response.data.message);
      setStatusMessage(response.data.success);
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Error al guardar el estudiante"
      );
      setStatusMessage(false);
    }
  };

  return (
    <>
      <h1>{id === undefined ? "Nuevo Estudiante" : "Editar Estudiante"}</h1>

      {message !== "" && (
        <div
          className={`alert ${statusMessage ? 'alert-success' : 'alert-danger'}`}
          role="alert"
          id="alertMessage"
        >
          {message}
        </div>
      )}

      <NavLink to="/enterprise/students" className="btn btn-secondary mb-3">
        Retroceder
      </NavLink>

      <form onSubmit={_guardarEstudiante} className="card p-4">
        <div className="row g-3">
          {/* Nombres */}
          <div className="col-md-6">
            <label htmlFor="names" className="form-label">
              Nombres *
            </label>
            <input
              type="text"
              id="names"
              className="form-control"
              placeholder="Ej. Carolina"
              value={names}
              onChange={(e) => setNames(e.target.value)}
              maxLength={45}
              required
            />
          </div>

          {/* Apellidos */}
          <div className="col-md-6">
            <label htmlFor="last_names" className="form-label">
              Apellidos *
            </label>
            <input
              type="text"
              id="last_names"
              className="form-control"
              placeholder="Ej. Vega"
              value={lastNames}
              onChange={(e) => setLastNames(e.target.value)}
              maxLength={100}
              required
            />
          </div>

          {/* Correo electrónico */}
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Correo electrónico *
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Ej. carolina.vega@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={45}
              required
            />
          </div>

          {/* Teléfono */}
          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">
              Teléfono
            </label>
            <input
              type="text"
              id="phone"
              className="form-control"
              placeholder="Ej. 987654321"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={15}
            />
          </div>

          {/* Carrera */}
          <div className="col-md-4">
            <label htmlFor="carrere_id" className="form-label">
              Carrera
            </label>
            <select
              id="carrere_id"
              className="form-select"
              value={carrereId}
              onChange={(e) => setCarrereId(e.target.value)}
            >
              <option value="">Seleccionar carrera</option>
              {Array.isArray(carrers) && carrers.map((carrer) => (
                <option key={carrer.id} value={carrer.id}>
                  {carrer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Semestre */}
          <div className="col-md-4">
            <label htmlFor="sementer_id" className="form-label">
              Semestre
            </label>
            <select
              id="sementer_id"
              className="form-select"
              value={sementerId}
              onChange={(e) => setSementerId(e.target.value)}
            >
              <option value="">Seleccionar semestre</option>
              {Array.isArray(semesters) && semesters.map((semester) => (
                <option key={semester.id} value={semester.id}>
                  {semester.name}
                </option>
              ))}
            </select>
          </div>

          {/* Distrito */}
          <div className="col-md-4">
            <label htmlFor="district_id" className="form-label">
              Distrito
            </label>
            <select
              id="district_id"
              className="form-select"
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
            >
              <option value="">Seleccionar distrito</option>
              {Array.isArray(districts) && districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {/* URL de Foto */}
          <div className="col-md-8">
            <label htmlFor="picture_url" className="form-label">
              URL de Foto de Perfil
            </label>
            <input
              type="text"
              id="picture_url"
              className="form-control"
              placeholder="https://..."
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
              maxLength={100}
            />
          </div>

          {/* ID de Usuario asociado (opcional) */}
          <div className="col-md-4">
            <label htmlFor="user_id" className="form-label">
              ID de Usuario (user_id)
            </label>
            <input
              type="number"
              id="user_id"
              className="form-control"
              placeholder="Ej. 25"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          {/* Resumen / Perfil profesional */}
          <div className="col-12">
            <label htmlFor="summary" className="form-label">
              Resumen profesional
            </label>
            <textarea
              id="summary"
              className="form-control"
              rows="3"
              placeholder="Breve descripción del perfil del estudiante..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Guardar Estudiante
            </button>
          </div>
        </div>
      </form>
    </>
  );
}