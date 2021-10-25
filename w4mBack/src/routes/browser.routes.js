const express = require('express');
const router = express.Router();
const path = require('path');

const response = (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));

router.get('*', (req, res) => { response(req, res) });

module.exports = router;
