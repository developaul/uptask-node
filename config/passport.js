const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Referencia al modelo
const Usuarios = require('../models/Usuarios');

// local strategy - login con credenciales propias
passport.use(
    new LocalStrategy(
        // Por default passport espera un usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: {
                        email
                    }
                });

                // El usuario éxiste pero el password es incorrecto
                if (!usuario.verificarPassword(password)) return done(null, false, {
                    message: 'Password Incorrecto'
                });

                // Email Éxiste y password correcto
                return done(null, usuario);

            } catch (error) {
                // Cuando el usuario no éxista
                return done(null, false, {
                    message: 'Esa cuenta no éxiste'
                });
            }
        }
    )
);

// Serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

// Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;