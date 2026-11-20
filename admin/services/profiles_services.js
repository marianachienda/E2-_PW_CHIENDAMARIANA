// admin/services/profiles_services.js
import profileRepository from '../repositories/profiles_repositories.js';
import { Op } from 'sequelize';

/**
 * Obtener todas las perfiles
 */
export const fetchAll = async () => {
  const profiles = await profileRepository.findAll();

  return profiles.map(profile => profile.toJSON());
};

/**
 * Obtener perfiles paginadas con filtro por nombre
 */
export const fetchAllSimple = async () => {
  // Obtener registros paginados
  const profiles = await profileRepository.findAllSimple({
    order: [['id', 'ASC']]
  });

  return profiles.map(carrer => carrer.toJSON());
};


export const fetchAllPaginated = async (page = 1, limit = 10, name = '') => {
  const offset = (page - 1) * limit;

  // Construir filtros
  const whereClause = {};
  if (name) {
    whereClause.name = {
      [Op.iLike]: `%${name}%`
    };
  }

  // Obtener total de registros
  const total = await profileRepository.count(whereClause);

  // Obtener registros paginados
  const profiles = await profileRepository.findAllPaginated({
    where: whereClause,
    offset: offset,
    limit: limit,
    order: [['id', 'DESC']]
  });

  const totalPages = Math.ceil(total / limit);
  const offsetResult = offset;

  return {
    profiles: profiles.map(carrer => carrer.toJSON()),
    total,
    totalPages,
    offset: offsetResult,
    page,
    limit
  };
};

/**
 * Obtener una perfil por su ID
 */
export const fetchById = async (id) => {
  const profile = await profileRepository.findById(id);

  if (!profile) {
    return null;
  }

  return profile.toJSON();
};

/**
 * Servicio para crear una perfil
 */
export const create = async (data) => {
  const newProfile = await profileRepository.create(data);
  return newProfile.toJSON();
};

/**
 * Servicio para actualizar una perfil
 */
export const update = async (id, data) => {
  const updatedProfile = await profileRepository.update(id, data);
  if (!updatedProfile) return null;
  return updatedProfile.toJSON();
};

/**
 * Servicio para eliminar una perfil
 */
export const remove = async (id) => {
  return await profileRepository.delete(id);
};