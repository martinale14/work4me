const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const pool = require('../database');
const bcrypt = require('bcrypt');

var user = {};

passport.use('local.login', new Strategy({

    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, email, password, done) => {

    let rows = await pool.query('SELECT * FROM candidates WHERE email = ?', [email]);

    if (rows.length > 0) {

        user = rows[0];

        bcrypt.compare(password, user.password, (err, result) => {

            if (err) {
                done(null, false);
            }

            if (result) {

                req.session.user = user;
                console.log(`${req.session.user.name1} ha ingresado`);
                done(null, user);

            } else {

                console.log('Contraseña Incorrecta');
                done(null, false);

            }



        });


    } else {

        rows = await pool.query('SELECT * FROM companies WHERE companyEmail = ?', [email]);

        if (rows.length > 0) {

            user = rows[0];

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


    }

}));

passport.serializeUser((bUser, done) => {

    if (bUser.idCandidate) {
        done(null, bUser.email);
    } else {
        done(null, bUser.companyEmail);
    }


});

passport.deserializeUser(async (email, done) => {

    let rows = await pool.query('SELECT * FROM candidates WHERE email = ?', [email]);

    if (rows > 0) {

        done(null, rows[0]);

    } else {

        rows = await pool.query('SELECT * FROM companies WHERE companyEmail = ?', [email]);

        if (rows > 0) {

            done(null, rows[0]);

        } else {
            done(null, false);
        }

    }

});



