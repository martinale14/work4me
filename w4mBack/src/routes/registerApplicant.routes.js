const express = require('express');
const router = express.Router();
const pool = require('../database');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const url = require('../../../w4mFront/src/assets/url.json');

router.post('/', async (req, res, next) => {

    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

    next();

});

router.post('/', async (req, res) => {

    let user = req.body;

    user.name = user.name.split(' ');
    user.lastName = user.lastName.split(' ');

    let sql = 'INSERT INTO candidates ' +
        `(idCandidate,
         birthday,
         name1,
         name2,
         lastName1,
         lastName2,
         email,
         password,
         phoneNumber,
         profilePic,
         idCityfk)`.replaceAll(' ', '') +
        ` VALUES(?,?,?,?,?,?,?,?,?,?,?);`

    sql = sql.replace(/(\r\n|\n|\r)/gm, "");

    try {

        let rows = await pool.query('SELECT companyEmail FROM companies WHERE companyEmail = ?', [user.email]);

        if (rows.length > 0) {

            res.json({ msg: 'El email ya se encuentra en uso' });

        } else {

            await pool.query(sql,
                [user.id, user.birthday, user.name[0], user.name[1], user.lastName[0],
                user.lastName[1], user.email, user.password, user.phoneNumber, user.imageData,
                parseInt(user.idCity)]
            );

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'work4me.company@gmail.com',
                    pass: 'ggnymdaxnucadmvy'
                }
            });

            const mailOptions = {
                'from': '"work4me register" <work4me.company@gmail.com>',
                'to': user.email,
                'subject': 'Complete Register work4me',
                'html': `
                    <h1>Te has registrado en work4me</h1>
                    <p>Para verificar tu cuenta has <a href=${url.link + '/register/candidate/verify/' + user.id}>click aquí</a></p>            
                `,
            }

            await transporter.sendMail(mailOptions, (err) => {
                err ? res.json({ msg: err.message }) : res.json({ msg: 'Registro exitoso revisa tu bandeja de entrada' });
            });

        }

    } catch (err) {

        console.log(err);

        if (err.code === 'ER_DUP_ENTRY') {

            res.json({
                msg: 'Usuario ya Registrado'
            });

        }

    }

});

router.get('/verify/:id', async (req, res) => {

    try {

        let rows = await pool.query('SELECT * FROM candidates WHERE idCandidate = ?', [req.params.id]);

        if (rows.length > 0) {

            let user = rows[0];

            if (user.confirmedAccount == 0) {

                let sql = `UPDATE candidates SET ` +
                    `confirmedAccount = ? WHERE ` +
                    `idCandidate = ?`;

                await pool.query(sql, [1, rows[0].idCandidate]);

                res.json({ msg: 'Su Cuenta ha sido verificada exitosamente' });

            } else {

                res.json({ msg: 'La cuenta ya ha sido verificada' });

            }

        } else {

            res.json({ msg: 'Esta direccion no es valida' });

        }

    } catch (err) {

        res.json({ msg: err });

    }


});

router.put('/edit', async (req, res) => {

    try {
        await pool.query('CALL editCandidate(?,?,?,?)', [req.body.email, req.body.phoneNumber, req.body.description, req.body.idCandidate]);

        res.json({ msg: 'Profile updated correctly' });
    }
    catch (e) {

        res.json({ msg: 'Something were wrong' });
    }

});


module.exports = router;