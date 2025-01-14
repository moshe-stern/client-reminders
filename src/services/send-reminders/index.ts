import { groupBy } from "lodash";
import { IClientReminder } from "../../types";
import { sendTxtReminders } from "./send-txt-reminders";
import { sendEmailReminders } from "./send-email-reminder";

async function getClientsToBeReminded(): Promise<IClientReminder[]> {
  return [];
}

async function sendReminders() {
  const clients = await getClientsToBeReminded(); //use attain-aba-shared
  const grouped = groupBy(clients, "remindType");
  const res = await Promise.all(
    Object.entries(grouped).map((g) => {
      if (g[0] === "sms") {
        return sendTxtReminders(
          g[1] as Extract<IClientReminder, { remindType: "sms" }>[],
        );
      } else if (g[0] === "email") {
        return sendEmailReminders(
          g[1] as Extract<IClientReminder, { remindType: "email" }>[],
        );
      }
    }),
  );
  return res.flat(1);
}

export { sendReminders };
