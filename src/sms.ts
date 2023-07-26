import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import twilio from 'twilio';


 export async function  getSms(phoneNumber:string, message:string ){

   admin.initializeApp();

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const twilioNumber = 'YOUR_TWILIO_PHONE_NUMBER';

const client = twilio(accountSid, authToken);


  try {
    await client.messages.create({
      body: message,
      from: twilioNumber,
      to: phoneNumber,
    });
    return { success: true, message: 'SMS enviado com sucesso!' };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Erro ao enviar o SMS.', error);
  }
}