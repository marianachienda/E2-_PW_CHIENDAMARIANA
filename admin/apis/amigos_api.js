// admin\apis\amigo_api.js
import * as amigoService from '../services/amigos_service.js';

export function test(req, res) {
  return res.json({
    success: true,
    message: 'Active session',
    data: ':)'
  });
}

/**
 * Obtener listado simple de amigos (sin paginación)
 */
export async function listAmigosSimple(req, res, next) {
  try {
    const result = await amigoService.fetchAllSimple();
    console.log(result);

    return res.status(200).json({
      success: true,
      message: 'Amigos listados con éxito',
      data: result,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al listar los amigos',
      data: null,
      error: error.message
    });
  }
}

/**
 * Obtener amigos paginados con filtros (búsqueda, carrera, distrito, semestre)
 */
export async function listAmigos(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || req.query.name || '';
    

    console.log(`Listando amigos - Página: ${page}, Límite: ${limit}, Filtro: ${search}`);

   

    return res.status(200).json({
      success: true,
      message: 'Amigos listados con éxito',
      data: {
        list: result.amigos,
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
      message: 'Error al listar los amigos',
      data: null,
      error: error.message
    });
  }
}

/**
 * Obtener un amigo por su ID (ej. /api/amigos/:id)
 */
export async function getAmigoById(req, res, next) {
  try {
    const { id } = req.params;
    const amigo = await amigoService.fetchById(id);

    if (!amigo) {
      return res.status(404).json({
        success: false,
        message: 'Amigo no encontrado',
        data: null,
        error: `No existe el amigo con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Amigo obtenido con éxito',
      data: amigo,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al buscar el amigo',
      data: null,
      error: error.message
    });
  }
}

/**
 * Crear un nuevo amigo (POST)
 */
export async function createAmigo(req, res) {
  try {
    console.log('0 ++++++++++++++++++++');
    console.log(req.body);
    const newAmigo = await amigoService.create(req.body);
    console.log('1 ++++++++++++++++++++');
    console.log('2 ++++++++++++++++++++');

    return res.status(201).json({
      success: true,
      message: 'Amigo creado con éxito',
      data: newAmigo,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al crear el amigo',
      data: null,
      error: error.message
    });
  }
}

/**
 * Actualizar un amigo existente (PUT)
 */
export async function updateAmigo(req, res) {
  try {
    const { id } = req.params;
    const updatedAmigo = await amigoService.update(id, req.body);

    if (!updatedAmigo) {
      return res.status(404).json({
        success: false,
        message: 'Amigo no encontrado',
        data: null,
        error: `No existe el amigo con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Amigo actualizado con éxito',
      data: updatedAmigo,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar el amigo',
      data: null,
      error: error.message
    });
  }
}

/**
 * Eliminar un amigo (DELETE)
 */
export async function deleteAmigo(req, res) {
  try {
    const { id } = req.params;
    const deleted = await amigoService.remove(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Amigo no encontrado',
        data: null,
        error: `No existe el amigo con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Amigo eliminado con éxito',
      data: null,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar el amigo',
      data: null,
      error: error.message
    });
  }
}