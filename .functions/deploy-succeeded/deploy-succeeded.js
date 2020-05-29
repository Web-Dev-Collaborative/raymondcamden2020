const SG_KEY = process.env.SENDGRID;

const helper = require('sendgrid').mail;

exports.handler = async (event, context) => {
  try {

    console.log('deploy succeeded run!');
    let pubData = JSON.parse(event.body).payload;
    let body = `
Deploy Succeeded for ${pubData.name}

    `;

    sendEmail(body, 'Netlify Build Succeeded', 'raymondcamden@gmail.com', 'raymondcamden@gmail.com');
    
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}

function sendEmail(body, subject, from_email, to_email) {
  let mailContent = new helper.Content('text/plain', body);
  let mail = new helper.Mail(from_email, subject, to_email, mailContent);
  let sg = require('sendgrid')(SG_KEY);

  let request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  sg.API(request, function(error, response) {
    if(error) {
    console.log(error.response.body);
    }
  });
}