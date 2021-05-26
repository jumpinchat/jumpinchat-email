const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const config = require('./config/env');
const log = require('./utils/logger')({ name: 'server' });
const routes = require('./routes');

const app = express();
const server = http.createServer(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes(app);

server.listen(config.port, (err) => {
  if (err) {
    log.fatal({ err }, 'error starting server');
    throw err;
  }

  log.info({ port: config.port, env: config.env }, 'server listening');
});
