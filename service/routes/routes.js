/**
 * Route to expose health endpoints.
 */
const express = require('express');
const transactionType = require('pando-constants').getTransactionType();


const erpHandler = require('../controller/controller');

const router = express.Router({});

router.post('/freight_provision_mock', erpHandler.getV1Process(transactionType.FREIGHT_PROVISION));
router.post('/modified-pick-list/:client/v1', erpHandler.getV1Process(transactionType.MODIFY_PICK_LIST));
router.post('/epod/mock', erpHandler.getV1Process(transactionType.EPOD));

module.exports = router;
