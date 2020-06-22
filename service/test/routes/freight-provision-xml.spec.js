const chai = require('chai');
const fs = require('fs');

const { expect } = chai;
const request = require('supertest');
const express = require('express');
const path = require('path');
const freightProvisionRoute = require('../../app.js');


describe('freight provision  /api/:client/freight_provision_mock', () => {
  let app;
  const XMLdata = fs.readFileSync(path.join(__dirname, '../input_files/freight-provision-xml.xml'), 'utf8');

  beforeEach(() => {
    app = express();
    app.use('/', freightProvisionRoute);
  });
  function deleteLine(element) {
    const i = XMLdata.indexOf(element);
    const j = XMLdata.indexOf('\n', i);
    return XMLdata.slice(0, i) + XMLdata.slice(j);
  }

  it('throw No error when everything is OK', (doneCb) => {
    request(app)
      .post('/api/tcl/freight_provision_mock')
      .send(XMLdata)
      .set('content-type', 'application/xml')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.text).to.eql('Ok');
        doneCb();
      });
  });


  function assertmodifiedPickList(modifyRequest, expectedErrLine, doneCb, str1 = null) {
    request(app)
      .post('/api/tcl/freight_provision_mock')
      .send(modifyRequest.rawBody)
      .set('content-type', 'application/xml')
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        const response = JSON.parse(res.text);
        expect(response[0].line).to.eql(expectedErrLine);
        if (str1)expect(response[0].str1).to.eql(str1);
        doneCb();
      });
  }
  it('throw error when <BKTXT is missing', (doneCb) => {
    const editedXMLdata = deleteLine('<BKTXT');
    const createModifyReq = {
      rawBody: editedXMLdata,
    };
    assertmodifiedPickList(createModifyReq, 7, doneCb);
  });
});
