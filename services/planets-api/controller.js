'use strict';

const crud = require('../shared/crud');

const table = process.env.PLANET_TABLE
const createFields = [
    'nombre', 'periodoRotacion', 'periodoOrbital', 'diametro', 'clima', 'gravedad', 'terreno', 'aguaSuperficie',
    'poblacion', 'residentes', 'peliculas', 'ruta',

]
const listFields = ['id', 'creado', 'actualizado'].concat(createFields)
const updateFields = createFields

const planetCRUD = new crud.CRUDController(table, createFields, listFields, updateFields)
module.exports.crud = planetCRUD
