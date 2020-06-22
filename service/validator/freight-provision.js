const Joi = require('joi').extend(require('joi-date-extensions'));
const fs = require('fs');
const libxmljs = require('libxmljs');
const path = require('path');
const JoiValidationError = require('./helper/joi-validation-error');

class freightProvisionValidator {
  static getGeneralSchema() {
    return Joi.object().keys({
      transporter_code: Joi.string().trim().required(),
      transporter_name: Joi.string().trim().required(),
      indent_number: Joi.string().trim().required(),
      total_indent_value: Joi.number().min(0).required(),
      material: Joi.array().required().items({
        material_code: Joi.string().trim().required(),
        consignee_code: Joi.string().trim().required(),
        total_freight_provision: Joi.number().min(0).required(),
      }),
    }).options({
      abortEarly: false,
    });
  }

  static getSchemaForTcl() {
    const XSDdata = fs.readFileSync(path.join(__dirname, './helper/freight-provision-xml.xsd'), 'utf8');
    const XSDDoc = libxmljs.parseXml(XSDdata);
    return XSDDoc;
  }

  validateJson(data) {
    const schema = freightProvisionValidator.getGeneralSchema();
    const { error, value } = Joi.validate(data, schema);
    if (error) {
      this.value = {};
      this.errors = JoiValidationError.construct(error);
      return false;
    }

    this.value = value;
    this.errors = [];
    return true;
  }
  validateXml(data){

    const XSDDoc = freightProvisionValidator.getSchemaForTcl();
    const XMLDoc = libxmljs.parseXml(data);
        const success = XMLDoc.validate(XSDDoc);
        if (success) {
          this.value = data;
          this.errors = [];
          return true;
        }
        this.errors = XMLDoc.validationErrors;
        this.value = {};
        return false;
  }
}
module.exports = freightProvisionValidator;
