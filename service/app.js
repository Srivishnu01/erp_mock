/* global logger */
const config = require('pando-env');
const { requestLogger } = require('pando-middlewares');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const addRequestId = require('express-request-id')();
const bodyParser = require('body-parser');

global.logger = require('pando-logger').application('service');

const app = express();
const { mongoConnect } = require('pando-mongo-connect');

const mongoose = require('mongoose');
const {
  rawBodyBuilder,
  corEnabler,
  errorHandler,
  contentTypeChecker,
} = require('./middleware/request-interceptor');
const { initSwagger } = require('./helpers/swagger-docs');
const apiRouter = require('./routes');

(async () => await mongoConnect(mongoose))();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(addRequestId);
app.use(requestLogger(logger));
app.use(rawBodyBuilder);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable cors for the mentioned domain and headers
app.use(corEnabler);

app.use('/api/', apiRouter);
app.use('/api/*', apiRouter);

// error handler
app.use(errorHandler);

app.use(contentTypeChecker);

const servicePort = config.get('service:port');

initSwagger(app);

app.listen(servicePort, () => {
  logger.info(`service API is listening to ${servicePort}`);
});
module.exports = app;
