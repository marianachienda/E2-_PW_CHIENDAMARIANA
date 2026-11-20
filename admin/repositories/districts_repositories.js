// admin/repositories/districts_repositories.js
import District from '../models/district.js';

const showLogs = process.env.SHOW_DB_ERRORS === 'true' || process.env.NODE_ENV === 'development';

class DistrictRepository {
  /**
   * Obtiene todos los registros
   */
  async findAll() {
    try {
      return await District.findAll();
    } catch (error) {
      if (showLogs) console.error('🔥 [DistrictRepo.findAll] Error:', error);
      throw error;
    }
  }

  /**
   * Obtiene todos los registros ordenados
   */
  async findAllSimple(options = {}) {
    try {
      const { order = [['id', 'ASC']] } = options;
      return await District.findAll({
        order,
      });
    } catch (error) {
      if (showLogs) console.error('🔥 [DistrictRepo.findAllSimple] Error:', error);
      throw error;
    }
  }

  /**
   * Obtiene registros con paginación
   */
  async findAllPaginated(options = {}) {
    try {
      const { where = {}, offset = 0, limit = 10, order = [['id', 'DESC']] } = options;
      return await District.findAll({
        where,
        offset,
        limit,
        order,
      });
    } catch (error) {
      if (showLogs) console.error('🔥 [DistrictRepo.findAllPaginated] Error:', error);
      throw error;
    }
  }

  /**
   * Cuenta registros con filtros
   */
  async count(where = {}) {
    try {
      return await District.count({ where });
    } catch (error) {
      if (showLogs) console.error('🔥 [DistrictRepo.count] Error:', error);
      throw error;
    }
  }

  /**
   * Busca distrito por ID
   */
  async findById(id) {
    try {
      return await District.findByPk(id);
    } catch (error) {
      if (showLogs) console.error(`🔥 [DistrictRepo.findById] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Crea un nuevo registro
   */
  async create(data) {
    try {
      return await District.create(data);
    } catch (error) {
      if (showLogs) console.error('🔥 [DistrictRepo.create] Error:', error);
      throw error;
    }
  }

  /**
   * Actualiza un registro por ID
   */
  async update(id, data) {
    try {
      const district = await District.findByPk(id);
      if (!district) return null;
      return await district.update(data);
    } catch (error) {
      if (showLogs) console.error(`🔥 [DistrictRepo.update] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Elimina un registro por ID
   */
  async delete(id) {
    try {
      const district = await District.findByPk(id);
      if (!district) return null;
      await district.destroy();
      return true;
    } catch (error) {
      if (showLogs) console.error(`🔥 [DistrictRepo.delete] Error (id: ${id}):`, error);
      throw error;
    }
  }
}

export default new DistrictRepository();