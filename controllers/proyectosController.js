const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

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

    const [proyectos, proyecto] = await Promise.all([
        Proyectos.findAll(),
        Proyectos.findOne({
            where: {
                url: req.params.url
            }
        })
    ]);

    // Consultar tareas del proyecto actual
    const tareas = await Tareas.findAll({
        where: {
            proyectoid: proyecto.id
        }
    });

    if (!proyecto) return next();

    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    });
}

exports.formularioEditar = async (req, res) => {

    const [proyectos, proyecto] = await Promise.all([
        Proyectos.findAll(),
        Proyectos.findOne({
            where: {
                id: req.params.id
            }
        })
    ]);

    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    });
}

exports.actualizarProyecto = async (req, res) => {

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

    // Actualizando en la Base de datos
    try {

        await Proyectos.update(
            { nombre: nombre.trim() },
            { where: { id: req.params.id } }
        );

        res.redirect('/');

    } catch (error) {

        console.error(error);

    }
}

exports.eliminarProyecto = async (req, res, next) => {

    const { urlProyecto } = req.query;

    const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });

    if (!resultado) return next();

    res.status(200).send('Proyecto Eliminado Correctamente');

}