import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';


export const signToken = <T extends object>(payload: T, short = false): string => {
    const time = short ? "15m" : "24h";
    const token = jwt.sign({ ...payload }, process.env.JWT_SECRET as string, { expiresIn: time });
    return token;
}

export const verifyToken = (token: string) => {
    let payload: any; //figure out type
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
        // console.log('verifyToken', error);
        payload = null;
    }
    return payload;
}
