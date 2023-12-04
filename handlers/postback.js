const handlePostback = (sender_psid, received_postback) => {
  let response;

  let payload = received_postback.payload;

  if (payload === 'yes') {
    response = { text: 'Thanks!' };
  } else if (payload === 'no') {
    response = { text: 'Oops, try sending another image.' };
  }

  callSendAPI(sender_psid, response);
};
