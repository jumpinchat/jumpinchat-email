const path = require('path');

const all = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3434,

  // Root path of server
  root: path.normalize(`${__dirname}/../../..`),
};

module.exports = {
  ...all,
  ...require(`./${all.env}.js`) // eslint-disable-line
};
