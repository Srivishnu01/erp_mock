const express = require('express');

const freightProvision = require('../controller/freight-provision-xml');

const router = express.Router({});
router.post('/:client/freight_provision_mock', freightProvision.v1Process);
module.exports = router;
