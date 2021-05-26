const auth = require('./utils/auth');
const email = require('./api/email');

module.exports = function routes(app) {
  app.use('/status', (req, res) => res.status(200).send('it\'s all good'));
  app.use('/email', auth, email);
};
