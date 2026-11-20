// admin\apis\student_api.js
import * as linksService from '../services/links_service.js';

export function test(req, res) {
  return res.json({
    success: true,
    message: 'Active session',
    data: ':)'
  });
}

/**
 * Obtener listado simple de links (sin paginación)
 */
export async function listLinksSimple(req, res, next) {
  try {
    const result = await linksService.fetchAllSimple();
    console.log(result);

    return res.status(200).json({
      success: true,
      message: 'Links listados con éxito',
      data: result,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al listar los links',
      data: null,
      error: error.message
    });
  }
}

/**
 * Obtener links paginados con filtros (búsqueda, carrera, distrito, semestre)
 */
export async function listLinks(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || req.query.name || '';
    const studentId = req.query.carrerId || null;


    console.log(`Listando links - Página: ${page}, Límite: ${limit}, Filtro: ${search}`);

    const result = await linksService.fetchAllPaginated({
      page,
      limit,
      search,
      studentId
    });

    return res.status(200).json({
      success: true,
      message: 'Links listados con éxito',
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
      message: 'Error al listar los links',
      data: null,
      error: error.message
    });
  }
}

/**
 * Obtener un link por su ID (ej. /api/links/:id)
 */
export async function getLinksById(req, res, next) {
  try {
    const { id } = req.params;
    const link = await linksService.fetchById(id);

    if (!link) {
      return res.status(404).json({
        success: false,
        message: 'Link no encontrado',
        data: null,
        error: `No existe el link con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Link obtenido con éxito',
      data: link,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al buscar el link',
      data: null,
      error: error.message
    });
  }
}

/**
 * Crear un nuevo link (POST)
 */
export async function createLinks(req, res) {
  try {
    console.log('0 ++++++++++++++++++++');
    console.log(req.body);
    const newStudent = await linksService.create(req.body);
    console.log('1 ++++++++++++++++++++');
    console.log('2 ++++++++++++++++++++');

    return res.status(201).json({
      success: true,
      message: 'Link creado con éxito',
      data: newLink,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al crear el link',
      data: null,
      error: error.message
    });
  }
}

/**
 * Actualizar un link existente (PUT)
 */
export async function updateLinks(req, res) {
  try {
    const { id } = req.params;
    const updatedLink = await linksService.update(id, req.body);

    if (!updatedLink) {
      return res.status(404).json({
        success: false,
        message: 'Link no encontrado',
        data: null,
        error: `No existe el link con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Link actualizado con éxito',
      data: updatedLink,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar el link',
      data: null,
      error: error.message
    });
  }
}

/**
 * Eliminar un link (DELETE)
 */
export async function deleteLinks(req, res) {
  try {
    const { id } = req.params;
    const deleted = await linksService.remove(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'link no encontrado',
        data: null,
        error: `No existe el link con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'link eliminado con éxito',
      data: null,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar el link',
      data: null,
      error: error.message
    });
  }
}