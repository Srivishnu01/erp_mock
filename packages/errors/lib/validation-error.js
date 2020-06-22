const i18n = require('i18n');
const AppError = require('./app-error');

class ValidationError extends AppError {
  constructor(code, data, status = '') {
    const message = i18n.__(code, data);
    super(message || 'Invalid Value', 400);
    if (status) {
      this.status = status;
    }
    this.code = code;
  }
}

module.exports = ValidationError;
