const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', (req, res, next) => {

    passport.authenticate('local.login', (err, usr) => {

        if (err) { return next(err); };

        if (!usr) { return res.json({ msg: 'Algo salio mal ...' }); };

        req.logIn(usr, (err) => {

            if (err) { return next(err); };

            if (usr.idCandidate) {
                return res.json({ msg: 'Conectado', idCandidate: usr.idCandidate });
            } else {
                return res.json({ msg: 'Conectado', tin: usr.tin });
            }

        });

    })(req, res, next);

});

router.get('/logout', (req, res) => {

    req.session.destroy();
    req.logOut();
    res.send('Desconectado');

});

module.exports = router;