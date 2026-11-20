// admin\apis\student_api.js
import * as studentService from '../services/students_service.js';

export function test(req, res) {
  return res.json({
    success: true,
    message: 'Active session',
    data: ':)'
  });
}

/**
 * Obtener listado simple de estudiantes (sin paginación)
 */
export async function listStudentsSimple(req, res, next) {
  try {
    const result = await studentService.fetchAllSimple();
    console.log(result);

    return res.status(200).json({
      success: true,
      message: 'Estudiantes listados con éxito',
      data: result,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al listar los estudiantes',
      data: null,
      error: error.message
    });
  }
}

/**
 * Obtener estudiantes paginados con filtros (búsqueda, carrera, distrito, semestre)
 */
export async function listStudents(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || req.query.name || '';
    const carrerId = req.query.carrerId || null;
    const districtId = req.query.districtId || null;
    const semesterId = req.query.semesterId || null;

    console.log(`Listando estudiantes - Página: ${page}, Límite: ${limit}, Filtro: ${search}`);

    const result = await studentService.fetchAllPaginated({
      page,
      limit,
      search,
      carrerId,
      districtId,
      semesterId
    });

    return res.status(200).json({
      success: true,
      message: 'Estudiantes listados con éxito',
      data: {
        list: result.students,
        total: result.total,
        pages: result.totalPages,
        offset: result.offset,
        limit: limit,
        page: page
      },
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al listar los estudiantes',
      data: null,
      error: error.message
    });
  }
}

/**
 * Obtener un estudiante por su ID (ej. /api/students/:id)
 */
export async function getStudentById(req, res, next) {
  try {
    const { id } = req.params;
    const student = await studentService.fetchById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado',
        data: null,
        error: `No existe el estudiante con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Estudiante obtenido con éxito',
      data: student,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al buscar el estudiante',
      data: null,
      error: error.message
    });
  }
}

/**
 * Crear un nuevo estudiante (POST)
 */
export async function createStudent(req, res) {
  try {
    console.log('0 ++++++++++++++++++++');
    console.log(req.body);
    const newStudent = await studentService.create(req.body);
    console.log('1 ++++++++++++++++++++');
    console.log('2 ++++++++++++++++++++');

    return res.status(201).json({
      success: true,
      message: 'Estudiante creado con éxito',
      data: newStudent,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al crear el estudiante',
      data: null,
      error: error.message
    });
  }
}

/**
 * Actualizar un estudiante existente (PUT)
 */
export async function updateStudent(req, res) {
  try {
    const { id } = req.params;
    const updatedStudent = await studentService.update(id, req.body);

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado',
        data: null,
        error: `No existe el estudiante con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Estudiante actualizado con éxito',
      data: updatedStudent,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar el estudiante',
      data: null,
      error: error.message
    });
  }
}

/**
 * Eliminar un estudiante (DELETE)
 */
export async function deleteStudent(req, res) {
  try {
    const { id } = req.params;
    const deleted = await studentService.remove(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado',
        data: null,
        error: `No existe el estudiante con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Estudiante eliminado con éxito',
      data: null,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar el estudiante',
      data: null,
      error: error.message
    });
  }
}