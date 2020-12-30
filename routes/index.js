const express = require('express');
const router = express.Router();

// Controllers
const proyectosController = require('../controllers/proyectosController');

module.exports = function () {

    router.get('/', proyectosController.proyectosHome);

    return router;
}