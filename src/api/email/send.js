const aws = require('aws-sdk');
const nodemailer = require('nodemailer');
const config = require('../../config/env');
const log = require('../../utils/logger')({ name: 'api.email.send' });
const Queue = require('../../utils/queue');

const SES = new aws.SES({
  apiVersion: '2010-12-01',
  accessKeyId: config.aws.ses.accessKey,
  secretAccessKey: config.aws.ses.secret,
  region: config.aws.ses.region,
});

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES,
});

const defaults = {
  from: 'JumpInChat noreply@example.com',
  ses: {
    ConfigurationSetName: 'NotifySuccess',
  },
};

function sendMail(message) {
  return new Promise((resolve, reject) => transporter.sendMail(message, (err, info) => {
    if (err) {
      log.fatal({ message, err }, 'error sending email');
      return reject(err);
    }

    log.info({ envelope: info.envelope }, 'email sent');
    return resolve(info);
  }));
}

const queue = new Queue(sendMail, 100);

module.exports = function sendEmail(req, res) {
  const {
    from,
    to,
    subject,
    html,
    text,
    replyTo,
  } = req.body;

  if (!from) {
    log.debug({ from: defaults.from }, 'Missing mail source, using default');
  }

  if (!to) {
    log.error('Missing mail destination');
    return res.status(400).send('Missing mail destination');
  }

  if (!subject) {
    log.error('Missing mail subject');
    return res.status(400).send('Missing mail subject');
  }

  if (!text && !html) {
    log.error('Missing mail body');
    return res.status(400).send('Missing mail body');
  }

  const mailOpts = {
    ...defaults,
    from: from || defaults.from,
    to,
    subject,
    replyTo,
  };

  if (html) {
    mailOpts.html = html;
  } else {
    mailOpts.text = text;
  }

  const args = [mailOpts];
  queue.addToQueue(args);
  return res.status(200).send();
};
