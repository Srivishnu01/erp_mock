const Joi = require('joi').extend(require('joi-date-extensions'));
const JoiValidationError = require('./helper/joi-validation-error');

class epodValidator {
  static getGeneralSchema() {
    return Joi.object().keys({
      transporter_code: Joi.string().trim().required(),
      transporter_name: Joi.string().trim().required(),
      indent_no: Joi.string().trim().required(),
      vehicle_type: Joi.string().trim().required(),
      vehicle_name: Joi.string().trim().required(),
      vehicle_description: Joi.string().trim().required(),
      truck_in: Joi.date().format('YYYY/MM/DD hh:mm').required(),
      truck_out: Joi.date().format('YYYY/MM/DD hh:mm').required(),
      consignees: Joi.array().required().items({
        ship_to: Joi.string().trim().required(),
        sold_to: Joi.string().trim().required(),
        expected_date: Joi.date().format('YYYY/MM/DD hh:mm').required(),
        reach_date: Joi.date().format('YYYY/MM/DD hh:mm').required(),
        release_date: Joi.date().format('YYYY/MM/DD hh:mm').required(),
        lr_uploaded: Joi.string().trim().required().valid('Yes', 'No'),
        materials: Joi.array().required().items({
          material_code: Joi.string().trim().required(),
          material_invoice_number: Joi.string().trim().required(),
          delivery_number: Joi.string().trim().required(),
          no_of_shortage: Joi.number().integer().min(0).required(),
          no_of_leakage: Joi.number().integer().min(0).required(),
          no_of_excess: Joi.number().integer().min(0).required(),
          no_of_damage: Joi.number().integer().min(0).required(),
          no_of_carton_damage: Joi.number().integer().min(0).required(),
          lr_number: Joi.string().trim().required(),
        }),
      }),
    }).options({
      abortEarly: false,
    });
  }

  validate(data) {
    const schema = epodValidator.getGeneralSchema();
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
}
module.exports = epodValidator;
