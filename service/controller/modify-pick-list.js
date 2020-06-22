/* global logger */
const { ErrorCodes } = require('pando-errors');
const Transaction = require('../model/Transaction');
const ModifiedPickListValidator = require('../validator/modified-pick-list-validator');

class ModifyPickList {
  static async v1Process(req, res, next) {
    try {
      const content = req.body;
      // new object
      const transaction = new Transaction();
      // header
      transaction.request.method = req.method;
      transaction.request.url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      const headers = {
        accept: req.headers.accept,
        'content-type': req.headers['content-type'],
        'user-agent': req.headers['user-agent'],
        'content-length': req.headers['content-length'],
        host: req.headers.host,
        connection: req.headers.connection,
      };

      transaction.type = 'modified_Pick_list';

      // client name
      transaction.client = req.params.client;

      // adding header
      transaction.request.headers = headers;
      // content body
      transaction.request.body = content;
      // validation
      const modifiedPickListValidator = new ModifiedPickListValidator(transaction.client);
      if (!modifiedPickListValidator.validate(req.body)) {
        transaction.response = {
          status: ErrorCodes.BAD_REQUEST,
          code: 400,
          errors: modifiedPickListValidator.errors,
        };
        await transaction.save();
        res.status(400).send(modifiedPickListValidator.errors);
      } else {
        transaction.response = {
          status: 'Ok',
          code: 200,
        };
        await transaction.save();
        res.send('Ok');
      }
      logger.info('[ModifyPickList - v1Process] completed');
    } catch (e) {
      logger.error(`[ModifyPickList - v1Process] Error in - ${e.stack}`);
      next(e);
    }
  }
}
module.exports = ModifyPickList;
