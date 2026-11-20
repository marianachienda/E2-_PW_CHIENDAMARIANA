// admin/services/semesters_services.js
import semesterRepository from '../repositories/semesters_repositories.js';
import { Op } from 'sequelize';

/**
 * Obtener todos los semestres
 */
export const fetchAll = async () => {
  const semesters = await semesterRepository.findAll();
  return semesters.map(semester => semester.toJSON());
};

/**
 * Obtener listado simple ordenado por ID ascendente (para selects/filtros)
 */
export const fetchAllSimple = async () => {
  const semesters = await semesterRepository.findAllSimple({
    order: [['id', 'ASC']]
  });
  return semesters.map(semester => semester.toJSON());
};

/**
 * Obtener semestres paginados con filtro por nombre
 */
export const fetchAllPaginated = async (page = 1, limit = 10, name = '') => {
  const offset = (page - 1) * limit;

  const whereClause = {};
  if (name) {
    whereClause.name = {
      [Op.iLike]: `%${name}%`
    };
  }

  const total = await semesterRepository.count(whereClause);

  const semesters = await semesterRepository.findAllPaginated({
    where: whereClause,
    offset,
    limit,
    order: [['id', 'DESC']]
  });

  const totalPages = Math.ceil(total / limit);

  return {
    semesters: semesters.map(semester => semester.toJSON()),
    total,
    totalPages,
    offset,
    page,
    limit
  };
};

/**
 * Obtener un semestre por su ID
 */
export const fetchById = async (id) => {
  const semester = await semesterRepository.findById(id);
  if (!semester) return null;
  return semester.toJSON();
};

/**
 * Crear un semestre
 */
export const create = async (data) => {
  const newSemester = await semesterRepository.create(data);
  return newSemester.toJSON();
};

/**
 * Actualizar un semestre
 */
export const update = async (id, data) => {
  const updatedSemester = await semesterRepository.update(id, data);
  if (!updatedSemester) return null;
  return updatedSemester.toJSON();
};

/**
 * Eliminar un semestre
 */
export const remove = async (id) => {
  return await semesterRepository.delete(id);
};