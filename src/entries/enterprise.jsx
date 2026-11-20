// src\entries\enterprise.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'

import CabeceraEnterprise from '../partials/CabeceraEnterprise'
import SideBarEnterprise from '../partials/SideBarEnterprise'
import FooterEnterprise from '../partials/FooterEnterprise'
// paginas
import PanelEmpresa from '../pages/enterprise/PanelEmpresa'
import MisConvocatorias from '../pages/enterprise/MisConvocatorias'
import NuevaConvocatoria from '../pages/enterprise/NuevaConvocatoria'
import CarreraListado from '../pages/enterprise/CarreraListado'
import CarreraDetalle from '../pages/enterprise/CarreraDetalle'
import PerfilListado from '../pages/enterprise/PerfilListado'
import PerfilDetalle from '../pages/enterprise/PerfilDetalle'
import EstudianteListado from '../pages/enterprise/EstudianteListado' // <-- Importar
import EstudianteDetalle from '../pages/enterprise/EstudianteDetalle'
import AmigoListado from '../pages/enterprise/AmigoListado'
import AmigoDetalle from '../pages/enterprise/AmigoDetalle'
import LinkDetalle from '../pages/enterprise/LinksDetalle'
import LinksListado from '../pages/enterprise/LinksListado'


import './enterprise.css'

function EnterpriseLayout() {
  return (
    <>
      <CabeceraEnterprise />
      <div className="enterprise-layout">
        <SideBarEnterprise />
        <main className="enterprise-content">
          <Outlet />
        </main>
      </div>
      <FooterEnterprise />
    </>
  )
}

function Postulantes() {
  return (
    <>
      <h1>Bandeja de postulantes</h1>
      <p>Aquí se mostrarán los postulantes.</p>
    </>
  )
}

function PerfilEmpresa() {
  return (
    <>
      <h1>Perfil de la empresa</h1>
      <p>Información de la empresa.</p>
    </>
  )
}

function Resenas() {
  return (
    <>
      <h1>Reseñas recibidas</h1>
      <p>Aquí se mostrarán las reseñas.</p>
    </>
  )
}

function CambiarContrasena() {
  return (
    <>
      <h1>Cambiar contraseña</h1>
      <p>Formulario para cambiar la contraseña.</p>
    </>
  )
}

function Configuracion() {
  return (
    <>
      <h1>Configuración</h1>
      <p>Configuración de la cuenta empresarial.</p>
    </>
  )
}

function App() {
  return (
    <Routes>
      {/* Layout general de empresa */}
      <Route path="/enterprise" element={<EnterpriseLayout />}>
        {/* /enterprise */}
        <Route index element={<PanelEmpresa />} />
        {/* Convocatorias */}
        <Route path="convocatorias" element={<MisConvocatorias />} />
        <Route path="convocatorias/nueva" element={<NuevaConvocatoria />} />
        {/* Postulantes */}
        <Route path="postulantes" element={<Postulantes />} />
        {/* Empresa */} 
        <Route path="perfil" element={<PerfilEmpresa />} />
        <Route path="resenas" element={<Resenas />} />
        {/* Carreras */} 
        <Route path="carrers" element={<CarreraListado />} />
        <Route path="carrers/new" element={<CarreraDetalle />} />
        <Route path="carrers/:id/edit" element={<CarreraDetalle />} />
        {/* Profiles */} 
        <Route path="profiles" element={<PerfilListado />} />
        <Route path="profiles/new" element={<PerfilDetalle />} />
        <Route path="profiles/:id/edit" element={<PerfilDetalle />} />
        {/* Estudiantes */}
        <Route path="students" element={<EstudianteListado />} />
        <Route path="students/new" element={<EstudianteDetalle />} />
        <Route path="students/:id/edit" element={<EstudianteDetalle />} />

        {/* Amigos */}
        <Route path="amigos" element={<AmigoListado />} />
        <Route path="amigos/new" element={<AmigoDetalle />} />
        <Route path="amigos/:id/edit" element={<AmigoDetalle />} />


        {/* Links */}
        <Route path="links" element={<LinksListado />} />
        <Route path="links/new" element={<LinkDetalle />} />
        <Route path="links/:id/edit" element={<LinkDetalle />} />

        {/* Cuenta */} 
        <Route path="cambiar-contrasena" element={<CambiarContrasena />} />
        <Route path="configuracion" element={<Configuracion />} />
      </Route>
    </Routes>
  )
}

const container = document.getElementById('root')

if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}
