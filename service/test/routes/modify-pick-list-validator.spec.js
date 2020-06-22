const chai = require('chai');
const fs = require('fs');

const { expect } = chai;
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { ValidationError } = require('express-validation');
const path = require('path');
const erpMockServiceRoute = require('../../app.js');

const app = express();

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

describe('Modify Pick list /api/modified-pick-list/britannia/v1', () => {
  let json;
  const rawdata = fs.readFileSync(path.join(__dirname, '../input_files/erp_mock_service.json'));

  beforeEach(() => {
    json = JSON.parse(rawdata);
    app.use(bodyParser.json());
    app.use('/', erpMockServiceRoute);
    app.use(validation);
  });

  function assertmodifiedPickList(modifyRequest, expectedErrObj, doneCb) {
    request(app)
      .post('/api/modified-pick-list/britannia/v1')
      .send(modifyRequest.body)
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
    const createModifyReq = {
      body: ReqJson,
    };

    request(app)
      .post('/api/modified-pick-list/britannia/v1')
      .send(createModifyReq.body)
      .set('content-type', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.text).to.eql('Ok');
        doneCb();
      });
  });

  it('throw error when ModifiedPicklist is not present', (doneCb) => {
    const ReqJson = json;

    delete ReqJson.ModifiedPicklist;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'ModifiedPicklist is required', doneCb);
  });

  it('throw error when ItemModifiedPicklist is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'ItemModifiedPicklist is required', doneCb);
  });

  it('throw error when depot_code is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].depot_code;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'depot_code is required', doneCb);
  });

  it('throw error when indent_id is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].indent_id;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'indent_id is required', doneCb);
  });

  it('throw error when type is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].type;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'type is required', doneCb);
  });

  it('throw error when vechile_number is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].vehicle_number;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'vehicle_number is required', doneCb);
  });

  it('throw error when vechile_type is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].vehicle_type;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'vehicle_type is required', doneCb);
  });


  it('throw error when indication is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].indication;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'indication is required', doneCb);
  });


  it('throw error when transporter_code is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].transporter_code;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'transporter_code is required', doneCb);
  });

  it('throw error when created_date is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].created_date;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'created_date is required', doneCb);
  });


  it('throw error when truck_in_date_and_time is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].truck_in_date_and_time;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'truck_in_date_and_time is required', doneCb);
  });


  it('throw error when pickup_code is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].pickup_code;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'pickup_code is required', doneCb);
  });


  it('throw error when delivery_number is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].delivery_number;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'delivery_number is required', doneCb);
  });


  it('throw error when line_item_no is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].line_item_no;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'line_item_no is required', doneCb);
  });


  it('throw error when sku is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].sku;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'sku is required', doneCb);
  });


  it('throw error when division is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].division;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'division is required', doneCb);
  });

  it('throw error when quantity is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].quantity;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'quantity is required', doneCb);
  });


  it('throw error when quantity_unit is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].quantity_unit;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'quantity_unit is required', doneCb);
  });


  it('throw error when N is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].N;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'N is required', doneCb);
  });


  it('throw error when weight is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].weight;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'weight is required', doneCb);
  });


  it('throw error when weight_unit is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].weight_unit;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'weight_unit is required', doneCb);
  });


  it('throw error when volume is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].volume;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'volume is required', doneCb);
  });


  it('throw error when volume_unit is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].volume_unit;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'volume_unit is required', doneCb);
  });


  it('throw error when category is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].category;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'category is required', doneCb);
  });


  it('throw error when lr_number is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].lr_number;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'lr_number is required', doneCb);
  });


  it('throw error when ship_to is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].ship_to;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'ship_to is required', doneCb);
  });


  it('throw error when sold_to is not present', (doneCb) => {
    const ReqJson = json;
    delete ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].sold_to;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'sold_to is required', doneCb);
  });

  // datatype testing
  it('throw error when ItemModifiedPicklist is not array', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist = 'test';
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'ItemModifiedPicklist must be an array', doneCb);
  });

  it('throw error when depot_code is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].depot_code = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'depot_code must be a string', doneCb);
  });

  it('throw error when indent_id is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].indent_id = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'indent_id must be a string', doneCb);
  });

  it('throw error when type is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].type = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'type must be a string', doneCb);
  });

  it('throw error when vechile_number is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].vehicle_number = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'vehicle_number must be a string', doneCb);
  });

  it('throw error when vechile_number is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].vehicle_type = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'vehicle_type must be a string', doneCb);
  });


  it('throw error when indication is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].indication = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'indication must be a string', doneCb);
  });


  it('throw error when transporter_code is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].transporter_code = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'transporter_code must be a string', doneCb);
  });

  it('throw error when created_date is not Date', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].created_date = 'test';
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'created_date must be a string with one of the following formats [YYYY/MM/DDhh:mm]', doneCb);
  });


  it('throw error when truck_in_date_and_time is not Date', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].truck_in_date_and_time = 'test';
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'truck_in_date_and_time must be a string with one of the following formats [YYYY/MM/DDhh:mm]', doneCb);
  });


  it('throw error when pickup_code is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].pickup_code = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'pickup_code must be a string', doneCb);
  });


  it('throw error when delivery_number is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].delivery_number = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'delivery_number must be a string', doneCb);
  });


  it('throw error when line_item_no is not number', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].line_item_no = 'test';
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'line_item_no must be a number', doneCb);
  });


  it('throw error when sku is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].sku = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'sku must be a string', doneCb);
  });


  it('throw error when division is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].division = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'division must be a string', doneCb);
  });

  it('throw error when quantity is not number', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].quantity = 'test';
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'quantity must be a number', doneCb);
  });


  it('throw error when quantity_unit is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].quantity_unit = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'quantity_unit must be a string', doneCb);
  });


  it('throw error when N is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].N = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'N must be a string', doneCb);
  });


  it('throw error when weight is not number', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].weight = 'test';
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'weight must be a number', doneCb);
  });


  it('throw error when weight_unit is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].weight_unit = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'weight_unit must be a string', doneCb);
  });


  it('throw error when volume is not number', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].volume = 'test';
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'volume must be a number', doneCb);
  });


  it('throw error when volume_unit is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].volume_unit = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'volume_unit must be a string', doneCb);
  });


  it('throw error when category is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].category = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'category must be a string', doneCb);
  });


  it('throw error when lr_number is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].lr_number = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'lr_number must be a string', doneCb);
  });


  it('throw error when ship_to is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].ship_to = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'ship_to must be a string', doneCb);
  });


  it('throw error when sold_to is not string', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].sold_to = 710;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'sold_to must be a string', doneCb);
  });


  it('throw error when type is not either primary or secondary', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].type = 'test';
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'type must be one of [PRIMARY, SECONDARY]', doneCb);
  });


  it('throw error when line_item_no  is negative', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].line_item_no = -1;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'line_item_no must be larger than or equal to 0', doneCb);
  });

  it('throw error when quantity  is negative', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].quantity = -1;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'quantity must be larger than or equal to 0', doneCb);
  });

  it('throw error when weight  is negative', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].weight = -1;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'weight must be larger than or equal to 0', doneCb);
  });

  it('throw error when volume  is negative', (doneCb) => {
    const ReqJson = json;
    ReqJson.ModifiedPicklist.ItemModifiedPicklist[0].volume = -1;
    const createModifyReq = {
      body: ReqJson,
    };
    assertmodifiedPickList(createModifyReq, 'volume must be larger than or equal to 0', doneCb);
  });
});
