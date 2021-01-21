const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos son Obligatorios'
});

// Revisar si el usuario esta logeado o no
exports.usuarioAutenticado = (req, res, next) => {
    // Si el usuario esta autenticado adelante
    if (req.isAuthenticated()) return next();

    // Si no redirigir al formulario
    return res.redirect('/iniciar-sesion');
}

// Función para cerrar sesión
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion'); // Una vez cerrada la sesión lo lleva a iniciar sesión
    });
} 