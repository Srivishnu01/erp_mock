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

describe('epod /api/epod/mock?client=marico', () => {
  let app;
  let json;
  const rawdata = fs.readFileSync(path.join(__dirname, '../input_files/epod.json'));

  beforeEach(() => {
    json = JSON.parse(rawdata);
    app = express();
    app.use(bodyParser.json());
    app.use('/', epod);
    app.use(validation);
  });

  function assertEpod(epodRequest, expectedErrObj, doneCb) {
    request(app)
      .post('/api/epod/mock?client=marico')
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
      .post('/api/epod/mock?client=marico')
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

  it('throw error when intdent_no is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.indent_no;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'indent_no is required', doneCb);
  });

  it('throw error when vehicle_type is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.vehicle_type;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'vehicle_type is required', doneCb);
  });

  it('throw error when vehicle_name is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.vehicle_name;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'vehicle_name is required', doneCb);
  });

  it('throw error when vehicle_description is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.vehicle_description;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'vehicle_description is required', doneCb);
  });

  it('throw error when truck_in is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.truck_in;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'truck_in is required', doneCb);
  });

  it('throw error when truck_out is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.truck_out;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'truck_out is required', doneCb);
  });

  it('throw error when consignees is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'consignees is required', doneCb);
  });

  it('throw error when ship_to is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees[0].ship_to;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'ship_to is required', doneCb);
  });
  it('throw error when sold_to is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees[0].sold_to;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'sold_to is required', doneCb);
  });
  it('throw error when expected_date is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees[0].expected_date;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'expected_date is required', doneCb);
  });
  it('throw error when reach_date is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees[0].reach_date;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'reach_date is required', doneCb);
  });
  it('throw error when release_date is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees[0].release_date;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'release_date is required', doneCb);
  });
  it('throw error when lr_uploaded is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees[0].lr_uploaded;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'lr_uploaded is required', doneCb);
  });
  it('throw error when materials is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees[0].materials;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'materials is required', doneCb);
  });
  it('throw error when material_code is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees[0].materials[0].material_code;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'material_code is required', doneCb);
  });
  it('throw error when material_invoice_number is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees[0].materials[0].material_invoice_number;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'material_invoice_number is required', doneCb);
  });
  it('throw error when delivery_number is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees[0].materials[0].delivery_number;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'delivery_number is required', doneCb);
  });
  it('throw error when no_of_shortage is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees[0].materials[0].no_of_shortage;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'no_of_shortage is required', doneCb);
  });
  it('throw error when no_of_leakage is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees[0].materials[0].no_of_leakage;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'no_of_leakage is required', doneCb);
  });
  it('throw error when no_of_excess is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees[0].materials[0].no_of_excess;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'no_of_excess is required', doneCb);
  });
  it('throw error when no_of_damage is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees[0].materials[0].no_of_damage;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'no_of_damage is required', doneCb);
  });
  it('throw error when no_of_carton_damage is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees[0].materials[0].no_of_carton_damage;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'no_of_carton_damage is required', doneCb);
  });
  it('throw error when lr_number is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.consignees[0].materials[0].lr_number;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'lr_number is required', doneCb);
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

  it('throw error when intdent_no is not string', (doneCb) => {
    const ReqJson = json;

    ReqJson.indent_no = 710;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'indent_no must be a string', doneCb);
  });

  it('throw error when vehicle_type is not string', (doneCb) => {
    const ReqJson = json;

    ReqJson.vehicle_type = 710;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'vehicle_type must be a string', doneCb);
  });

  it('throw error when vehicle_name is not string', (doneCb) => {
    const ReqJson = json;

    ReqJson.vehicle_name = 710;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'vehicle_name must be a string', doneCb);
  });

  it('throw error when vehicle_description is not string', (doneCb) => {
    const ReqJson = json;

    ReqJson.vehicle_description = 710;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'vehicle_description must be a string', doneCb);
  });

  it('throw error when truck_in is not date', (doneCb) => {
    const ReqJson = json;

    ReqJson.truck_in = 'test';
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'truck_in must be a string with one of the following formats [YYYY/MM/DD hh:mm]', doneCb);
  });

  it('throw error when truck_out is not date', (doneCb) => {
    const ReqJson = json;

    ReqJson.truck_out = 'test';
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'truck_out must be a string with one of the following formats [YYYY/MM/DD hh:mm]', doneCb);
  });

  it('throw error when consignees is not object', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees = 'test';
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'consignees must be an array', doneCb);
  });

  it('throw error when ship_to is not string', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].ship_to = 710;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'ship_to must be a string', doneCb);
  });
  it('throw error when sold_to is not string', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].sold_to = 710;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'sold_to must be a string', doneCb);
  });
  it('throw error when expected_date is not date', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].expected_date = 'test';
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'expected_date must be a string with one of the following formats [YYYY/MM/DD hh:mm]', doneCb);
  });
  it('throw error when reach_date is not date', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].reach_date = 'test';
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'reach_date must be a string with one of the following formats [YYYY/MM/DD hh:mm]', doneCb);
  });
  it('throw error when release_date is not date', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].release_date = 'test';
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'release_date must be a string with one of the following formats [YYYY/MM/DD hh:mm]', doneCb);
  });
  it('throw error when lr_uploaded is string', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].lr_uploaded = 710;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'lr_uploaded must be a string', doneCb);
  });
  it('throw error when materials is not array', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].materials = 'test';
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'materials must be an array', doneCb);
  });
  it('throw error when material_code is not string', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].materials[0].material_code = 710;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'material_code must be a string', doneCb);
  });
  it('throw error when material_invoice_number is not string', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].materials[0].material_invoice_number = 710;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'material_invoice_number must be a string', doneCb);
  });
  it('throw error when delivery_number is not string', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].materials[0].delivery_number = 710;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'delivery_number must be a string', doneCb);
  });
  it('throw error when no_of_shortage is not integer', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].materials[0].no_of_shortage = 'test';
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'no_of_shortage must be a number', doneCb);
  });
  it('throw error when no_of_leakage is not number', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].materials[0].no_of_leakage = 'test';
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'no_of_leakage must be a number', doneCb);
  });
  it('throw error when no_of_excess is not number', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].materials[0].no_of_excess = 'test';
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'no_of_excess must be a number', doneCb);
  });
  it('throw error when no_of_damage is not number', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].materials[0].no_of_damage = 'test';
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'no_of_damage must be a number', doneCb);
  });
  it('throw error when no_of_carton_damage is not number', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].materials[0].no_of_carton_damage = 'test';
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'no_of_carton_damage must be a number', doneCb);
  });
  it('throw error when lr_number is not string', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].materials[0].lr_number = 710;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'lr_number must be a string', doneCb);
  });
  it('throw error when no_of_shortage is negative', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].materials[0].no_of_shortage = -1;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'no_of_shortage must be larger than or equal to 0', doneCb);
  });
  it('throw error when no_of_leakage is negative', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].materials[0].no_of_leakage = -1;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'no_of_leakage must be larger than or equal to 0', doneCb);
  });
  it('throw error when no_of_excess is negative', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].materials[0].no_of_excess = -1;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'no_of_excess must be larger than or equal to 0', doneCb);
  });
  it('throw error when no_of_damage is negative', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].materials[0].no_of_damage = -1;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'no_of_damage must be larger than or equal to 0', doneCb);
  });
  it('throw error when no_of_carton_damage is negative', (doneCb) => {
    const ReqJson = json;

    ReqJson.consignees[0].materials[0].no_of_carton_damage = -1;
    const createReq = {
      body: ReqJson,
    };
    assertEpod(createReq, 'no_of_carton_damage must be larger than or equal to 0', doneCb);
  });
});
