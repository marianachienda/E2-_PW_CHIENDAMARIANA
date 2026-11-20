// admin/apis/semesters_apis.js
import * as semesterService from '../services/semesters_services.js';

export function test(req, res) {
  return res.json({
    success: true,
    message: 'Active session',
    data: ':)'
  });
}

export async function listSemestersSimple(req, res, next) {
  try {
    const result = await semesterService.fetchAllSimple();

    return res.status(200).json({
      success: true,
      message: 'Semestres listados con éxito',
      data: result,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al listar los semestres',
      data: null,
      error: error.message
    });
  }
}

export async function listSemesters(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const name = req.query.name || '';

    const result = await semesterService.fetchAllPaginated(page, limit, name);

    return res.status(200).json({
      success: true,
      message: 'Semestres listados con éxito',
      data: {
        list: result.semesters,
        total: result.total,
        pages: result.totalPages,
        offset: result.offset,
        limit,
        page
      },
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al listar los semestres',
      data: null,
      error: error.message
    });
  }
}

export async function getSemesterById(req, res, next) {
  try {
    const { id } = req.params;
    const semester = await semesterService.fetchById(id);

    if (!semester) {
      return res.status(404).json({
        success: false,
        message: 'Semestre no encontrado',
        data: null,
        error: `No existe el semestre con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Semestre obtenido con éxito',
      data: semester,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al buscar el semestre',
      data: null,
      error: error.message
    });
  }
}

export async function createSemester(req, res) {
  try {
    const newSemester = await semesterService.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Semestre creado con éxito',
      data: newSemester,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al crear el semestre',
      data: null,
      error: error.message
    });
  }
}

export async function updateSemester(req, res) {
  try {
    const { id } = req.params;
    const updatedSemester = await semesterService.update(id, req.body);

    if (!updatedSemester) {
      return res.status(404).json({
        success: false,
        message: 'Semestre no encontrado',
        data: null,
        error: `No existe el semestre con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Semestre actualizado con éxito',
      data: updatedSemester,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar el semestre',
      data: null,
      error: error.message
    });
  }
}

export async function deleteSemester(req, res) {
  try {
    const { id } = req.params;
    const deleted = await semesterService.remove(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Semestre no encontrado',
        data: null,
        error: `No existe el semestre con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Semestre eliminado con éxito',
      data: null,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar el semestre',
      data: null,
      error: error.message
    });
  }
}