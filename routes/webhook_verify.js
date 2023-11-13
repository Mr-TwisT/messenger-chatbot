require('dotenv').config();
// const processPostback = require('../processes/postback');
// const processMessage = require('../processes/messages');

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
    console.log(body);

    if (body.object === 'page') {
      body.entry.forEach((entry) => {
        entry.messaging.forEach((event) => {
          console.log(event);
          let sender_psid = event.sender.id;
          console.log('Sender PSID: ' + sender_psid);

          if (event.postback) {
            console.log('siema');
          } else if (event.message) {
            console.log('elo');
          }
        });
      });
      res.status(200).send('Event_Received.');
    } else {
      res.sendStatus(404);
    }
  });
};
