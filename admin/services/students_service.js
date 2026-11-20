// admin\services\students_service.js
import studentRepository from '../repositories/student_repositories.js';
import { Op } from 'sequelize';

/**
 * Obtener todos los estudiantes sin paginación
 */
export const fetchAll = async () => {  //Declara una función llamada fetchAll. export permite usarla desde otro archivo. async indica que tendrá que esperar una operación de base de datos. Las llaves contienen el cuerpo de la función.
  const students = await studentRepository.findAll(); //Pide todos los estudiantes al repositorio y espera la respuesta antes de continuar.
  return students.map(student => student.toJSON()); //Convierte cada estudiante, que al principio puede ser un objeto especial de Sequelize, en un objeto JavaScript normal.


};

/**
 * Obtener listado simple de estudiantes (útil para dropdowns o selectores)
 */
export const fetchAllSimple = async () => { //Decara una versión simplificada de fetchAll, pensada para menús y selectores.


  const students = await studentRepository.findAll({ //Solicita los estudiantes y añade opciones a la consulta.
    order: [['id', 'ASC']], //Ordena desde el ID de menor a mayor
  });

  return students.map(student => student.toJSON()); //Convierte nuevamente los estudiantes en objetos JavaScript normales.

};

/**
 * Obtener estudiantes paginados con filtros por búsqueda (nombres, apellidos, email, carrera o distrito)
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
  const { count: total, rows: students } = await studentRepository.findAllPaginated({
    where: whereClause,
    offset,
    limit: parsedLimit,
    order: [['id', 'DESC']],
  });

  const totalPages = Math.ceil(total / parsedLimit);

  return {
    students: students.map(student => student.toJSON()),
    total,
    totalPages,
    offset,
    page: parsedPage,
    limit: parsedLimit,
  };
};

/**
 * Obtener un estudiante por su ID con todo su perfil
 */
export const fetchById = async (id) => {
  const student = await studentRepository.findById(id);

  if (!student) {
    return null;
  }

  return student.toJSON();
};

/**
 * Obtener un estudiante por su user_id
 */
export const fetchByUserId = async (userId) => {
  const student = await studentRepository.findByUserId(userId);

  if (!student) {
    return null;
  }

  return student.toJSON();
};

/**
 * Servicio para crear un nuevo estudiante
 */
export const create = async (data) => {
  const newStudent = await studentRepository.create(data);
  return newStudent.toJSON();
};

/**
 * Servicio para actualizar datos de un estudiante
 */
export const update = async (id, data) => {
  const updatedStudent = await studentRepository.update(id, data);
  if (!updatedStudent) return null;
  return updatedStudent.toJSON();
};

/**
 * Servicio para eliminar un estudiante
 */
export const remove = async (id) => {
  return await studentRepository.delete(id);
};