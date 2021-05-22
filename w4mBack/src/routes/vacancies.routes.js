const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res) => {

    let rows = await pool.query('SELECT v.*, c.nameCompany, c.logo, ca.nameCategory FROM companies c, vacancies v, categories ca WHERE v.idCompanyfk = c.tin AND v.idCategoryfk = ca.idCategory');

    (rows.length > 0) ? res.json(rows) : res.json({ msg: 'There are no available vacancies' });;

});

router.get('/filter', async (req, res) => {

    fil = req.body;

    let filters = Array();

    let sql = 'SELECT * FROM vacancies WHERE';

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

    let rows = await pool.query(sql);

    (rows.length > 0) ? res.json(rows) : res.json({ msg: 'No vacancies where Found' });

});

module.exports = router;