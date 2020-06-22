const express = require('express');

const epod = require('../controller/epod');

const router = express.Router({});

router.post('/epod/mock/', epod.v1Process);

module.exports = router;
