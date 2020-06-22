/* global logger */

const { ErrorCodes } = require('pando-errors');
const TypeCodes = require('transaction-types')();

const TransactionModel = require('../model/Transaction');

const FreightProvisionValidator = require('../validator/freight-provision');

class freightProvision {
  static async v1Process(req, res, next) {
    try {
      const content = req.body;
      // new object
      const FreightProvision = new TransactionModel();
      // header
      FreightProvision.request.method = req.method;
      FreightProvision.request.url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      const headers = {
        accept: req.headers.accept,
        'content-type': req.headers['content-type'],
        'user-agent': req.headers['user-agent'],
        'content-length': req.headers['content-length'],
        host: req.headers.host,
        connection: req.headers.connection,
      };
      //  Transaction Type
      FreightProvision.type = TypeCodes.FREIGHT_PROVISION;

      // adding header
      FreightProvision.request.headers = headers;

      // content body
      FreightProvision.request.body = content;

      // client name
      FreightProvision.client = req.query.client;
      if (!FreightProvision.client) {
        FreightProvision.response = {
          status: ErrorCodes.BAD_REQUEST,
          code: 400,
          errors: 'client name is not mentioned',
        };
        await FreightProvision.save();
        res.status(400).send(FreightProvision.response.errors);
      }
      // validation
      const freightProvisionValidator = new FreightProvisionValidator();
      if (!freightProvisionValidator.validate(req.body)) {
        FreightProvision.response = {
          status: ErrorCodes.BAD_REQUEST,
          code: 400,
          errors: freightProvisionValidator.errors,
        };
        await FreightProvision.save();
        res.status(400).send(freightProvisionValidator.errors);
      } else {
        FreightProvision.response = {
          status: 'Ok',
          code: 200,
        };
        await FreightProvision.save();
        res.send('Ok');
      }
      logger.info('freightProvision completed');
    } catch (e) {
      logger.error(`[freightProvision - v1Process] Error in - ${e.stack}`);
      next(e);
    }
  }
}
module.exports = freightProvision;
