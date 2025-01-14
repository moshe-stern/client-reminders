import { groupBy } from "lodash";
import { twilioClient } from "../..";
import { IClientReminder } from "../../types";

async function sendTxtReminders(
  clients: Extract<IClientReminder, { remindType: "sms" }>[],
) {
  const res = await Promise.all(
    Object.entries(groupBy(clients, "message")).map((g) =>
      sendTxtReminder(g[1], g[0]),
    ),
  );
  return res.flat(1);
}

async function sendTxtReminder(
  clients: Extract<IClientReminder, { remindType: "sms" }>[],
  message: string,
) {
  const send = async (phoneNumber: string) => {
    try {
      twilioClient.messages.create({
        body: message,
        from: "+15017122661",
        to: phoneNumber,
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  const res = await Promise.all(clients.map((c) => send(c.phoneNumber)));
  return {
    message,
    sent: res.every(Boolean),
  };
}

export { sendTxtReminders };
