const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require('../database');

// Initial Route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Test Routes
router.get('/cities', async (req, res) => {

    const data = await pool.query('SELECT * FROM cities');

    res.json(data);

});

router.get('/user/:id', async (req, res) => {

    const data = await pool.query('SELECT * FROM candidates WHERE idCandidate = ?', [req.params.id]);

    if (data.length > 0) {

        res.json(data[0]);

    } else {

        res.json({ msg: 'no hay datos' });

    }

});

module.exports = router;