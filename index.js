const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// Crear la conexión a la base de datos
const db = require('./config/db');

// Importar el Modelo
require('./models/Proyectos');

db.sync()
    .then(() => {
        console.log('Conectado a la base de datos');
    })
    .catch(console.error);

const app = express();

// Cargar archivos estaticos
app.use(express.static('public'));

// Habilitar view Engine
app.set('view engine', 'pug');

// Añadir vistas
app.set('views', path.join(__dirname, './views'));

// Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/', routes());

app.listen(3000);