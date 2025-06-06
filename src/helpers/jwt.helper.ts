import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

import { TokenPayload } from '../types';
import { User } from '../entities/User';


export const signToken = <T extends object>(payload: T, short = false): string => {
    const time = short ? "15m" : "24h";
    const token = jwt.sign({ ...payload }, process.env.JWT_SECRET as string, { expiresIn: time });
    return token;
}

export const verifyToken = (token: string): Partial<User> | null => {
    let payload: Partial<User> | null; 
    try {
        const parsedJwt: TokenPayload = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
        
        delete parsedJwt.iat;
        delete parsedJwt.exp;

        payload = {...parsedJwt};
    } catch (error) {       
        payload = null;
    }
    return payload;
}
