const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require('../database');

// Test Routes
router.get('/cities', async (req, res) => {

    const data = await pool.query('SELECT * FROM getcities');

    res.json(data);

});

router.get('/categories', async (req, res) => {

    const data = await pool.query('SELECT * FROM getcategories');

    res.json(data);

});

router.post('/userCandidate/:id', async (req, res) => {

    let data = await pool.query('SELECT * FROM candidates WHERE idCandidate = ?', [req.params.id]);

    if (data.length > 0) {

        res.json(data[0]);

    } else {

        res.json({ msg: 'no hay datos' });

    }

});

router.post('/userCompany/:id', async (req, res) => {

    let data = await pool.query('SELECT * FROM companies WHERE tin = ?', [req.params.id]);

    if (data.length > 0) {

        res.json(data[0]);

    } else {

        res.json({ msg: 'no hay datos' });

    }

});


module.exports = router;