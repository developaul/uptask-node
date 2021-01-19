const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// helpers
const helpers = require('./helpers');

// Crear la conexión a la base de datos
const db = require('./config/db');

// Importar el Modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

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

// Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Añadir vistas
app.set('views', path.join(__dirname, './views'));

// agregar flash messages
app.use(flash());

app.use(cookieParser());

// Sessiones nos permiten navegar sobre distintas páginas
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}))

// Pasar var dump a la aplicación
app.use((req, res, next) => {
    // Estableciendo variables que estaran disponibles en toda la app
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    next();
});

// routes
app.use('/', routes());

app.listen(3000);