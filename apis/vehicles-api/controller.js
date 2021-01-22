'use strict';

const crud = require('../../shared/crud');

const table = process.env.VEHICLE_TABLE
const createFields = [
    'nombre', 'modelo', 'fabricante', 'costoEnCreditos', 'longitud', 'velocidadMaxima', 'tripulacion', 'pasajeros',
    'capacidadCargo', 'consumibles', 'claseVehiculo', 'pilotos', 'peliculas', 'ruta',

]
const listFields = ['id', 'creado', 'actualizado'].concat(createFields)
const updateFields = createFields

const vehicleCRUD = new crud.CRUDController(table, createFields, listFields, updateFields)
module.exports.crud = vehicleCRUD
