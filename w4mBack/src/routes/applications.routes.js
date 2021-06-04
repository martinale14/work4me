const express = require('express');
const router = express.Router();
const pool = require('../database');

router.post('/', async (req, res) => {

    try {
        let rows = await pool.query(`SELECT v.*, c.nameCompany, c.logo, ca.nameCategory, ci.nameCity, ap.approved, ap.idApplication 
            FROM vacancies v 
            INNER JOIN companies c 
            ON v.idCompanyfk = c.tin 
            INNER JOIN categories ca 
            ON v.idCategoryfk = ca.idCategory 
            LEFT JOIN cities ci 
            ON v.idCityfk = ci.idCity 
            INNER JOIN applications ap 
            ON v.idVacant = ap.idVacancyfk 
            WHERE ap.idCandidatefk = ?`, [req.body.idCandidate]);

        (rows.length > 0) ? res.json(rows) : res.json({ msg: 'You didn´t publish any vacant yet' });

    } catch (e) {
        res.json({ msg: 'Something Went Wrong' });
    }

});

router.post('/requests', async (req, res) => {

    try {
        let rows = await pool.query(`SELECT ap.*, ca.name1, ca.name2, ca.lastName1, ca.lastName2, ca.profilePic 
        FROM applications ap 
        INNER JOIN candidates ca 
        ON ap.idCandidatefk = ca.idCandidate 
        WHERE ap.idVacancyfk = ?`, [req.body.idVacancy]);

        (rows.length > 0) ? res.json(rows) : res.json({ msg: 'No one has applied to your vacant yet' });

    } catch (e) {
        res.json({ msg: 'Something Went Wrong' });
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

router.put('/edit', async (req, res) => {

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