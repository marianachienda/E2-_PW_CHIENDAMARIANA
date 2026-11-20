// admin/repositories/amigos_repositories.js

import Link from '../models/link.js';
import Amigo from '../models/amigo.js';
import { Op } from 'sequelize';

const showLogs = process.env.SHOW_DB_ERRORS === 'true' || process.env.NODE_ENV === 'development';

class AmigoRepository {
  /**
   * Obtiene todos los amigos sin paginación
   */
  async findAll(options = {}) {
    try {
      const { where = {}, include = [], order = [['id', 'DESC']] } = options;
      return await Amigo.findAll({
        where,
        include,
        order,
      });
    } catch (error) {
      if (showLogs) console.error('🔥 [AmigoRepo.findAll] Error:', error);
      throw error;
    }
  }

  /**
   * Obtiene amigos con paginación y filtros
   */
  async findAllPaginated(options = {}) {
    try {
      const { 
        where = {}, 
        offset = 0, 
        limit = 10, 
        order = [['id', 'DESC']],
        
      } = options;

      return await Amigo.findAndCountAll({
        where,
        offset,
        limit,
        order,
        include,
        distinct: true, // Evita conteos duplicados al usar includes N:M o 1:N
      });
    } catch (error) {
      if (showLogs) console.error('🔥 [AmigoRepo.findAllPaginated] Error:', error);
      throw error;
    }
  }

  /**
   * Cuenta los amigos con filtros
   */
  async count(where = {}) {
    try {
      return await Amigo.count({ where });
    } catch (error) {
      if (showLogs) console.error('🔥 [AmigoRepo.count] Error:', error);
      throw error;
    }
  }

  /**
   * Busca amigo   por ID con sus relaciones asociadas
   */
  async findById(id, options = {}) {
    try {
      

      return await Amigo.findByPk(id, { include });
    } catch (error) {
      if (showLogs) console.error(`🔥 [AmigoRepo.findById] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Busca amigo por user_id
   */
  async findByUserId(userId, options = {}) {
    try {
      const { include = [] } = options;
      return await Amigo.findOne({
        where: { user_id: userId },
        include,
      });
    } catch (error) {
      if (showLogs) console.error(`🔥 [AmigoRepo.findByUserId] Error (userId: ${userId}):`, error);
      throw error;
    }
  }

  /**
   * Crea un nuevo amigo
   */
  async create(data, options = {}) {
    try {
      return await Amigo.create(data, options);
    } catch (error) {
      if (showLogs) console.error('🔥 [AmigoRepo.create] Error:', error);
      throw error;
    }
  }

  /**
   * Actualiza un amigo por ID
   */
  async update(id, data, options = {}) {
    try {
      const amigo = await Amigo.findByPk(id);
      if (!amigo) return null;
      return await amigo.update(data, options);
    } catch (error) {
      if (showLogs) console.error(`🔥 [AmigoRepo.update] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Elimina un amigo por ID
   */
  async delete(id, options = {}) {
    try {
      const amigo = await Amigo.findByPk(id);
      if (!amigo) return null;
      await amigo.destroy(options);
      return true;
    } catch (error) {
      if (showLogs) console.error(`🔥 [AmigoRepo.delete] Error (id: ${id}):`, error);
      throw error;
    }
  }
}

export default new AmigoRepository();