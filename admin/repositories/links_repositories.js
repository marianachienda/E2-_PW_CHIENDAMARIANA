// admin/repositories/links_repository.js
import Student from '../models/student.js';
import Link from '../models/link.js';

import { Op } from 'sequelize';

const showLogs = process.env.SHOW_DB_ERRORS === 'true' || process.env.NODE_ENV === 'development';

class LinksRepository {
  /**
   * Obtiene todos los estudiantes sin paginación
   */
  async findAll(options = {}) {
    try {
      const { where = {}, 
      include = [ //AQUI SE DESGLOSA PARTE DE LAS CABECERAS DE STUDENT ID 
       { 
        model: Student, 
        as: 'student', 
        attributes: ['id', 'names', 'last_names']
       }
      ], 
      
      order = [['id', 'DESC']] } = options;
      return await Link.findAll({
        where,
        include,
        order,
      });
    } catch (error) {
      if (showLogs) console.error('🔥 [LinksRepo.findAll] Error:', error);
      throw error;
    }
  }

  /**
   * Obtiene estudiantes con paginación y filtros
   */
  async findAllPaginated(options = {}) {
    try {
      const { 
        where = {}, 
        offset = 0, 
        limit = 10, 
        order = [['id', 'DESC']],
        include = [
          { model: Student, as: 'student', attributes: ['id', 'names', 'last_names']},
          
        ],
      } = options;

      return await Link.findAndCountAll({
        where,
        offset,
        limit,
        order,
        include,
        distinct: true, // Evita conteos duplicados al usar includes N:M o 1:N
      });
    } catch (error) {
      if (showLogs) console.error('🔥 [LinksRepo.findAllPaginated] Error:', error);
      throw error;
    }
  }

  /**
   * Cuenta los estudiantes con filtros
   */
  async count(where = {}) {
    try {
      return await Link.count({ where });
    } catch (error) {
      if (showLogs) console.error('🔥 [LinksRepo.count] Error:', error);
      throw error;
    }
  }

  /**
   * Busca estudiante por ID con sus relaciones asociadas
   */
  async findById(id, options = {}) {
    try {
      const { 
        include = [
          { model: Student, as: 'student', attributes: ['id', 'names', 'last_names'] },
        ] 
      } = options;

      return await Link.findByPk(id, { include });
    } catch (error) {
      if (showLogs) console.error(`🔥 [LinksRepo.findById] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Busca link por user_id
   */
  async findByUserId(userId, options = {}) {
    try {
      const { include = [] } = options;
      return await Link.findOne({
        where: { user_id: userId },
        include,
      });
    } catch (error) {
      if (showLogs) console.error(`🔥 [LinksRepo.findByUserId] Error (userId: ${userId}):`, error);
      throw error;
    }
  }

  /**
   * Crea un nuevo link
   */
  async create(data, options = {}) {
    try {
      return await Link.create(data, options);
    } catch (error) {
      if (showLogs) console.error('🔥 [LinksRepo.create] Error:', error);
      throw error;
    }
  }

  /**
   * Actualiza un link por ID
   */
  async update(id, data, options = {}) {
    try {
      const link = await Link.findByPk(id);
      if (!link) return null;
      return await link.update(data, options);
    } catch (error) {
      if (showLogs) console.error(`🔥 [LinksRepo.update] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Elimina un link por ID
   */
  async delete(id, options = {}) {
    try {
      const link = await Link.findByPk(id);
      if (!link) return null;
      await link.destroy(options);
      return true;
    } catch (error) {
      if (showLogs) console.error(`🔥 [LinksRepo.delete] Error (id: ${id}):`, error);
      throw error;
    }
  }
}

export default new LinksRepository();