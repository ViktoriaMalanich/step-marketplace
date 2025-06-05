import { LETTER_TYPE } from "../../types";
import { subjects } from "./subjects";

//subject
//option
export const getTemplates = (
    letterType: LETTER_TYPE,
    options?: any
) => {
    let letter = "";
    switch (letterType) {
        case "VERIFY_EMAIL":
            letter = `
                <h3>Hello ${options.name}</h3>
                <p> Could you confirm your email, please.
                <p> Follow the link bellow <a href="${process.env.BASE_URL}/users/confirm/${options.token}">Confirm email</a>
                <p> Link expaired in ${options.expairedIn}.
            `;

            break;
        case "RECOVER_PASSWORD":
            letter = `
             <h3>Hello ${options.name}</h3>
                <p> Have you requested a password rest?
                <p> If not, just ignore this letter please.
                <p> To change your password follow the link bellow <a href="${process.env.BASE_URL}/auth/passwordreset/${options.token}">Confirm email</a>
                <p> Link expaired in ${options.expairedIn}.
            `;
            break;
        default:
            letter = "Wrong template";
    }

    //letter += "<p> "

    return letter;
}