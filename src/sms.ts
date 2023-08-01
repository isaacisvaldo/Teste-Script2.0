import { Twilio } from 'twilio';


async function sendSMS(message: string, phone: string) {
  const accountSid = 'ACd1a6312ba5e15eb1d1b855c0c3783eac';
  const authToken = 'c0933d30bfbfaaf1fb17f537be77c669';
  const client = new Twilio(accountSid, authToken);
  client.messages
    .create({
  
      from: '+14707458483',
      to: `+244${phone}`,
      body: message
    })
    .then(message => console.log('A seguinte Mensagem foi enviada:' + message.body)).catch((err) => {
      console.log(err)
    });
}

const message ='Codigo de Validação:APL123'
const phone= '930333042'
sendSMS(message, phone)