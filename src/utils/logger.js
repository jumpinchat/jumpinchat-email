const bunyan = require('bunyan');

module.exports = function createLogger(opts = {}) {
  if (!opts.name) {
    throw new Error('Logger requires a `name` parameter');
  }

  const defaultOpts = {
    level: process.env.TEST ? 100 : 'debug',
    serializers: bunyan.stdSerializers,
  };

  return bunyan.createLogger({ ...defaultOpts, ...opts });
};
