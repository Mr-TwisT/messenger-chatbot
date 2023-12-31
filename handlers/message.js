const { callSendAPI } = require('./sendAPI');

const handleMessage = (sender_psid, received_message) => {
  let response;

  if (received_message.text) {
    response = {
      text: `${received_message.text}`,
    };
  } else if (received_message.attachments) {
    let attachment_url = received_message.attachments[0].payload.url;

    response = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [
            {
              title: 'Is this the right picture?',
              subtitle: 'Tap a button to answer.',
              image_url: attachment_url,
              buttons: [
                {
                  type: 'postback',
                  title: 'Yes!',
                  payload: 'yes',
                },
                {
                  type: 'postback',
                  title: 'No!',
                  payload: 'no',
                },
              ],
            },
          ],
        },
      },
    };
  }

  callSendAPI(sender_psid, response);
};

module.exports = { handleMessage };
