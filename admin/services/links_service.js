// admin\services\students_service.js
import LinksRepository from '../repositories/links_repositories.js';
import { Op } from 'sequelize';

/**
 * Obtener todos los estudiantes sin paginación
 */
export const fetchAll = async () => {  //Declara una función llamada fetchAll. export permite usarla desde otro archivo. async indica que tendrá que esperar una operación de base de datos. Las llaves contienen el cuerpo de la función.
  const links = await LinksRepository.findAll(); //Pide todos los estudiantes al repositorio y espera la respuesta antes de continuar.
  return links.map(link => link.toJSON()); //Convierte cada estudiante, que al principio puede ser un objeto especial de Sequelize, en un objeto JavaScript normal.


};

/**
 * Obtener listado simple de estudiantes (útil para dropdowns o selectores)
 */
export const fetchAllSimple = async () => { //Decara una versión simplificada de fetchAll, pensada para menús y selectores.


  const links = await LinksRepository.findAll({ //Solicita los estudiantes y añade opciones a la consulta.
    order: [['id', 'ASC']], //Ordena desde el ID de menor a mayor
  });

  return links.map(student => student.toJSON()); //Convierte nuevamente los estudiantes en objetos JavaScript normales.

};

/**
 * Obtener estudiantes paginados con filtros por búsqueda (nombres, apellidos, email, carrera o distrito)
 */
export const fetchAllPaginated = async (options = {}) => {
  const { 
    page = 1, 
    limit = 10, 
    search = '', 
    studentId = null
  } = options;

  const parsedPage = parseInt(page, 10) || 1; //Convierte page en un número entero decimal.
  const parsedLimit = parseInt(limit, 10) || 10; //Hace lo mismo con el límite de estudiantes por página.
  const offset = (parsedPage - 1) * parsedLimit; //Calcula cuántos registros deben omitirse.

  // Construcción de filtros dinámicos
  const whereClause = {}; //Crea un objeto vacío que representará las condiciones de búsqueda.

  if (search) { //Solo activa el filtro si el texto de búsqueda no está vacío.
    whereClause[Op.or] = [ //Agrupa varias búsquedas con la regla “encuentra coincidencias en cualquiera de estas columnas”.

      { name: { [Op.iLike]: `%${search}%` } }, //Busca el texto dentro del nombre, sin distinguir mayúsculas de minúsculas. Los porcentajes significan “puede haber texto antes o después”.
      { url: { [Op.iLike]: `%${search}%` } },
      { student_id: { [Op.iLike]: `%${search}%` } },
    ];
  }

  if (studentId) {
    whereClause.student_id = studentId;
  }

  // Ejecutar consulta con paginación
  const { count: total, rows: links } = await LinksRepository.findAllPaginated({
    where: whereClause,
    offset,
    limit: parsedLimit,
    order: [['id', 'DESC']],
  });

  const totalPages = Math.ceil(total / parsedLimit);

  return {
    links: links.map(link => link.toJSON()),
    total,
    totalPages,
    offset,
    page: parsedPage,
    limit: parsedLimit,
  };
};

/**
 * Obtener un link por su ID con todo su perfil
 */
export const fetchById = async (id) => {
  const link = await  LinksRepository.findById(id);

  if (!link) {
    return null;
  }

  return link.toJSON();
};

/**
 * Obtener un link por su user_id
 */
export const fetchByUserId = async (userId) => {
  const link = await LinksRepository.findByUserId(userId);

  if (!link) {
    return null;
  }

  return link.toJSON();
};

/**
 * Servicio para crear un nuevo link
 */
export const create = async (data) => {
  const newlink = await LinksRepository.create(data);
  return newlink.toJSON();
};

/**
 * Servicio para actualizar datos de un link
 */
export const update = async (id, data) => {
  const updatedlink = await LinksRepository.update(id, data);
  if (!updatedlink) return null;
  return updatedlink.toJSON();
};

/**
 * Servicio para eliminar un link
 */
export const remove = async (id) => {
  return await LinksRepository.delete(id);
};