// admin\services\amigos_service.js
import amigosRepository from '../repositories/amigos_repositories.js';
import { Op } from 'sequelize';

/**
 * Obtener todos los amigos sin paginación
 */
export const fetchAll = async () => {  //Declara una función llamada fetchAll. export permite usarla desde otro archivo. async indica que tendrá que esperar una operación de base de datos. Las llaves contienen el cuerpo de la función.
  const amigos = await amigosRepository.findAll(); //Pide todos los amigos al repositorio y espera la respuesta antes de continuar.
  return amigos.map(amigo => amigo.toJSON()); //Convierte cada amigo, que al principio puede ser un objeto especial de Sequelize, en un objeto JavaScript normal.


};

/**
 * Obtener listado simple de amigos (útil para dropdowns o selectores)
 */
export const fetchAllSimple = async () => { //Decara una versión simplificada de fetchAll, pensada para menús y selectores.


  const amigos = await amigosRepository.findAll({ //Solicita los amigos y añade opciones a la consulta.
    order: [['id', 'ASC']], //Ordena desde el ID de menor a mayor
  });

  return amigos.map(amigo => amigo.toJSON()); //Convierte nuevamente los amigos en objetos JavaScript normales.

};

/**
 * Obtener amigos paginados con filtros por búsqueda (nombres, apellidos, email, carrera o distrito)
 */
export const fetchAllPaginated = async (options = {}) => {
  const { 
    page = 1, 
    limit = 10, 
    search = '', 
    carrerId = null, 
    districtId = null,
    semesterId = null 
  } = options;

  const parsedPage = parseInt(page, 10) || 1; //Convierte page en un número entero decimal.
  const parsedLimit = parseInt(limit, 10) || 10; //Hace lo mismo con el límite de estudiantes por página.
  const offset = (parsedPage - 1) * parsedLimit; //Calcula cuántos registros deben omitirse.

  // Construcción de filtros dinámicos
  const whereClause = {}; //Crea un objeto vacío que representará las condiciones de búsqueda.

  if (search) { //Solo activa el filtro si el texto de búsqueda no está vacío.
    whereClause[Op.or] = [ //Agrupa varias búsquedas con la regla “encuentra coincidencias en cualquiera de estas columnas”.

      { names: { [Op.iLike]: `%${search}%` } }, //Busca el texto dentro del nombre, sin distinguir mayúsculas de minúsculas. Los porcentajes significan “puede haber texto antes o después”.
      { last_names: { [Op.iLike]: `%${search}%` } },
      { email: { [Op.iLike]: `%${search}%` } },
    ];
  }

  if (carrerId) {
    whereClause.carrer_id = carrerId;
  }

  if (districtId) {
    whereClause.district_id = districtId;
  }

  if (semesterId) {
    whereClause.semester_id = semesterId;
  }

  // Ejecutar consulta con paginación
  const { count: total, rows: amigos } = await amigosRepository.findAllPaginated({
    where: whereClause,
    offset,
    limit: parsedLimit,
    order: [['id', 'DESC']],
  });

  const totalPages = Math.ceil(total / parsedLimit);

  return {
    amigos: amigos.map(amigo => amigo.toJSON()),
    total,
    totalPages,
    offset,
    page: parsedPage,
    limit: parsedLimit,
  };
};

/**
 * Obtener un amigo por su ID con todo su perfil
 */
export const fetchById = async (id) => {
  const amigo = await amigosRepository.findById(id);

  if (!amigo) {
    return null;
  }

  return amigo.toJSON();
};

/**
 * Obtener un amigo por su user_id
 */
export const fetchByUserId = async (userId) => {
  const amigo = await amigosRepository.findByUserId(userId);

  if (!amigo) {
    return null;
  }

  return amigo.toJSON();
};

/**
 * Servicio para crear un nuevo amigo
 */
export const create = async (data) => {
  const newAmigo = await amigosRepository.create(data);
  return newAmigo.toJSON();
};

/**
 * Servicio para actualizar datos de un amigo
 */
export const update = async (id, data) => {
  const updatedAmigo = await amigosRepository.update(id, data);
  if (!updatedAmigo) return null;
  return updatedAmigo.toJSON();
};

/**
 * Servicio para eliminar un amigo
 */
export const remove = async (id) => {
  return await amigosRepository.delete(id);
};