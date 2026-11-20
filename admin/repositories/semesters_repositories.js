// admin/repositories/semesters_repositories.js
import Semester from '../models/semester.js';

const showLogs = process.env.SHOW_DB_ERRORS === 'true' || process.env.NODE_ENV === 'development';

class SemesterRepository {
  /**
   * Obtiene todos los registros
   */
  async findAll() {
    try {
      return await Semester.findAll();
    } catch (error) {
      if (showLogs) console.error('🔥 [SemesterRepo.findAll] Error:', error);
      throw error;
    }
  }

  /**
   * Obtiene todos los registros ordenados
   */
  async findAllSimple(options = {}) {
    try {
      const { order = [['id', 'ASC']] } = options;
      return await Semester.findAll({
        order,
      });
    } catch (error) {
      if (showLogs) console.error('🔥 [SemesterRepo.findAllSimple] Error:', error);
      throw error;
    }
  }

  /**
   * Obtiene registros con paginación
   */
  async findAllPaginated(options = {}) {
    try {
      const { where = {}, offset = 0, limit = 10, order = [['id', 'DESC']] } = options;
      return await Semester.findAll({
        where,
        offset,
        limit,
        order,
      });
    } catch (error) {
      if (showLogs) console.error('🔥 [SemesterRepo.findAllPaginated] Error:', error);
      throw error;
    }
  }

  /**
   * Cuenta registros con filtros
   */
  async count(where = {}) {
    try {
      return await Semester.count({ where });
    } catch (error) {
      if (showLogs) console.error('🔥 [SemesterRepo.count] Error:', error);
      throw error;
    }
  }

  /**
   * Busca semestre por ID
   */
  async findById(id) {
    try {
      return await Semester.findByPk(id);
    } catch (error) {
      if (showLogs) console.error(`🔥 [SemesterRepo.findById] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Crea un nuevo registro
   */
  async create(data) {
    try {
      return await Semester.create(data);
    } catch (error) {
      if (showLogs) console.error('🔥 [SemesterRepo.create] Error:', error);
      throw error;
    }
  }

  /**
   * Actualiza un registro por ID
   */
  async update(id, data) {
    try {
      const semester = await Semester.findByPk(id);
      if (!semester) return null;
      return await semester.update(data);
    } catch (error) {
      if (showLogs) console.error(`🔥 [SemesterRepo.update] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Elimina un registro por ID
   */
  async delete(id) {
    try {
      const semester = await Semester.findByPk(id);
      if (!semester) return null;
      await semester.destroy();
      return true;
    } catch (error) {
      if (showLogs) console.error(`🔥 [SemesterRepo.delete] Error (id: ${id}):`, error);
      throw error;
    }
  }
}

export default new SemesterRepository();