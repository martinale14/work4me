const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require('../database');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'index.html'));
});

router.get('/categories', async (req, res) => {

    const data = await pool.query('SELECT * FROM CATEGORIES');

    res.json(data);

});

module.exports = router;