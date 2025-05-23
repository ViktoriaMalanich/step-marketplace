import { randomBytes, pbkdf2Sync } from 'crypto';

export function createHash(password: string): string {
  const salt = randomBytes(16).toString('hex'); 
  const iterations = Number(process.env.ITERATIONS);
  const keylen = Number(process.env.HASH_LENGTH);
  const digest = 'sha512';

  const derivedKey = pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');

  return `${salt}:${derivedKey}`;
}

// export function verifyPassword(password: string, stored: string): boolean {
//     const [salt, iterationsStr, digest, key] = stored.split(':');
//     const iterations = parseInt(iterationsStr, 10);
//     const keylen = Buffer.from(key, 'hex').length;
  
//     const derivedKey = pbkdf2Sync(password, salt, iterations, keylen, digest);
//     const originalKey = Buffer.from(key, 'hex');
  
//     return timingSafeEqual(derivedKey, originalKey); // безопасное сравнение
//   }
