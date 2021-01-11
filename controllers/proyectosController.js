const Proyectos = require('../models/Proyectos');

exports.proyectosHome = (req, res) => {

    res.render('index', {
        nombrePagina: 'Proyectos'
    });

}

exports.formularioProyecto = (req, res) => {

    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    });

}

exports.nuevoProyecto = async (req, res) => {

    const { nombre } = req.body;

    // Validar
    let errores = [];

    if (!nombre.trim()) errores.push({ texto: 'Agrega un nombre al proyecto' });

    if (errores.length) return res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        errores
    });

    // Insertar en la Base de datos
    try {

        await Proyectos.create({
            nombre: nombre.trim()
        });

        res.redirect('/');

    } catch (error) {

        console.error(error);

    }
}