const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/candidates', (req, res, next) => {

    console.log(req.body);

    passport.authenticate('candidates', {

        successRedirect: '/succes',
        failureRedirect: '/falla'

    })(req, res, next);

});

router.get('/logout', (req, res) => {

    if (req.session.user.name1) {
        console.log(`${req.session.user.name1} se ha desconectado`);
    }

    req.session.destroy();
    req.logOut();
    res.send('Desconectado');

});

module.exports = router;