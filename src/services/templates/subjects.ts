import { LETTER_TYPE } from "../../types";

type Subject = {
    [key in LETTER_TYPE]: string;
};

export const subjects: Subject = {
    "VERIFY_EMAIL": "Confirm your email",
    "RECOVER_PASSWORD": "Recover your password"
}