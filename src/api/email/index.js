const express = require('express');
const send = require('./send');

const router = express.Router();

router.post('/send', send);

module.exports = router;
