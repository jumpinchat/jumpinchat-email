const config = require('../config/env');
const log = require('./logger')({ name: 'utils.auth' });

module.exports = function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    log.error('missing auth header');
    return res.status(401).send();
  }

  if (authHeader !== config.auth.sharedSecret) {
    log.error({ auth }, 'Invalid user attempted internal call');
    return res.status(401).send();
  }

  return next();
};
