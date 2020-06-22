/* gobal logger */
const { ValidationError } = require('pando-errors');

const rawBodyBuilder = (req, res, next) => {
    if (!req.rawBody || req.rawBody == '') {
      req.rawBody = '';
      req.setEncoding('utf8');
  
      req.on('data', (chunk) => {
        req.rawBody += chunk;
      });
      req.on('end', () => {
        next();
      });
    } else next();
};
const corEnabler = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};
const errorHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next();
};
const contentTypeChecker = (req, res, next) => {
  const contentType = req.headers['content-type'];
  if ((req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE')
        && (!contentType || (contentType.indexOf('application/json') === -1 && contentType.indexOf('application/xml') === -1 && contentType.indexOf('text/xml') === -1))) {
    return res.status(415).json({ message: 'content-type should be application/json or xml' });
  }
  next();
};
module.exports = {
  rawBodyBuilder,
  corEnabler,
  errorHandler,
  contentTypeChecker,
};
