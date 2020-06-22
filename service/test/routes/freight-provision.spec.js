/* gobal logger */
const chai = require('chai');

const fs = require('fs');

const { expect } = chai;

const request = require('supertest');

const express = require('express');

const bodyParser = require('body-parser');

const { ValidationError } = require('express-validation');

const path = require('path');

const epod = require('../../app.js');


function validation(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  // render the error page
  res.status(err.status || 500);
  res.render('error');
}

describe('freight provision api/freight_provision_mock?client=marico', () => {
  let app;
  let json;
  const rawdata = fs.readFileSync(path.join(__dirname, '../input_files/freight-provision.json'));

  beforeEach(() => {
    json = JSON.parse(rawdata);
    app = express();
    app.use(bodyParser.json());
    app.use('/', epod);
    app.use(validation);
  });

  function assertEpod(epodRequest, expectedErrObj, doneCb) {
    request(app)
      .post('/api/freight_provision_mock?client=marico')
      .send(epodRequest.body)
      .set('content-type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        const response = JSON.parse(res.text);
        expect(response[0].message).to.eql(expectedErrObj);
        doneCb();
      });
  }
  it('throw no error when All are ok', (doneCb) => {
    const ReqJson = json;
    const createReq = {
      body: ReqJson,
    };

    request(app)
      .post('/api/freight_provision_mock?client=marico')
      .send(createReq.body)
      .set('content-type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.text).to.eql('Ok');

        doneCb();
      });
  });

  it('throw error when transporter_code is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.transporter_code;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'transporter_code is required', doneCb);
  });

  it('throw error when transporter_name is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.transporter_name;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'transporter_name is required', doneCb);
  });

  it('throw error when intdent_number is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.indent_number;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'indent_number is required', doneCb);
  });
  it('throw error when total_intdent_value is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.total_indent_value;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'total_indent_value is required', doneCb);
  });
  it('throw error when material is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.material;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'material is required', doneCb);
  });

  it('throw error when material_code is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.material[0].material_code;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'material_code is required', doneCb);
  });

  it('throw error when consignee_code is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.material[0].consignee_code;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'consignee_code is required', doneCb);
  });
  it('throw error when total_freight_provision is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.material[0].total_freight_provision;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'total_freight_provision is required', doneCb);
  });
  it('throw error when transporter_code is not string', (doneCb) => {
    const ReqJson = json;

    ReqJson.transporter_code = 710;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'transporter_code must be a string', doneCb);
  });

  it('throw error when transporter_name is not string', (doneCb) => {
    const ReqJson = json;

    ReqJson.transporter_name = 710;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'transporter_name must be a string', doneCb);
  });

  it('throw error when intdent_number is not string', (doneCb) => {
    const ReqJson = json;

    ReqJson.indent_number = 10;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'indent_number must be a string', doneCb);
  });
  it('throw error when total_intdent_value is not number', (doneCb) => {
    const ReqJson = json;

    ReqJson.total_indent_value = 'test';
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'total_indent_value must be a number', doneCb);
  });
  it('throw error when material is not array', (doneCb) => {
    const ReqJson = json;

    ReqJson.material = 'test';
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'material must be an array', doneCb);
  });

  it('throw error when material_code is not string', (doneCb) => {
    const ReqJson = json;

    ReqJson.material[0].material_code = 710;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'material_code must be a string', doneCb);
  });

  it('throw error when consignee_code is not string', (doneCb) => {
    const ReqJson = json;

    ReqJson.material[0].consignee_code = 710;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'consignee_code must be a string', doneCb);
  });
  it('throw error when total_freight_provision is not number', (doneCb) => {
    const ReqJson = json;

    ReqJson.material[0].total_freight_provision = 'test';
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'total_freight_provision must be a number', doneCb);
  });

  it('throw error when total_intdent_value is not number', (doneCb) => {
    const ReqJson = json;

    ReqJson.total_indent_value = -1;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'total_indent_value must be larger than or equal to 0', doneCb);
  });

  it('throw error when total_freight_provision is not number', (doneCb) => {
    const ReqJson = json;

    ReqJson.material[0].total_freight_provision = -1;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'total_freight_provision must be larger than or equal to 0', doneCb);
  });
  
});
