// const processPostback = require('../processes/postback');
// const processMessage = require('../processes/messages');

module.exports = function (app, chalk) {
  app.get('/webhook', function (req, res) {
    if (
      req.query['hub.verify_token'] === process.env.FACEBOOK_PAGE_ACCESS_TOKEN
    ) {
      console.log('webhook verified');
      res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error('verification failed. Token mismatch.');
      res.sendStatus(403);
    }
  });

  app.post('/webhook', function (req, res) {
    //checking for page subscription.
    if (req.body.object === 'page') {
      req.body.entry.forEach(function (entry) {
        entry.messaging.forEach(function (event) {
          console.log(event);
          if (event.postback) {
            // processPostback(event);
            console.log('siema');
          } else if (event.message) {
            // processMessage(event);
            console.log('elo');
          }
        });
      });
      res.sendStatus(200);
    }
  });
};
