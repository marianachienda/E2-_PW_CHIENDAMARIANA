// admin/services/districts_services.js
import districtRepository from '../repositories/districts_repositories.js';
import { Op } from 'sequelize';

/**
 * Obtener todos los distritos
 */
export const fetchAll = async () => {
  const districts = await districtRepository.findAll();
  return districts.map(district => district.toJSON());
};

/**
 * Obtener listado simple ordenado por ID ascendente (para selects/filtros)
 */
export const fetchAllSimple = async () => {
  const districts = await districtRepository.findAllSimple({
    order: [['id', 'ASC']]
  });
  return districts.map(district => district.toJSON());
};

/**
 * Obtener distritos paginados con filtro por nombre
 */
export const fetchAllPaginated = async (page = 1, limit = 10, name = '') => {
  const offset = (page - 1) * limit;

  const whereClause = {};
  if (name) {
    whereClause.name = {
      [Op.iLike]: `%${name}%`
    };
  }

  const total = await districtRepository.count(whereClause);

  const districts = await districtRepository.findAllPaginated({
    where: whereClause,
    offset,
    limit,
    order: [['id', 'DESC']]
  });

  const totalPages = Math.ceil(total / limit);

  return {
    districts: districts.map(district => district.toJSON()),
    total,
    totalPages,
    offset,
    page,
    limit
  };
};

/**
 * Obtener un distrito por su ID
 */
export const fetchById = async (id) => {
  const district = await districtRepository.findById(id);
  if (!district) return null;
  return district.toJSON();
};

/**
 * Crear un distrito
 */
export const create = async (data) => {
  const newDistrict = await districtRepository.create(data);
  return newDistrict.toJSON();
};

/**
 * Actualizar un distrito
 */
export const update = async (id, data) => {
  const updatedDistrict = await districtRepository.update(id, data);
  if (!updatedDistrict) return null;
  return updatedDistrict.toJSON();
};

/**
 * Eliminar un distrito
 */
export const remove = async (id) => {
  return await districtRepository.delete(id);
};