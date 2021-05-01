const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const pool = require('../database');

passport.use('companies', new Strategy({

    usernameField: 'companyEmail',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, email, password, done) => {

    const rows = await pool.query('SELECT * FROM companies WHERE companyEmail = ?', [email]);

    if (rows.length > 0) {

        const user = rows[0];

        if (password == user.password) {

            req.session.user = user;
            console.log(`${user.nameCompany} ha ingresado`);
            done(null, user);

        } else {

            console.log('Contraseña Incorrecta');
            done(null, false);

        }

    } else {

        console.log('Usuario no Encontrado');
        done(null, false);

    }

}));

passport.serializeUser((user, done) => {

    done(null, user.tin);

});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM candidates WHERE tin = ?', [id]);
    done(null, rows[0]);
});
