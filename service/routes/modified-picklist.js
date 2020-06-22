
const express = require('express');

const ModifyPickList = require('../controller/modify-pick-list');

const router = express.Router({});
router.post('/modified-pick-list/:client/v1', ModifyPickList.v1Process);

module.exports = router;
