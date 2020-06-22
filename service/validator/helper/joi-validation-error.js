/* global logger */
const { errorParser } = require('pando-errors');

class JoiValidationError {
  static construct(error) {
    logger.error(JSON.stringify(error.details));
    return error.details.map(err => errorParser(err));
  }
}

module.exports = JoiValidationError;
