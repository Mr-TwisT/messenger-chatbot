require('dotenv').config();
const request = require('request');

const handleMessage = (sender_psid, received_message) => {
  let response;
  console.log(received_message);

  if (received_message.text) {
    response = {
      text: `You sent the message: "${received_message.text}". Now send me an image!`,
    };
  }

  callSendAPI(sender_psid, response);
};

const callSendAPI = (sender_psid, response) => {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  request(
    {
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log('Message Sent!');
      } else {
        console.error('Unable to send message:' + err);
      }
    }
  );
};

module.exports = { handleMessage };
