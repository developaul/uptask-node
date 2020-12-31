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

exports.nuevoProyecto = (req, res) => {

    const { nombre } = req.body;

    let errores = [];

    // Validar
    if (!nombre.trim()) errores.push({ 'texto': 'Agrega un nombre al proyecto' });

    if (errores.length) return res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        errores
    });

    // Insertar en la Base de datos

}