const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res) => {

    let rows = await pool.query('SELECT v.*, c.nameCompany, c.logo, ca.nameCategory, ci.nameCity FROM vacancies v INNER JOIN companies c ON v.idCompanyfk = c.tin INNER JOIN categories ca ON v.idCategoryfk = ca.idCategory INNER JOIN cities ci ON v.idCityfk = ci.idCity ORDER BY v.publicationDate DESC');

    (rows.length > 0) ? res.json(rows) : res.json({ msg: 'There are no available vacancies' });;

});

router.post('/filter', async (req, res) => {

    fil = req.body;

    let filters = Array();

    let sql = 'SELECT v.*, c.nameCompany, ca.nameCategory, ci.nameCity FROM vacancies v INNER JOIN companies c ON v.idCompanyfk = c.tin INNER JOIN categories ca ON v.idCategoryfk = ca.idCategory INNER JOIN cities ci ON v.idCityfk = ci.idCity WHERE';

    fil.category ? filters.push(`idCategoryfk = ${fil.category}`) : null;
    fil.city ? filters.push(`idCityfk = ${fil.city}`) : null;

    if (fil.minSalary && fil.maxSalary) {

        filters.push(`salary BETWEEN ${fil.minSalary}`);
        filters.push(`${fil.maxSalary}`);

    } else {

        fil.minSalary ? filters.push(`salary > ${fil.minSalary}`) : null;
        fil.maxSalary ? filters.push(`salary < ${fil.maxSalary}`) : null;

    }

    filters.forEach((filter, i) => sql += `${(i != 0) ? ' AND' : ''} ${filter}`);

    sql += ' ORDER BY v.publicationDate DESC';

    let rows = await pool.query(sql);

    (rows.length > 0) ? res.json(rows) : res.json({ msg: 'No vacancies where Found' });

});

module.exports = router;