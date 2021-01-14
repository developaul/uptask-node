const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {

    // Obtenemos el proyecto actual
    const proyecto = await Proyectos.findOne({ where: { url: req.params.url } });

    // Leer el valor del Input
    const { tarea } = req.body;

    // Estado por defecto y id del proyecto
    const estado = 0;
    const { id: proyectoId } = proyecto.dataValues;

    // Insertando en la Base de Datos
    const resultado = await Tareas.create({ tarea, estado, proyectoId });

    if (!resultado) return next();

    // Redireccionar
    res.redirect(`/proyectos/${req.params.url}`);
}
