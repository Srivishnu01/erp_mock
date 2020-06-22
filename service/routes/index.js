const express = require('express');

const router = express.Router();
//router.use(require('./modified-picklist'));
//router.use(require('./epod'));
//router.use(require('./freight-provision'));
//router.use(require('./freight-provision-xml'));
router.use(require('./routes'));

module.exports = router;
