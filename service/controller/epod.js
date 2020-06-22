/* global logger */

const { ErrorCodes } = require('pando-errors');

const TransactionModel = require('../model/Transaction');

const EpodValidator = require('../validator/epod');

class epod {
  static async v1Process(req, res, next) {
    try {
      const content = req.body;
      // new object
      const Epod = new TransactionModel();
      // header
      Epod.request.method = req.method;
      Epod.request.url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      const headers = {
        accept: req.headers.accept,
        'content-type': req.headers['content-type'],
        'user-agent': req.headers['user-agent'],
        'content-length': req.headers['content-length'],
        host: req.headers.host,
        connection: req.headers.connection,
      };


      // adding header
      Epod.request.headers = headers;

      // content body
      Epod.request.body = content;

      // client name
      Epod.client = req.query.client;
      if (!Epod.client) {
        Epod.response = {
          status: ErrorCodes.BAD_REQUEST,
          code: 400,
          errors: 'client name is not mentioned',
        };
        await Epod.save();
        res.status(400).send(Epod.response.errors);
      }
      // validation
      const epodValidator = new EpodValidator();
      if (!epodValidator.validate(req.body)) {
        Epod.response = {
          status: ErrorCodes.BAD_REQUEST,
          code: 400,
          errors: epodValidator.errors,
        };
        await Epod.save();
        res.status(400).send(epodValidator.errors);
      } else {
        Epod.response = {
          status: 'Ok',
          code: 200,
        };
        await Epod.save();
        res.send('Ok');
      }
      logger.info('epod completed');
    } catch (e) {
      logger.error(`[epod - v1Process] Error in - ${e.stack}`);
      next(e);
    }
  }
}
module.exports = epod;
