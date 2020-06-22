/* global logger */

const { ErrorCodes } = require('pando-errors');
const TypeCodes = require('pando-constants').getTransactionType();

const TransactionModel = require('../model/Transaction');

const FreightProvisionValidator = require('../validator/freight-provision');
const EpodValidator = require('../validator/epod');
const ModifiedPickListValidator = require('../validator/modified-pick-list-validator');

class erpHandler {

  static  getV1Process(type){
    async function v1Process(req, res, next) {
    try {
      const content = req.body;
      // new object
      const Transaction = new TransactionModel();
      // header
      Transaction.request.method = req.method;
      Transaction.request.url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      const headers = {
        accept: req.headers.accept,
        'content-type': req.headers['content-type'],
        'user-agent': req.headers['user-agent'],
        'content-length': req.headers['content-length'],
        host: req.headers.host,
        connection: req.headers.connection,
      };
      //  Transaction Type
      Transaction.type = type;//TypeCodes.FREIGHT_PROVISION;

      // adding header
      Transaction.request.headers = headers;

      // content body
      Transaction.request.body = content;

      // client name
      Transaction.client = req.query.client;
      if (!Transaction.client) {
        Transaction.response = {
          status: ErrorCodes.BAD_REQUEST,
          code: 400,
          errors: 'client name is not mentioned',
        };
        await Transaction.save();
        res.status(400).send(Transaction.response.errors);
      }
      // validation
      let Validator;
      switch(type){
        case TypeCodes.FREIGHT_PROVISION:{
            Validator = new FreightProvisionValidator();
            break;
        }
        case TypeCodes.MODIFY_PICK_LIST:{
            Validator = new ModifiedPickListValidator(Transaction.client);
            break;
        }
        case TypeCodes.EPOD:{
            Validator = new EpodValidator();
            break;
        }
      }
      if ( headers['content-type'].indexOf('application/json') === 0 && !Validator.validateJson(req.body)) {
        Transaction.response = {
          status: ErrorCodes.BAD_REQUEST,
          code: 400,
          errors: Validator.errors,
        };
        await Transaction.save();
        res.status(400).send(Validator.errors);
      } 
      else if ((headers['content-type'].indexOf('application/xml')===0)&&!Validator.validateXml(req.rawBody)) {
        Transaction.response = {
          status: ErrorCodes.BAD_REQUEST,
          code: 400,
          errors: Validator.errors,
        };
        await Transaction.save();
        res.status(400).send(Validator.errors);
      } 
      else {
        Transaction.response = {
          status: 'Ok',
          code: 200,
        };
        await Transaction.save();
        res.send('Ok');
      }
      logger.info(type+' completed');
    } catch (e) {
      logger.error(`[`+type+`- v1Process] Error in - ${e.stack}`);
      next(e);
    }
  } 
  return v1Process;  
  }
}
module.exports = erpHandler;
