const libxmljs = require('libxmljs');
const path = require('path');
const fs = require('fs');

class freightProvisionValidator {
  constructor(client) {
    this.client = client;
  }

  static getSchemaForTcl() {
    const XSDdata = fs.readFileSync(path.join(__dirname, './helper/freight-provision-xml.xsd'), 'utf8');
    const XSDDoc = libxmljs.parseXml(XSDdata);
    return XSDDoc;
  }


  validate(data) {
    const XSDDoc = freightProvisionValidator.getSchemaForTcl();
    const XMLDoc = libxmljs.parseXml(data.rawBody);
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
