import { randomBytes } from 'crypto';

export function randomString(n = 20) {
  return randomBytes(n).toString('hex');
}
