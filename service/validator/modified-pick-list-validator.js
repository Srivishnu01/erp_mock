const Joi = require('joi').extend(require('joi-date-extensions'));
const JoiValidationError = require('./helper/joi-validation-error');
const libxmljs = require('libxmljs');
const path = require('path');
const fs = require('fs');


class ModifiedPickListValidator {
  constructor(client) {
    this.client = client;
  }
  static getSchemaForTcl() {
    const XSDdata = fs.readFileSync(path.join(__dirname, './tcl-xml-schema.xsd'), 'utf8');
    const XSDDoc = libxmljs.parseXml(XSDdata);
    return XSDDoc;
  }
  static getSchemaForMaricoAndBritania() {
    return Joi.object().required().keys({
      ModifiedPicklist: Joi.object().required().keys({
        ItemModifiedPicklist: Joi.array().required().items({
          depot_code: Joi.string().trim().required(),
          indent_id: Joi.string().trim().required(),
          type: Joi.string().trim().required().valid('PRIMARY', 'SECONDARY'),
          vehicle_number: Joi.string().required(),
          vehicle_type: Joi.string().trim().required(),
          indication: Joi.string().trim().required(),
          transporter_code: Joi.string().trim().required(),
          created_date: Joi.date().format('YYYY/MM/DDhh:mm').required(),
          truck_in_date_and_time: Joi.date().format('YYYY/MM/DDhh:mm').required(),
          pickup_code: Joi.string().trim().required(),
          delivery_number: Joi.string().trim().required(),
          line_item_no: Joi.number().min(0).integer().required(),
          sku: Joi.string().trim().required(),
          division: Joi.string().required(),
          quantity: Joi.number().required().min(0),
          quantity_unit: Joi.string().trim().required(),
          N: Joi.string().trim().required(),
          weight: Joi.number().required().min(0),
          weight_unit: Joi.string().trim().required(),
          volume: Joi.number().min(0).required(),
          volume_unit: Joi.string().trim().required(),
          category: Joi.string().trim().required(),
          lr_number: Joi.string().required(),
          ship_to: Joi.string().trim().required(),
          sold_to: Joi.string().trim().required(),
        }),
      }),
    }).options({
      abortEarly: false,
    });
  }

  validateJson(data) {
    let schema;
    switch (this.client) {
      case 'britannia':
      case 'marico': {
        schema = ModifiedPickListValidator.getSchemaForMaricoAndBritania();
        break;
      }
      default:
    }
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
  validatexml(data)
  {
    const XSDDoc = ModifiedPickListValidator.getSchemaForTcl();
    const XMLDoc = libxmljs.parseXml(data);
    // console.log(req.rawBody);
    const success = XMLDoc.validate(XSDDoc);
    // console.log(success);
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
module.exports = ModifiedPickListValidator;
