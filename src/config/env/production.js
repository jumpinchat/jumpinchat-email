module.exports = {
  auth: {
    sharedSecret: process.env.SHARED_SECRET,
  },
  aws: {
    ses: {
      accessKey: process.env.AWS_SES_ACCESS_KEY || '',
      secret: process.env.AWS_SES_SECRET || '',
      region: process.env.AWS_SES_REGION || 'us-east-1',
      sendLimit: 14, // messages per second
    },
  },
};
