const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res) => {

    try {
        let rows = await pool.query('SELECT * FROM applications WHERE idCandidatefk = ?', [req.body.idCandidate]);

        (rows.length > 0) ? res.json(rows) : res.json({ msg: 'You didn´t applied yet to any vacant' });

    } catch (e) {
        res.json({ msg: 'Something Went Wrong' })
    }

});

router.post('/add', async (req, res) => {

    data = req.body;

    try {
        await pool.query('CALL applyToJob(?, ?, ?)', [data.idVacant, data.idCandidate, data.cv]);
        res.json({ msg: 'Application Sent' });
    } catch (e) {
        res.json({ msg: 'Something were wrong' });
    }

});

router.post('/edit', async (req, res) => {

    data = req.body;

    try {
        await pool.query('CALL responseToApplication(?,?)', [data.idApplication, data.approved]);
        res.json({ msg: 'Application Updated' });
    } catch (e) {
        res.json({ meg: 'Something were wrong' });
    }

});

router.delete('/delete', async (req, res) => {

    try {
        await pool.query('DELETE FROM applications WHERE idApplication = ?', [req.body.idApplication]);

        res.json({ msg: 'Application deleted correctly' });
    } catch (e) {
        res.json({ msg: 'Something were wrong' });
    }

});



module.exports = router;