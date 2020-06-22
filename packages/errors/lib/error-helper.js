const i18n = require('i18n');

function errorHelper(field, code) {
  return {
    code,
    field,
    message: i18n.__(code),
  };
}

function joiCustomErrorMessage(errors, message) {
  return {
    message,
    context: {
      errors: errors.length,
      codes: errors.map(err => err.type),
    },
  };
}

function errorParser(error) {
  return { field: error.path[0], message: error.message.replace(/"([^"]+(?="))"/g, '$1') };
}

module.exports = { errorHelper, errorParser, joiCustomErrorMessage };
