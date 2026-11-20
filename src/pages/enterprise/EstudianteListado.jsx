// src/pages/enterprise/EstudianteListado.jsx
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './EstudianteListado.css';
import axios from 'axios';

export default function EstudianteListado() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [carrers, setCarrers] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState(false);

  // Estados de filtros
  const [search, setSearch] = useState("");
  const [carrerId, setCarrerId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [semesterId, setSemesterId] = useState("");

  // Estados de paginación
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [offset, setOffset] = useState(0);

  // Cargar catálogos para los filtros (carreras, distritos y semestres)
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
        console.error('Error al cargar catálogos de filtros:', error);
      }
    };
    _cargarCatalogos();
  }, []);

  // Recargar estudiantes cuando cambie la página o el límite
  useEffect(() => {
    _cargarEstudiantes(page, limit);
  }, [page, limit]);

  const _cargarEstudiantes = async (
    currentPage = page,
    currentLimit = limit,
    filtros = { search, carrerId, districtId, semesterId }
  ) => {
    try {
      const params = {
        page: currentPage,
        limit: currentLimit,
      };

      if (filtros.search.trim() !== "") params.search = filtros.search.trim();
      if (filtros.carrerId !== "") params.carrerId = filtros.carrerId;
      if (filtros.districtId !== "") params.districtId = filtros.districtId;
      if (filtros.semesterId !== "") params.semesterId = filtros.semesterId;

      const response = await axios.get('/api/v1/students', { params });
      const data = response.data.data;

      setStudents(data.list || []);
      setTotal(data.total || 0);
      setTotalPages(data.pages || 1);
      setOffset(data.offset || 0);
      setMessage(response.data.message);
      setStatusMessage(response.data.success);
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Error al listar los estudiantes"
      );
      setStatusMessage(false);
    }
  };

  // Enviar formulario de filtros
  const _filtrar = (e) => {
    e.preventDefault();
    if (page === 1) {
      _cargarEstudiantes(1, limit, { search, carrerId, districtId, semesterId });
    } else {
      setPage(1); // Dispara el useEffect con page = 1
    }
  };

  // Limpiar filtros
  const _limpiarFiltros = () => {
    setSearch("");
    setCarrerId("");
    setDistrictId("");
    setSemesterId("");

    const filtrosVacios = { search: "", carrerId: "", districtId: "", semesterId: "" };
    if (page === 1) {
      _cargarEstudiantes(1, limit, filtrosVacios);
    } else {
      setPage(1);
    }
  };

  const _eliminar = async (e, id) => {
    try {
      const response = await axios.delete('/api/v1/students/' + id);
      _cargarEstudiantes(page, limit);

      setMessage(response.data.message);
      setStatusMessage(response.data.success);
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Error al eliminar el estudiante"
      );
      setStatusMessage(false);
    }
  };

  const _editar = (e, id) => {
    navigate('/enterprise/students/' + id + '/edit');
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1>Listado de Estudiantes</h1>
          <p className="mb-0">Bienvenido al panel de empresa.</p>
        </div>

        <NavLink to="/enterprise/students/new" className="btn btn-secondary">
          Agregar Estudiante
        </NavLink>
      </div>

      {message !== "" && (
        <div
          className={`alert ${statusMessage ? 'alert-success' : 'alert-danger'}`}
          role="alert"
          id="alertMessage"
        >
          {message}
        </div>
      )}

      {/* =====================================================
          FORMULARIO DE FILTROS
          ===================================================== */}
      <form onSubmit={_filtrar} className="card p-3 mb-3">
        <div className="row g-2 align-items-end">
          {/* Búsqueda por nombre, apellido o correo */}
          <div className="col-md-4">
            <label htmlFor="search" className="form-label">
              Buscar (Nombre, Apellido o Email)
            </label>
            <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Ej. Carolina o carolina@example.com"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filtro por Carrera (cargado desde /api/v1/carrers) */}
          <div className="col-md-3">
            <label htmlFor="carrerId" className="form-label">
              Carrera
            </label>
            <select
              id="carrerId"
              className="form-select"
              value={carrerId}
              onChange={(e) => setCarrerId(e.target.value)}
            >
              <option value="">Todas las carreras</option>
              {Array.isArray(carrers) && carrers.map((carrer) => (
                <option key={carrer.id} value={carrer.id}>
                  {carrer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por Distrito (cargado desde /api/v1/districts) */}
          <div className="col-md-2">
            <label htmlFor="districtId" className="form-label">
              Distrito
            </label>
            <select
              id="districtId"
              className="form-select"
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
            >
              <option value="">Todos</option>
              {Array.isArray(districts) && districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por Semestre (cargado desde /api/v1/semesters) */}
          <div className="col-md-3">
            <label htmlFor="semesterId" className="form-label">
              Semestre
            </label>
            <select
              id="semesterId"
              className="form-select"
              value={semesterId}
              onChange={(e) => setSemesterId(e.target.value)}
            >
              <option value="">Todos</option>
              {Array.isArray(semesters) && semesters.map((semester) => (
                <option key={semester.id} value={semester.id}>
                  {semester.name}
                </option>
              ))}
            </select>
          </div>

          {/* Botones de acción del filtro */}
          <div className="col-12 d-flex justify-content-end gap-2 mt-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={_limpiarFiltros}
            >
              Limpiar
            </button>
            <button type="submit" className="btn btn-primary">
              Filtrar
            </button>
          </div>
        </div>
      </form>

      {/* =====================================================
          TABLA DE ESTUDIANTES
          ===================================================== */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombres y Apellidos</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Carrera</th>
              <th>Distrito</th>
              <th>Semestre</th>
              <th>Perfil</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(students) && students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.names} {student.last_names}</td>
                  <td>{student.email}</td>
                  <td>{student.phone || '—'}</td>
                  <td>{student.carrer?.name || '—'}</td>
                  <td>{student.district?.name || '—'}</td>
                  <td>{student.semester?.name || '—'}</td>
                  <td>{student.user?.profile?.name || '—'}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={(e) => _editar(e, student.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={(e) => _eliminar(e, student.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-muted">
                  No se encontraron estudiantes con los filtros seleccionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          CONTROLES DE PAGINACIÓN
          ===================================================== */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="limitSelect" className="form-label mb-0">
            Filas por página:
          </label>
          <select
            id="limitSelect"
            className="form-select form-select-sm"
            style={{ width: '80px' }}
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>

          <span className="text-muted small ms-2">
            {total > 0
              ? `Mostrando ${offset + 1}–${Math.min(offset + limit, total)} de ${total} estudiantes`
              : 'Mostrando 0 estudiantes'}
          </span>
        </div>

        <nav aria-label="Paginación de estudiantes">
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
              <button
                type="button"
                className="page-link"
                onClick={() => setPage(1)}
                disabled={page <= 1}
              >
                Primero
              </button>
            </li>
            <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
              <button
                type="button"
                className="page-link"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page <= 1}
              >
                Anterior
              </button>
            </li>
            <li className="page-item active">
              <span className="page-link">
                Página {page} de {totalPages || 1}
              </span>
            </li>
            <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
              <button
                type="button"
                className="page-link"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={page >= totalPages}
              >
                Siguiente
              </button>
            </li>
            <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
              <button
                type="button"
                className="page-link"
                onClick={() => setPage(totalPages)}
                disabled={page >= totalPages}
              >
                Último
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}