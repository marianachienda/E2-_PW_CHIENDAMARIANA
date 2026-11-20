// admin/apis/districts_apis.js
import * as districtService from '../services/districts_services.js';

export function test(req, res) {
  return res.json({
    success: true,
    message: 'Active session',
    data: ':)'
  });
}

export async function listDistrictsSimple(req, res, next) {
  try {
    const result = await districtService.fetchAllSimple();

    return res.status(200).json({
      success: true,
      message: 'Distritos listados con éxito',
      data: result,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al listar los distritos',
      data: null,
      error: error.message
    });
  }
}

export async function listDistricts(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const name = req.query.name || '';

    const result = await districtService.fetchAllPaginated(page, limit, name);

    return res.status(200).json({
      success: true,
      message: 'Distritos listados con éxito',
      data: {
        list: result.districts,
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
      message: 'Error al listar los distritos',
      data: null,
      error: error.message
    });
  }
}

export async function getDistrictById(req, res, next) {
  try {
    const { id } = req.params;
    const district = await districtService.fetchById(id);

    if (!district) {
      return res.status(404).json({
        success: false,
        message: 'Distrito no encontrado',
        data: null,
        error: `No existe el distrito con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Distrito obtenido con éxito',
      data: district,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al buscar el distrito',
      data: null,
      error: error.message
    });
  }
}

export async function createDistrict(req, res) {
  try {
    const newDistrict = await districtService.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Distrito creado con éxito',
      data: newDistrict,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al crear el distrito',
      data: null,
      error: error.message
    });
  }
}

export async function updateDistrict(req, res) {
  try {
    const { id } = req.params;
    const updatedDistrict = await districtService.update(id, req.body);

    if (!updatedDistrict) {
      return res.status(404).json({
        success: false,
        message: 'Distrito no encontrado',
        data: null,
        error: `No existe el distrito con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Distrito actualizado con éxito',
      data: updatedDistrict,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar el distrito',
      data: null,
      error: error.message
    });
  }
}

export async function deleteDistrict(req, res) {
  try {
    const { id } = req.params;
    const deleted = await districtService.remove(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Distrito no encontrado',
        data: null,
        error: `No existe el distrito con el id ${id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Distrito eliminado con éxito',
      data: null,
      error: null
    });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar el distrito',
      data: null,
      error: error.message
    });
  }
}