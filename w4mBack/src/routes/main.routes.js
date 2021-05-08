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

module.exports = router;