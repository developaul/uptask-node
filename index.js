const express = require('express');
const routes = require('./routes');
const path = require('path');

const app = express();

// Cargar archivos estaticos
app.use(express.static('public'));

// Habilitar view Engine
app.set('view engine', 'pug');

// Añadir vistas
app.set('views', path.join(__dirname, './views'));

// routes
app.use('/', routes());

app.listen(3000);