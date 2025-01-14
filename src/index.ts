import { app } from "@azure/functions";
import sgMail from "@sendgrid/mail";
import twilio from "twilio";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.setup({
  enableHttpStream: true,
});

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
export const twilioClient = twilio(accountSid, authToken);
