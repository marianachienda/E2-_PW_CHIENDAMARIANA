// admin/repositories/profiles_repository.js
import Profile from '../models/profile.js';
import { Op } from 'sequelize';

const showLogs = process.env.SHOW_DB_ERRORS === 'true' || process.env.NODE_ENV === 'development';

class ProfileRepository {
  /**
   * Obtiene todos los registros
   */
  async findAll() {
    try {
      return await Profile.findAll(); // SELECT * FROM profiles;
    } catch (error) {
      if (showLogs) console.error('🔥 [ProfileRepo.findAll] Error:', error);
      throw error;
    }
  }

  /**
   * Obtiene registros con paginación
   */
  async findAllPaginated(options = {}) {
    try {
      const { where = {}, offset = 0, limit = 10, order = [['id', 'DESC']] } = options;
      return await Profile.findAll({
        where,
        offset,
        limit,
        order,
      }); // SELECT * FROM profiles WHERE name LIKE '%%' LIMIT = ? OFFSET = ?;
    } catch (error) {
      if (showLogs) console.error('🔥 [ProfileRepo.findAllPaginated] Error:', error);
      throw error;
    }
  }

  async findAllSimple(options = {}) {
    try {
      const { order = [['id', 'DESC']] } = options;
      return await Profile.findAll({
        order,
      }); // SELECT * FROM profiles ORDER BY id DESC;
    } catch (error) {
      if (showLogs) console.error('🔥 [ProfileRepo.findAllSimple] Error:', error);
      throw error;
    }
  }

  /**
   * Cuenta registros con filtros
   */
  async count(where = {}) {
    try {
      return await Profile.count({ where });
       // SELECT COUNT(*) FROM profiles WHERE LIKE '%{nombre}%';
    } catch (error) {
      if (showLogs) console.error('🔥 [ProfileRepo.count] Error:', error);
      throw error;
    }
  }

  /**
   * Busca prefil por ID
   */
  async findById(id) {
    try {
      return await Profile.findByPk(id); // SELECT * FROM profiles WHERE id = :id
    } catch (error) {
      if (showLogs) console.error(`🔥 [ProfileRepo.findById] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Crea un nuevo registro
   */
  async create(data) {
    try {
      return await Profile.create(data);
    } catch (error) {
      if (showLogs) console.error('🔥 [ProfileRepo.create] Error:', error);
      throw error;
    }
  }

  /**
   * Actualiza un registro por ID
   */
  async update(id, data) {
    try {
      const profile = await Profile.findByPk(id); // SELECT * FROM profiles WHERE id = :id;
      if (!profile) return null;
      return await profile.update(data);
    } catch (error) {
      if (showLogs) console.error(`🔥 [ProfileRepo.update] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Elimina un registro por ID
   */
  async delete(id) {
    try {
      const profile = await Profile.findByPk(id);
      // SELECT * FROM profiles WHERE id = :id
      if (!profile) return null;
      await profile.destroy(); // DELETE FROM profiles WHERE id = :id
      return true;
    } catch (error) {
      if (showLogs) console.error(`🔥 [ProfileRepo.delete] Error (id: ${id}):`, error);
      throw error;
    }
  }
}

export default new ProfileRepository();