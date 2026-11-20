// admin/repositories/student_repository.js
import Student from '../models/student.js';
import User from '../models/user.js';
import Carrer from '../models/carrer.js';
import District from '../models/district.js';
import Semester from '../models/semester.js';
import Profile from '../models/profile.js'; // <-- 1. Importar Profile
import Skill from '../models/skill.js';
import Experience from '../models/experience.js';
import Link from '../models/link.js';
import { Op } from 'sequelize';

const showLogs = process.env.SHOW_DB_ERRORS === 'true' || process.env.NODE_ENV === 'development';

class StudentRepository {
  /**
   * Obtiene todos los estudiantes sin paginación
   */
  async findAll(options = {}) {
    try {
      const { where = {}, include = [], order = [['id', 'DESC']] } = options;
      return await Student.findAll({
        where,
        include,
        order,
      });
    } catch (error) {
      if (showLogs) console.error('🔥 [StudentRepo.findAll] Error:', error);
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
          { model: User, as: 'user', attributes: ['id', 'email'],
            include: [
              { 
                model: Profile, 
                as: 'profile', 
                attributes: ['id', 'name'] // <-- Incluimos el objeto profile
              }
            ]
          },
          { model: Carrer, as: 'carrer', attributes: ['id', 'name'] },
          { model: District, as: 'district', attributes: ['id', 'name'] },
          { model: Semester, as: 'semester', attributes: ['id', 'name'] },
        ],
      } = options;

      return await Student.findAndCountAll({
        where,
        offset,
        limit,
        order,
        include,
        distinct: true, // Evita conteos duplicados al usar includes N:M o 1:N
      });
    } catch (error) {
      if (showLogs) console.error('🔥 [StudentRepo.findAllPaginated] Error:', error);
      throw error;
    }
  }

  /**
   * Cuenta los estudiantes con filtros
   */
  async count(where = {}) {
    try {
      return await Student.count({ where });
    } catch (error) {
      if (showLogs) console.error('🔥 [StudentRepo.count] Error:', error);
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
          { model: User, as: 'user', attributes: ['id', 'email'] },
          { model: Carrer, as: 'carrer' },
          { model: District, as: 'district' },
          { model: Semester, as: 'semester' },
          { model: Skill, as: 'skills', through: { attributes: ['skill_level_id'] } },
          { model: Experience, as: 'experiences' },
          { model: Link, as: 'links' },
        ] 
      } = options;

      return await Student.findByPk(id, { include });
    } catch (error) {
      if (showLogs) console.error(`🔥 [StudentRepo.findById] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Busca estudiante por user_id
   */
  async findByUserId(userId, options = {}) {
    try {
      const { include = [] } = options;
      return await Student.findOne({
        where: { user_id: userId },
        include,
      });
    } catch (error) {
      if (showLogs) console.error(`🔥 [StudentRepo.findByUserId] Error (userId: ${userId}):`, error);
      throw error;
    }
  }

  /**
   * Crea un nuevo estudiante
   */
  async create(data, options = {}) {
    try {
      return await Student.create(data, options);
    } catch (error) {
      if (showLogs) console.error('🔥 [StudentRepo.create] Error:', error);
      throw error;
    }
  }

  /**
   * Actualiza un estudiante por ID
   */
  async update(id, data, options = {}) {
    try {
      const student = await Student.findByPk(id);
      if (!student) return null;
      return await student.update(data, options);
    } catch (error) {
      if (showLogs) console.error(`🔥 [StudentRepo.update] Error (id: ${id}):`, error);
      throw error;
    }
  }

  /**
   * Elimina un estudiante por ID
   */
  async delete(id, options = {}) {
    try {
      const student = await Student.findByPk(id);
      if (!student) return null;
      await student.destroy(options);
      return true;
    } catch (error) {
      if (showLogs) console.error(`🔥 [StudentRepo.delete] Error (id: ${id}):`, error);
      throw error;
    }
  }
}

export default new StudentRepository();