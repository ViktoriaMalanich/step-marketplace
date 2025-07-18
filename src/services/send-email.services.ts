import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { LETTER_TYPE } from "../types";
import { subjects } from "./templates/subjects";
import { getTemplates } from "./templates/templates";
import { ErrorHendler } from "../classes/ErrorHandler";

const mailerSend = new MailerSend({
    apiKey: process.env.MAIL_API_KEY || ""
});

const sentFrom = new Sender(
    process.env.MAIL_FROM_EMAIL || "info@marketplace.com",
    process.env.MAIL_FROM_NAME || "Admin",
);


export const sendEmail = async (
    letterType: LETTER_TYPE,
    recipient: { email: string, name: string },
    options?: any
) => {
    const recipients = [
        new Recipient(recipient.email, recipient.name)
    ];

    const html = getTemplates(letterType, { ...recipient, ...options });

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject(subjects[letterType])
        .setHtml(html);

    try {
        const result = await mailerSend.email.send(emailParams);
        console.log(result);

    } catch (error: any) { //поискать правильный тип для ошибки

        console.log(error);
        throw new ErrorHendler(error.statusCode, error.body.message);

    }

}

/**
 * const recipients = [
  new Recipient("your@client.com", "Your Client")
];

const emailParams = new EmailParams()
  .setFrom(sentFrom)
  .setTo(recipients)
  .setReplyTo(sentFrom)
  .setSubject("This is a Subject")
  .setHtml("<strong>This is the HTML content</strong>")
  .setText("This is the text content");
 */