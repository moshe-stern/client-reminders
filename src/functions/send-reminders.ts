import { app, InvocationContext, Timer } from "@azure/functions";
import { sendReminders } from "../services";

export async function sendRemindersHandler(
  myTimer: Timer,
  context: InvocationContext,
): Promise<void> {
  try {
    await sendReminders();
  } catch (error) {
    console.error(error);
  }
}

app.timer("send-reminders", {
  schedule: "0 */5 * * * *",
  handler: sendRemindersHandler,
});
