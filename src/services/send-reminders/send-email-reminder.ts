import sgMail, { ClientResponse, MailDataRequired } from "@sendgrid/mail";
import { IClientReminder } from "../../types";
import { groupBy } from "lodash";
import { chunkArray } from "../helpers";

async function sendEmailReminders(
  clients: Extract<IClientReminder, { remindType: "email" }>[],
) {
  const grouped = groupBy(clients, "templateId");
  const res = await Promise.all(
    Object.entries(grouped).map((group) => {
      const chunks = chunkArray(group[1], 1000);
      return Promise.all(chunks.map((c) => sendEmailReminder(c, group[0])));
    }),
  );
  return res.flat(1);
}

async function sendEmailReminder(
  clients: Extract<IClientReminder, { remindType: "email" }>[],
  templateId: string,
) {
  const msg: MailDataRequired = {
    to: clients.map((c) => c.email),
    from: "Sadie Miller <sadie@thebigdonut.party>",
    subject: "🍩 Donuts, at the big donut 🍩",
    text: "Fresh donuts are out of the oven. Get them while they’re hot!",
    html: "<p>Fresh donuts are out of the oven. Get them while they’re <em>hot!</em></p>",
    templateId,
  };
  let sent: boolean = false;
  try {
    const res = await sgMail.sendMultiple(msg);
    sent = res.every((r: ClientResponse) => r.statusCode === 202);
  } catch (error) {
    console.error(`Error sending emails for templateId: ${templateId}`, error);
  }
  return {
    templateId,
    sent,
  };
}

export { sendEmailReminders };
