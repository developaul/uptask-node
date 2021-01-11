const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');

// Controllers
const proyectosController = require('../controllers/proyectosController');

module.exports = function () {

    router.get('/', proyectosController.proyectosHome);

    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);

    router.post('/nuevo-proyecto',
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );

    return router;
}