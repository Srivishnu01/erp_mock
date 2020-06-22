const express = require('express');

const freightProvision = require('../controller/freight-provision');

const router = express.Router({});

router.post('/freight_provision_mock', freightProvision.v1Process);

module.exports = router;
