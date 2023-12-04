require('dotenv').config();
// import handleMessage from '../handlers/message';
// const handlePostback = require('../handlers/postback');

module.exports = (app, chalk) => {
  app.get('/webhook', (req, res) => {
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
      if (
        mode === 'subscribe' &&
        token === process.env.FACEBOOK_PAGE_ACCESS_TOKEN
      ) {
        console.log('Webhook Verified.');
        res.status(200).send(challenge);
      } else {
        console.error('Verification Failed.');
        res.sendStatus(403);
      }
    }
  });

  app.post('/webhook', (req, res) => {
    let body = req.body;

    if (body.object === 'page') {
      body.entry.forEach((entry) => {
        entry.messaging.forEach((event) => {
          console.log(event);

          let sender_psid = event.sender.id;
          console.log('Sender PSID: ' + sender_psid);

          if (event.message) {
            handleMessage(sender_psid, event.message);
          } else if (event.postback) {
            handlePostback(sender_psid, event.postback);
          }
        });
      });
      res.status(200).send('Event_Received.');
    } else {
      res.sendStatus(404);
    }
  });
};
