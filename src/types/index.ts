type IClientReminder =
  | {
      remindType: "email";
      templateId: string;
      email: string;
    }
  | {
      remindType: "sms";
      message: string;
      templateId: string;
      phoneNumber: string;
    };

export { IClientReminder };
