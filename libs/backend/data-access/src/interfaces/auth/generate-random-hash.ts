import crypto from 'crypto';

export function generateRandomHash() {
    const length = 64; // You can adjust the length of the hash
    return crypto.randomBytes(length).toString('hex');
  }
  