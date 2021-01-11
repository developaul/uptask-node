const Proyectos = require('../models/Proyectos');

exports.proyectosHome = async (req, res) => {

    const proyectos = await Proyectos.findAll();

    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });

}

exports.formularioProyecto = async (req, res) => {

    const proyectos = await Proyectos.findAll();

    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });

}

exports.nuevoProyecto = async (req, res) => {

    const proyectos = await Proyectos.findAll();

    const { nombre } = req.body;

    // Validar
    let errores = [];

    if (!nombre.trim()) errores.push({ texto: 'Agrega un nombre al proyecto' });

    if (errores.length) return res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        errores,
        proyectos
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

exports.proyectoPorUrl = async (req, res, next) => {
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    if (!proyecto) return next();

    const proyectos = await Proyectos.findAll();

    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos
    });
}