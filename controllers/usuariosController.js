const Usuarios = require("../models/Usuarios");

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en Uptask'
    });
}

exports.crearCuenta = async (req, res) => {

    // Leer los datos
    const { email, password } = req.body;

    await Usuarios.create({
        email,
        password
    });

    res.redirect('/iniciar-sesion');
}